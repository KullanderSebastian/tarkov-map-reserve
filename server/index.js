const path = require("path");
const express = require("express");
const app = express(); // create express app
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

io.on("connection", (socket) => {
    socket.on("marker", (arg) => {
        io.emit("marker", arg);
    });

    socket.on("changeMarker", (arg) => {
        io.emit("changeMarker", arg);
    });

    socket.on("clearMarkers", () => {
        io.emit("clearMarkers", []);
    });

    socket.on("clearSpecificMarker", () => {
        io.emit("clearSpecificMarker", []);
    });
});

http.listen(PORT, function () {
  console.log(`Server Started on PORT: ${PORT}`);
});
