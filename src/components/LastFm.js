import LastFmApi from '../api/lastfm';
import LastFmSearch from './Search/LastFmSearch';

function searchArtist(term) {
  LastFmApi.get("", {
    params: {
      artist: term
    }
  }).then((response) => {
    
  });
}

const LastFm = ({ visible }) => {
  return (
    <div className={ "ui segment content" + (visible ? "" : " hidden") }>
      <LastFmSearch onFormSubmit={ searchArtist } />
    </div>
  );
}

export default LastFm;