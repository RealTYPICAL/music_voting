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

export interface PlainEntry<T> {
    url: T;
    id: number;
    upvotes: string[];
    downvotes: string[];
    score: number;
}

export interface IEntry<T> {
    getUrl(): T;
    getID(): number;
    upvote(ip: string): void;
    downvote(ip: string): void;
    getUpvotes(): string[];
    getDownvotes(): string[];
    getScore(): number;
}

class Entry<T> implements IEntry<T> {

    private upVotes: Set<string> = new Set();
    private downvotes: Set<string> = new Set();

    constructor(private readonly url: T, private readonly id: number) {
    }

    getScore(): number {
        return this.upVotes.size - this.downvotes.size;
    }

    public upvote(ip: string): void {
        this.upVotes.add(ip);
        this.downvotes.delete(ip);
    }

    public downvote(ip: string): void {
        this.downvotes.add(ip);
        this.upVotes.delete(ip);
    }

    /**
     * getUrl
     */
    public getUrl(): T {
        return this.url;
    }

    public getUpvotes(): string[] {
        return Array.from(this.upVotes);
    }

    public getDownvotes(): string[] {
        return Array.from(this.downvotes);
    }

    /**
     * getID
     */
    public getID(): number {
        return this.id;
    }
}