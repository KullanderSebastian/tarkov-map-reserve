const path = require("path");
const express = require("express");
const app = express(); // create express app
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var PORT = process.env.PORT || 5000;



// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

//io.on("connection", function (socket) {
//    console.log("hey");
//});

io.on("connection", (socket) => {
    socket.on("marker", (arg) => {
        console.log(arg);
        io.emit("marker", arg);
    });
});

http.listen(PORT, function () {
  console.log(`Server Started on PORT: ${PORT}`);
});
