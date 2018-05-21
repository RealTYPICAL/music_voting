import { PlainEntry, IEntry } from "./entry";

export class DataFactory {

    public createDataQueue<T>(queue: IEntry<T>[]): PlainEntry<T>[] {
        const result = queue.map(value => {
            const plainEntry : PlainEntry<T> = {
                downvotes: value.getDownvotes(),
                upvotes: value.getUpvotes(),
                id: value.getID(),
                score: value.getScore(),
                url: value.getUrl()
            }
            return plainEntry;
        });
        
        return result;
    }
}