// Dependencies
var fs = require("fs");

// Routing
module.exports = function (app) {
  var notes = require("../db/db.json");

  app.get("/api/notes", function (req, res) {
    return res.json(notes);
  });

  app.get("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    // var found;
    notes.forEach((i) => {
      if (id == i.id) {
        // found = i;
        return res.json(i);
      }
    });
    return res.json(false);
  });

  app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    if (notes.length === 0) {
      newNote.id = 1;
    } else {
      newNote.id = notes[notes.length - 1].id + 1;
    }
    notes.push(newNote);
    var jsonNotes = JSON.stringify(notes);
    fs.writeFile("./db/db.json", jsonNotes, function (err) {
      if (err) return console.log(err);
    });
    res.json(true);
  });

  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    // var found;
    notes.forEach((j, index) => {
      if (id == j.id) {
        notes.splice(index, 1);
        var notesCopy = notes.slice();
        var jsonNotes = JSON.stringify(notesCopy);
        fs.writeFile("./db/db.json", jsonNotes, function (err) {
          if (err) return console.log(err);
        });
      }
    });
    res.json(true);
  });
};
