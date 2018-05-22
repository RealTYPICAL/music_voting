import * as bonjourModule from "bonjour";
import * as http from "http";
import * as request from "request";
import * as _ from "underscore";
import * as ip from "ip";
import { IEntry } from "../src/entry";
import { Entry } from "../src/model/entry";
import { Vote } from "../src/vote";
const bonjour = bonjourModule();

bonjour.find( { type: "http", protocol: "tcp" }, service => {
    console.log("woiejfowiejfowe: " + service.name);
    console.log("fqdn: " + service.fqdn);
    console.log("stuff: " + service.referer.address + service.port);
});

bonjour.find( { type: "googlecast", protocol: "tcp" }, service => {
    console.log("woiejfowiejfowe: " + service.name);
    console.log("fqdn: " + service.fqdn);
});

// browse for all http services
// bonjour.find({ type: "music-voting" }, (service: bonjourModule.Service) => {
//     console.log("Found an HTTP server: ", service);
//     const address = _.find(service.addresses, e => ip.isV4Format(e));
//     if (address) {
//         doAction(address, service.port);
//     }
// });

// function doAction(address: string, port: number) {
//     const newLocal = `http://${address}:${port}`;
//     var options = {
//         json: {
//             "entry": "http://www.google.com/"
//         }
//     };

//     request.post(`${newLocal}/submitEntry`, options, (error: any, response: request.RequestResponse, body: any) => {
//         request(`${newLocal}/getCurrentVote`, (error: any, response: request.RequestResponse, body: any) => {
//             console.log("Success... " + body);
//             const something = JSON.parse(body);
//             const entry = _.first(something) as Entry<string>;
//             const vote : Vote = {
//                 id: entry.id,
//                 isUpvote: true
//             };
//             request.post(`${newLocal}/submitVote`, { json: vote }, (error: any, response: request.RequestResponse, body: any) => {
//                 request(`${newLocal}/getCurrentVote`, (error: any, response: request.RequestResponse, body: any) => {
//                     console.log('Finally? ' + body);
//                     process.exit(0);
//                 });
//             });
//         });
//     });
// }
