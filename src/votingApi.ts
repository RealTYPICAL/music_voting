import { Express } from "express";
import { Vote } from "./vote";
import { IEntry, EntryFactory } from "./entry";

export function extendApi(app: Express) {

    const voting = new Voting();
    const entryFactory = new EntryFactory();

    app.put("/submitEntry", (req, res) => {
        const entry = req.body.entry;
        const url = new URL(entry);
        voting.submitEntry(entryFactory.createEntry(url));
    });

    app.post("/submitVote", (req, res) => {
        const jsonVote = req.body.vote;
        const vote : Vote = JSON.parse(jsonVote);
        voting.submitVote(vote);
    });

    app.get("/getCurrentVote", (req, res) => {
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