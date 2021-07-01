if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { initApp, establishDbConnection } = require("./app");
const { PORT } = require("./config/app");

async function startServer() {
  try {
    await establishDbConnection();
    const app = initApp();

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}.`);
    });
  } catch (error) {
    console.log("error:", error);
    process.exit(1);
  }
}

startServer();
