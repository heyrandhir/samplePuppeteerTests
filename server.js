const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 8000;

http.createServer(function (req, res) {
    console.log(`Request received for '${req.url}'`);

    // Serve the index.html file
    if (req.url === "/" || req.url === "/index.html") {
        fs.readFile(__dirname + "/index.html", function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // Serve the JavaScript file
    else if (req.url === "/index.js") {
        fs.readFile(__dirname + "/index.js", function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.end(data);
        });
    }

    // Serve any other file as 404
    else {
        res.writeHead(404);
        res.end("File not found");
    }
}).listen(port, () => console.log(`Listening on port ${port}`));
