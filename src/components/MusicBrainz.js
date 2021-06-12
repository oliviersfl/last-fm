import MusicBrainzApi from '../api/musicbrainz';
import MusicBrainzSearch from './Search/MusicBrainzSearch';

function searchArtist(term) {
  MusicBrainzApi.get("/artist", {
    params: {
      query: term
    }
  }).then((response) => {
    
  });
}

function searchRelease(artistId) {
  MusicBrainzApi.get("/release", {
      params: {
          query: artistId
      }
  });
}

function MusicBrainz({ visible }) {
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
        <div className={ "ui segment content" + (visible ? "" : " hidden") }>
          <MusicBrainzSearch onFormSubmit={ searchArtist } onShowRelease={ searchRelease }/>
        </div>
      );
}

export default MusicBrainz;