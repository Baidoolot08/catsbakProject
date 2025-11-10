const buildServer = require("./app").default;
require("dotenv/config");

const server = buildServer();

const startServer = () => {
  try {
    const PORT = process.env.PORT || 3000;
    server.listen(
      { port: PORT, host: "0.0.0.0" },
      () => console.log(`Server run in:http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(`Server crush :${error}`);
    process.exit(1);
  }
};

startServer();