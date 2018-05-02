import * as bonjourModule from "bonjour";
import * as http from "http";
import * as request from "request";
const bonjour = bonjourModule();

// browse for all http services
bonjour.find({ type: "music-voting" }, (service: bonjourModule.Service) => {
    console.log("Found an HTTP server:", service);
    doAction(service.referer.address, service.port);
});

function doAction(address: string, port: number) {
    // console.log("What did the address end up being: " + address);
    // console.log("and the port is: " + port);
    // const req = request(`http://${address}:${port}/hello`, (error: any, response: request.RequestResponse, body: any) => {
    //     console.log("What did i get back " + response);
    //     console.log("what is the body: " + body);
    //     process.exit(0);
    // });
    request.put(`http://${address}:${port}/submitEntry`, { body: "www.google.com" }, (error: any, response: request.RequestResponse, body: any) => {
        console.log("Success... " + error);
        request(`http://${address}:${port}/getCurrentVote`, (error: any, response: request.RequestResponse, body: any) => {
            console.log("Success... " + body);
        });
    });
}
