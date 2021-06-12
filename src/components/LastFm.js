import React, { useState } from 'react';
import LastFmApi from '../api/lastfm';
import LastFmSearch from './Search/LastFmSearch';
import LastFmSearchResult from './LastFmSearchResult';

const LastFm = ({ visible }) => {
  const [searchResults, setSearchResults] = useState(null);

  const searchArtist = (term) => {
    LastFmApi.get("", {
      params: {
        artist: term
      }
    }).then((response) => {
      setSearchResults(response.data);
    }, (error) => {
      
    });
  }

  return (
    <div className={ "ui segment content" + (visible ? "" : " hidden") }>
      <LastFmSearch onFormSubmit={ searchArtist } />
      <LastFmSearchResult artists={ searchResults == null ? null : searchResults.results.artistmatches.artist }/>
    </div>
  );
}

export default LastFm;