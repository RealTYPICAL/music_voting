import { Express } from "express";
import { Vote } from "./vote";
import { IEntry, EntryFactory } from "./entry";

export function extendApi(app: Express) {

    const voting = new Voting();
    const entryFactory = new EntryFactory();

    app.post("/submitEntry", (req, res) => {
        //TODO: Need to handle various data types.
        if(req.body && req.body.entry){
            voting.submitEntry(entryFactory.createEntry(req.body.entry));
        }
        res.send();
    });

    app.post("/submitVote", (req, res) => {
        const jsonVote = req.body.vote;
        const vote : Vote = JSON.parse(jsonVote);
        voting.submitVote(vote);
    });

    app.get("/getCurrentVote", (req, res) => {
        console.log("Getting current vote " + voting.getCurrentQueue().length);
        res.send(JSON.stringify(voting.getCurrentQueue()));
    });
}

class Voting<T> {

    private readonly currentQueue: IEntry<T>[] = [];
    
    constructor(){
    }
    

    public submitVote(vote: Vote): void {
        this.currentQueue.filter(e => e.getID() === vote.getId()).forEach(e => vote.isUpvote() ? e.upvote() : e.downvote());
        this.currentQueue.sort((a, b) => a.getScore() - b.getScore());
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