import express from "express";
import globalRouter from "./modules/routes";

const buildServer = () => {
  const server = express();
  server.use(express.json());

  server.get("/", (req, res) => {
    res.status(200).json({ message: "Hello bro" });
  });

  server.use("/api", globalRouter);
  return server;
};

export default buildServer;
