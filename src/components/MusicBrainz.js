import MusicBrainzApi from '../api/musicbrainz';
import MusicBrainzSearch from './Search/MusicBrainzSearch';

function MusicBrainz() {
    //Examples

    // Search for Artists
    // MusicBrainzApi.get("/artist", {
    //     params: {
    //         query: <Artist Name>"
    //     }
    // });

    // Search for Releases
    // MusicBrainzApi.get("/release", {
    //     params: {
    //         query: "arid:<Artist ID>"
    //     }
    // });

    return (
        <div className="ui segment">
          <MusicBrainzSearch />
        </div>
      );
}

export default MusicBrainz;