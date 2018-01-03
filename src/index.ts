import * as bonjourModule from "bonjour";
import * as express from "express";
import * as http from "http";

const app = express();
const bonjour = bonjourModule();

const PORT = 3000;

const factory = new MusicFactory();
const musicService = factory.createMusicService();

app.get("/hello", (req, res) => {
    res.send("hello world");
});

app.listen(PORT);

bonjour.publish({ name: "Music Voting", type: "music-voting", port: PORT });
