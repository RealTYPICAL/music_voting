import { Express } from "express";
import { IEntry, EntryFactory } from "./entry";
import { Vote } from "./vote";
import { DataFactory } from "./dataFactory";
import { getClientIp, Request } from "request-ip";

export function extendApi(app: Express) {

    const voting = new Voting();
    const entryFactory = new EntryFactory();
    const dataFactory = new DataFactory();

    app.post("/submitEntry", (req, res) => {
        //TODO: Need to handle various data types.
        if(req.body && req.body.entry){
            voting.submitEntry(entryFactory.createEntry(req.body.entry, getIP(req)));
        }
        res.send();
    });

    app.post("/submitVote", (req, res) => {
        const jsonVote = req.body as Vote;
        const clientIP = getIP(req);
        voting.submitVote(jsonVote, clientIP);
        res.send();
    });

    app.get("/getCurrentVote", (req, res) => {
        console.log("Getting current vote " + voting.getCurrentQueue().length);
        const queue = voting.getCurrentQueue();
        const data = dataFactory.createDataQueue(queue);
        res.send(JSON.stringify(data));
    });
}

function getIP(request: Request): string {
    return getClientIp(request).replace("::ffff:", "");
}

class Voting<T> {

    private readonly currentQueue: IEntry<T>[] = [];
    
    constructor(){
    }

    public submitVote(vote: Vote, ip: string): void {
        this.currentQueue.filter(e => e.getID() === vote.id).forEach(e => vote.isUpvote ? e.upvote(ip) : e.downvote(ip));
        this.currentQueue.sort((a, b) => b.getScore() - a.getScore());
    }

    /**
     * startVote
     */
    public submitEntry(track: IEntry<T>) {
        this.currentQueue.push(track);
    }

    /**
     * getCurrentQueue
     */
    public getCurrentQueue(): IEntry<T>[] {
        return this.currentQueue;
    }
}