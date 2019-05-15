import express from "express";
import bodyParser from "body-parser";
import {} from "lodash";

import { restRouter } from "./api";

const app = express();
/** cors will let use use cross origin cookies for this specisific url*/
// app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** This file has to be changed with our react app*/
app.get("/", function(req, res) {
  res.sendFile("index.html", { root: __dirname + "/public" });
});

app.use("/api", restRouter);

export default app;
