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

const MusicBrainz = ({ visible }) => {
    return (
        <div className={ "ui segment content" + (!visible && " hidden") }>
          <MusicBrainzSearch onFormSubmit={ searchArtist } onShowRelease={ searchRelease }/>
        </div>
      );
}

export default MusicBrainz;