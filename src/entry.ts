import _ = require("underscore");

export class EntryFactory<T> {

    private entryID = 0;

    /**
     * createEntry
     */
    public createEntry(value: T, ip: string): IEntry<T> {
        const entry = new Entry(value, this.getEntryID());
        entry.upvote(ip);
        return entry;
    }

    private getEntryID(): number {
        this.entryID++;
        return this.entryID;
    }
}

export interface IEntry<T> {
    getUrl(): T;
    getID(): number;
    upvote(ip: string): void;
    downvote(ip: string): void;
    getScore(): number;
}

class Entry<T> implements IEntry<T> {

    private score: number = 0;
    private currentVotes: string[] = [];

    constructor(private readonly url: T, private readonly id: number) {
    }

    getScore(): number {
        return this.score;
    }

    upvote(ip: string): void {
        if (!_.contains(this.currentVotes, ip)) {
            this.currentVotes.push(ip);
            this.score++;
        }
    }

    downvote(ip: string): void {
        if (!_.contains(this.currentVotes, ip)) {
            this.currentVotes.push(ip);
            this.score--;
        }
    }

    /**
     * getUrl
     */
    public getUrl() {
        return this.url;
    }

    /**
     * getID
     */
    public getID() {
        return this.id;
    }
}