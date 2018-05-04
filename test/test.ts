import * as bonjourModule from "bonjour";
import * as http from "http";
import * as request from "request";
import * as _ from "underscore";
import * as ip from "ip";
const bonjour = bonjourModule();

// browse for all http services
bonjour.find({ type: "music-voting" }, (service: bonjourModule.Service) => {
    console.log("Found an HTTP server: ", service);
    const address = _.find(service.addresses, e => ip.isV4Format(e));
    if (address) {
        doAction(address, service.port);
    }
});

function doAction(address: string, port: number) {
    // console.log("What did the address end up being: " + address);
    // console.log("and the port is: " + port);
    // const req = request(`http://${address}:${port}/hello`, (error: any, response: request.RequestResponse, body: any) => {
    //     console.log("What did i get back " + response);
    //     console.log("what is the body: " + body);
    //     process.exit(0);
    // });
    var options = {
        uri: `http://${address}:${port}/submitEntry`,
        json: {
            "entry": "http://www.google.com/"
        }
    };

    request.post(options, (error: any, response: request.RequestResponse, body: any) => {
        console.log("Success... " + error);
        request(`http://${address}:${port}/getCurrentVote`, (error: any, response: request.RequestResponse, body: any) => {
            console.log("Success... " + body);
        });
    });
}
