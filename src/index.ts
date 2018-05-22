import * as bonjourModule from "bonjour";
import * as express from "express";
import * as http from "http";
import { extendApi } from "./votingApi";

// import the module
var mdns = require('mdns');
 
// advertise a http server on port 4321
var ad = mdns.createAdvertisement(mdns.tcp('http'), 4321, { name: "secret pronz channel" });
ad.start();
 
// watch all http servers
var browser = mdns.createBrowser(mdns.tcp('http'));
browser.on('serviceUp', function(service: any) {
  console.log("service up: ", service);
});
browser.on('serviceDown', function(service: any) {
  console.log("service down: ", service);
});
browser.start();

const app = express();
const bonjour = bonjourModule({ multicast: true });

const PORT = 3005;

app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

extendApi(app);

app.listen(PORT);

bonjour.publish({ name: "musicsomething", type: "http", port: PORT }).start();

console.log("Now setup.");