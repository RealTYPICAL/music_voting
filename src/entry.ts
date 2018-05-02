
export class EntryFactory<T> {

    private entryID = 0;

    /**
     * createEntry
     */
    public createEntry(value: T): IEntry<T> {
        return new Entry(value, this.getEntryID());
    }

    private getEntryID(): number {
        this.entryID++;
        return this.entryID;
    }
}

export interface IEntry<T> {
    getUrl(): T;
    getID(): number;
    upvote(): void;
    downvote(): void;
    getScore(): number;
}

class Entry<T> implements IEntry<T> {

    private score: number = 1;

    constructor(private readonly url: T, private readonly id: number) {
    }
    
    getScore(): number {
        return this.score;
    }

    upvote(): void {
        this.score++;
    }

    downvote(): void {
        this.score--;
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