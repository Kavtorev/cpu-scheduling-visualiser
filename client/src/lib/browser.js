const STORAGE_NAME = "persistency";
const STORAGE_TEMPLATE = "unauthorized";

const isInitialized = () => !!localStorage.getItem(STORAGE_NAME);

const initStrategyTracker = () => {
  if (!isInitialized()) {
    localStorage.setItem(STORAGE_NAME, STORAGE_TEMPLATE);
  }
};

const revertStrategy = () =>
  localStorage.setItem(STORAGE_NAME, STORAGE_TEMPLATE);

const getStrategy = () =>
  isInitialized() ? localStorage.getItem(STORAGE_NAME) : null;

const setStrategy = (strgName = "") =>
  localStorage.setItem(STORAGE_NAME, strgName);

const isAnyStrategy = () => {
  const item = getStrategy();
  return item && item !== STORAGE_TEMPLATE;
};

const isLocalStrategy = () => {
  const item = getStrategy();
  return item && item === "local";
};

export {
  initStrategyTracker,
  getStrategy,
  setStrategy,
  isAnyStrategy,
  revertStrategy,
  isLocalStrategy,
};
