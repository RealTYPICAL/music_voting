import { Spotify } from "./spotify";

export class MusicFactory {

    /**
     * createMusicService
     */
    public createMusicService(): IMusic {
        return new Spotify();
    }
}