// Dependencies
var fs = require("fs");

// Routing
module.exports = function (app) {
  // Reading notes
  fs.readFile("db/db.json", "utf8", function (err, data) {
    if (err) {
      throw err;
    }
    // Setting notes to variable notesData
    var notesData = JSON.parse(data);

    // API GET Requests
    app.get("/api/notes", function (req, res) {
      res.json(notesData);
    });

    app.get("/api/notes/:id", function (req, res) {
      res.json(notesData[req.params.id]);
    });

    // API POST Requests
    app.post("/api/notes", function (req, res) {
      notesData.push(req.body);
      res.json(true);
    });

    // API note deletion by ID
    app.delete("/api/notes/:id", function (req, res) {
      notesData.splice(req.params.id, 1);
      updateDbJson();
    });

    // Function to update the db.json file
    function updateDbJson() {
      fs.writeFile("db/db.json", JSON.stringify(notesData, "\t"), function (
        err
      ) {
        if (err) {
          throw err;
        }
        return true;
      });
    }
  });
};
