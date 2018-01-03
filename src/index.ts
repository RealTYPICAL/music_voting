import * as bonjourModule from "bonjour";
import * as http from "http";
import * as express from "express";

const app = express();
const bonjour = bonjourModule();

const PORT = 3000;

app.get('/hello', (req, res) => {
    res.send('hello world');
});

app.listen(PORT);

// const server = http.createServer((req, res) => {
//     res.write("Send this to the client");
//     res.end();
//     res.on('finish', () => {
//         server.close();
//         bonjour.destroy();
//         process.exit(0);
//     });
// });
// server.listen(PORT);
// advertise an HTTP server on port 3000
bonjour.publish({ name: "Music Voting", type: "music-voting", port: PORT });
