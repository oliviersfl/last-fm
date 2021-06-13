import React, { useState } from 'react';
import MusicBrainzApi from '../api/musicbrainz';
import MusicBrainzSearch from './Search/MusicBrainzSearch';
import MusicBrainzSearchResult from './MusicBrainzSearchResult';

const MusicBrainz = ({ visible }) => {
  const [searchResults, setSearchResults] = useState(null);

  const searchArtist = (term) => {
    MusicBrainzApi.get("/artist", {
      params: {
        query: term
      }
    }).then((response) => {
      setSearchResults(response.data);
    }, (error) => {
      
    });
  }

  const searchRelease = (artistId) => {
    MusicBrainzApi.get("/release", {
      params: {
          query: artistId
      }
    }).then((response) => {
      
    }, (error) => {
      
    });
  }

  return (
    <div className={ "ui segment content" + (!visible && " hidden") }>
      <MusicBrainzSearch onFormSubmit={ searchArtist } onShowRelease={ searchRelease }/>
      <MusicBrainzSearchResult artists={ (searchResults != null && searchResults.artists) && searchResults.artists } />
    </div>
  );
}

export default MusicBrainz;