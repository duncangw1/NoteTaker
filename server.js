// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// Express Configuration
// Creating an "express" server
var app = express();
// Sets an initial port
var PORT = process.env.PORT || 3301;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Router
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
