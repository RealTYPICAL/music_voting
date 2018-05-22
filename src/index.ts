import * as bonjourModule from "bonjour";
import * as express from "express";
import * as http from "http";
import { extendApi } from "./votingApi";

const app = express();
const bonjour = bonjourModule({ multicast: true });

const PORT = 3000;

app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

extendApi(app);

app.listen(PORT);

bonjour.publish({ name: "music", type: "http", port: PORT });

console.log("Now setup.");