import {
  createSlice,
  createSelector,
  createAsyncThunk,
  isAnyOf,
  createAction,
} from "@reduxjs/toolkit";
import { getRandomInt } from "../../lib/utils";
import uniqid from "uniqid";
import { toast } from "react-toastify";
import UnlimitedToast from "../../components/UnlimitedToast";
import { instances } from "../../api/instances";
import { getRoute } from "../../api/common";

export const getVisualisationsAsync = createAsyncThunk(
  "vis/GET",
  async (strategy, { rejectWithValue }) => {
    try {
      const instance = instances[strategy];
      if (!instance) {
        return Promise.reject("Invalid strategy");
      }
      const route = getRoute(strategy, "/visualisations/");
      const data = (await instance.get(route)).data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createVisualisationAsync = createAsyncThunk(
  "vis/POST",
  async ({ body, strategy }, { rejectWithValue }) => {
    try {
      const instance = instances[strategy];
      if (!instance) {
        return Promise.reject("Invalid strategy");
      }
      const route = getRoute(strategy, "/visualisations/create");
      const data = (await instance.post(route, body)).data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteVisualisationAsync = createAsyncThunk(
  "vis/DELETE",
  async ({ _id, strategy }, { rejectWithValue }) => {
    try {
      const instance = instances[strategy];
      if (!instance) {
        return Promise.reject("Invalid strategy");
      }
      const route = getRoute(strategy, `/visualisations/delete/${_id}`);
      await instance.delete(route);
      return _id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVisualisationAsync = createAsyncThunk(
  "vis/UPDATE",
  async ({ body, strategy }, { rejectWithValue }) => {
    try {
      const instance = instances[strategy];
      if (!instance) {
        return Promise.reject("Invalid strategy");
      }
      const route = getRoute(strategy, "/visualisations/update");
      await instance.put(route, body);
      return Promise.resolve();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getVisualisationDataById = createAsyncThunk(
  "vis/GETBYID",
  async ({ _id, strategy }, { rejectWithValue }) => {
    try {
      const instance = instances[strategy];
      if (!instance) {
        return Promise.reject("Invalid strategy");
      }
      const route = getRoute(strategy, `/visualisations/${_id}`);
      const { type, data } = (await instance.get(route)).data;
      return { _id, type, data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chooseAlgo = createAction("chooseAlgo");
export const chooseNewAlgo = createAction("chooseNewAlgo");

const initialState = {
  crudStatus: "idle",
  isSidebarToggled: false,
  isAuthModalOpen: false,
  modalPage: "login",
  savedVisId: null,
  dataGrid: {
    selectedRows: [],
    numberOfRows: 0,
    numberOfColumns: 0,
    columns: [
      {
        id: "ID",
        field: "id",
        headerName: "Process ID",
        flex: 0.1,
      },
      {
        id: "arrivalTime",
        field: "arrivalTime",
        headerName: "Arrival Time",
        flex: 0.1,
      },
      {
        id: "cpuTime",
        field: "cpuTime",
        headerName: "CPU Time",
        flex: 0.1,
      },
    ],
    // row name is mapped to a field property of a column
    rows: [],
    unlimitedRows: false,
  },
  visualisationsList: [],
  chosenAlgorithm: {
    name: "_NONE",
    timeQuantum: 2,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setModalPage: (state, action) => {
      state.modalPage = action.payload;
    },
    openAuthModal: (state, action) => {
      state.isAuthModalOpen = true;
      if (action.payload) {
        state.modalPage = action.payload;
      }
    },
    closeAuthModal: (state, action) => {
      state.isAuthModalOpen = false;
    },
    generateData: (state, action) => {
      let { rowsNumber } = action.payload;
      let cpuTime, arrivalTime, priority;
      let rows = [];

      for (let index = 0; index < rowsNumber; index++) {
        cpuTime = getRandomInt(1, 8);
        arrivalTime = getRandomInt(0, rowsNumber);
        priority = getRandomInt(1, rowsNumber);

        rows.push({
          id: uniqid.process(),
          name: `Process №${index + 1}`,
          waitingTime: 0,
          turnaroundTime: 0,
          responseTime: 0,
          cpuTimeLeft: cpuTime,
          arrivalTime,
          cpuTime,
          priority,
        });
      }

      state.dataGrid.rows = rows;
    },
    setUnlimitedRows: (state, action) => {
      state.dataGrid.unlimitedRows = action.payload;
    },
    setTimeQuantum: (state, action) => {
      state.chosenAlgorithm.timeQuantum = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.isSidebarToggled = action.payload;
    },
    addNewRow: (state, action) => {
      const { arrivalTime, cpuTime, priority } = action.payload;
      if (state.dataGrid.rows.length < 20 || state.dataGrid.unlimitedRows) {
        state.dataGrid.rows.push({
          id: uniqid.process(),
          name: `Process №${state.dataGrid.rows.length + 1}`,
          waitingTime: 0,
          turnaroundTime: 0,
          responseTime: 0,
          cpuTimeLeft: cpuTime,
          arrivalTime,
          cpuTime,
          priority,
        });
      } else {
        toast(<UnlimitedToast />, {
          autoClose: 10000,
          type: toast.TYPE.INFO,
        });
      }
    },
    setColumns: (state, action) => {
      state.dataGrid.columns = action.payload;
    },
    setRows: (state, action) => {
      state.dataGrid.rows = action.payload;
    },
    selectRows: (state, action) => {
      state.dataGrid.selectedRows = action.payload;
    },
    resetRowSelection: (state, action) => {
      state.dataGrid.selectedRows = [];
    },
    deleteSelectedRows: (state, action) => {
      if (state.dataGrid.selectedRows.length) {
        state.dataGrid.rows = state.dataGrid.rows.filter((e) => {
          return !state.dataGrid.selectedRows.includes(String(e.id));
        });
      }

      if (!state.dataGrid.rows.length) {
        for (let key in state.extraForms) {
          state.extraForms[key].required = false;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVisualisationDataById.fulfilled, (state, action) => {
      state.dataGrid.rows = action.payload.data;
      state.savedVisId = action.payload._id;
    });
    builder.addCase(getVisualisationsAsync.fulfilled, (state, action) => {
      state.visualisationsList = action.payload.data;
    });
    builder.addCase(createVisualisationAsync.fulfilled, (state, action) => {
      state.savedVisId = action.payload._id;
      state.visualisationsList.push(action.payload);
    });
    builder.addCase(deleteVisualisationAsync.fulfilled, (state, action) => {
      state.visualisationsList = state.visualisationsList.filter(
        (e) => e._id !== action.payload
      );

      if (state.savedVisId && state.savedVisId === action.payload) {
        state.savedVisId = null;
        state.chosenAlgorithm.name = "_NONE";
        state.dataGrid.rows = [];
      }
    });
    builder.addCase(chooseNewAlgo, (state) => {
      if (state.savedVisId !== null) {
        state.dataGrid.rows = [];
        state.savedVisId = null;
      }
    });
    builder.addMatcher(
      isAnyOf(getVisualisationDataById.fulfilled, chooseAlgo, chooseNewAlgo),
      (state, action) => {
        let { type } = action.payload;
        if (type.startsWith("_PRIOR")) {
          if (!state.chosenAlgorithm.name.startsWith("_PRIOR")) {
            state.dataGrid.columns.push({
              id: "priority",
              field: "priority",
              headerName: "Priority",
              flex: 0.1,
            });

            // mb generate random priorities in the future...
            if (!state.savedVisId) state.dataGrid.rows = [];
          }
        } else {
          state.dataGrid.columns = initialState.dataGrid.columns;
        }
        state.chosenAlgorithm.name = type;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getVisualisationsAsync.pending,
        updateVisualisationAsync.pending,
        deleteVisualisationAsync.pending,
        createVisualisationAsync.pending,
        getVisualisationDataById.pending
      ),
      (state, action) => {
        state.crudStatus = "loading";
      }
    );
    builder.addMatcher(
      isAnyOf(
        getVisualisationsAsync.fulfilled,
        updateVisualisationAsync.fulfilled,
        deleteVisualisationAsync.fulfilled,
        createVisualisationAsync.fulfilled,
        getVisualisationDataById.fulfilled
      ),
      (state, action) => {
        state.crudStatus = "success";
      }
    );
    builder.addMatcher(
      isAnyOf(
        getVisualisationsAsync.rejected,
        updateVisualisationAsync.rejected,
        deleteVisualisationAsync.rejected,
        createVisualisationAsync.rejected,
        getVisualisationDataById.rejected
      ),
      (state, action) => {
        state.crudStatus = "error";
      }
    );
  },
});

export const getRowsSelector = createSelector(
  (state) => state.ui.dataGrid.rows,
  (rows) => rows
);
export const getColumnsSelector = createSelector(
  (state) => state.ui.dataGrid.columns,
  (columns) => columns
);

export const getNumberOfSelectedRows = createSelector(
  (state) => state.ui.dataGrid.selectedRows.length,
  (num) => num
);

export const getVisualizations = createSelector(
  (state) => state.ui.visualisationsList,
  (vis) => vis
);

export const getCrudStatus = (state) => state.ui.crudStatus;
export const getSavedId = (state) => state.ui.savedVisId;
export const getModalPage = (state) => state.ui.modalPage;
export const getIsAuthModalOpen = (state) => state.ui.isAuthModalOpen;
export const getIsSidebarToggled = (state) => state.ui.isSidebarToggled;
export const getChosenAlgorithmName = (state) => state.ui.chosenAlgorithm.name;
export const getChosenAlgorithm = (state) => state.ui.chosenAlgorithm;
export const getPreemptiveToggle = (state) =>
  state.ui.chosenAlgorithm.preemptive;
export const getIsReadyToStart = (state) =>
  state.ui.chosenAlgorithm.name !== "_NONE" && state.ui.dataGrid.rows.length;
export const getRows = (state) => state.ui.dataGrid.rows;
export const getRowsLength = (state) => state.ui.dataGrid.rows.length;
export default uiSlice.reducer;
export const {
  generateData,
  toggleSidebar,
  setColumns,
  setRows,
  selectRows,
  deleteSelectedRows,
  resetRowSelection,
  addNewRow,
  togglePreemptive,
  setTimeQuantum,
  setUnlimitedRows,
  openAuthModal,
  closeAuthModal,
  setModalPage,
} = uiSlice.actions;
