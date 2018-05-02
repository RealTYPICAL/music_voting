

export class Vote {

    constructor(private readonly id: number) {
        
    }
    isUpvote(): boolean {
        return true;
    }

    getId(): number {
        return this.id;
    }
}