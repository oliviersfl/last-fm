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

function LastFm({ visible }) {
  // Examples

  // Search for Artist
  // LastFmApi.get("", {
  //   params: {
  //     artist: "<Artist Name>"
  //   }
  // });
  return (
    <div className={ "ui segment content" + (visible ? "" : " hidden") }>
      <LastFmSearch onFormSubmit={ searchArtist } />
    </div>
  );
}

export default LastFm;