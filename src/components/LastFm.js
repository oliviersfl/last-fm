import LastFmApi from '../api/lastfm';
import LastFmSearch from './Search/LastFmSearch';

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
      <LastFmSearch />
    </div>
  );
}

export default LastFm;