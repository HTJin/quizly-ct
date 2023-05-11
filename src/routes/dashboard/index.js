const MainDashboardRouter = require("express").Router();

// remove current '/' from server.js
MainDashboardRouter.route("/").get(require("./dashboard.view.js"));
MainDashboardRouter.route("/submissions").get(require("./submissions.view.js"));

module.exports = MainDashboardRouter;
