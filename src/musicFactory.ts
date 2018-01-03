
class MusicFactory {

    /**
     * createMusicService
     */
    public createMusicService(): IMusic {
        return new Spotify();
    }
}