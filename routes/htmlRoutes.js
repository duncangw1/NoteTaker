// Dependencies
var path = require("path");

// Routing
module.exports = function (app) {
  // HTML GET Requests
  // Returns notes page
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // Returns index (default) page
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
