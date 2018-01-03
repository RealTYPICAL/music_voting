const spotify = require("spotify-web-api-node");
const s = new spotify();

export class Spotify implements IMusic {

    public playSong(){
        s.getTrack("3PP8JmWW30upEsA9nT964p").then((e: any) => {
            console.log("What did I get?: " + e);
        });
    }
}
