const { NODE_ENV = "development", PORT = 5000 } = process.env;

module.exports = { IN_PROD: NODE_ENV === "production", PORT };
