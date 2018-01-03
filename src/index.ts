import * as bonjourModule from "bonjour";
import * as http from "http";
import * as request from "request";
const bonjour = bonjourModule();

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.write("Send this to the client");
    res.end();
});
server.listen(3000);

// advertise an HTTP server on port 3000
bonjour.publish({ name: "My Web Server", type: "http", port: 3000 });

// browse for all http services
bonjour.find({ type: "http" }, (service: bonjourModule.Service) => {
    console.log("Found an HTTP server:", service);
    doAction(service.referer.address, service.port);
});

function doAction(address: string, port: number) {
    console.log("What did the address end up being: " + address);
    console.log("and the port is: " + port);
    const req = request(`http://${address}:${port}`, (error, response: request.RequestResponse, body) => {
        console.log("What did i get back " + response);
        console.log("what is the body: " + body);
    });
}
