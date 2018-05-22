import * as bonjourModule from "bonjour";
import * as express from "express";
import * as http from "http";
import { extendApi } from "./votingApi";
import * as mdns from "mdns";

const PORT = 3000;

// advertise a http server on port 3000
var ad = mdns.createAdvertisement(mdns.tcp('voting'), PORT, { name: "Music Voting" });
ad.start();

const app = express();

app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

extendApi(app);

app.listen(PORT);
console.log("Now setup.");