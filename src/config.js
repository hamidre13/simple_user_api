import merge from "lodash.merge";
// I disabled the webpack plugin for process.env so I can use my actual enviroment

require("dotenv").config();
//console.log("node env is "+ process.env.NODE_ENV)
let env;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  env = "dev";
} else {
  env = process.env.NODE_ENV;
}

const baseConfig = {
  db: {
    Url: "mongodb://localhost/seodapopCrm"
  },
  port: "3000"
};

let config = {};

export default merge(baseConfig, config.default);
