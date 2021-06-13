import React, { useState, useEffect } from 'react';
import LastFmApi from '../api/lastfm';
import LastFmSearch from './Search/LastFmSearch';
import LastFmSearchResult from './SearchResult/LastFmSearchResult';
import { Button, Modal } from 'semantic-ui-react';
import Session from 'react-session-api';

const LastFm = ({ visible }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [shortList, setShortList] = useState([]);
  const [open, setOpen] = React.useState(false)
  const [favourites, setFavourites] = React.useState([]);

  useEffect(() => {
    var favArtists = JSON.parse(Session.get("favArtists"));
    setFavourites(favArtists);
  }, [open]);

  const updateFavourites = (artistName) => {

    var favArtists = JSON.parse(Session.get("favArtists"));

    // Add to favourites
    if(!favArtists.includes(artistName)) {
      favArtists.push(artistName);
      Session.set("favArtists", JSON.stringify(favArtists));
    }

    // Remove from favourites (if artist already in session)
    else {
      var index = favArtists.indexOf(artistName);
      favArtists.splice(index, 1);
      Session.set("favArtists", JSON.stringify(favArtists));
    }
    
    setFavourites(favArtists);
  }

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
    <div className={ "ui segment content" + (!visible ? " hidden" : "") }>
      <table className="ui very basic table">
        <tbody>
          <tr>
            <td className="thirteen wide"></td>
            <td className="three wide right aligned">
            <Modal
              closeIcon
              onClose={ () => setOpen(false) }
              onOpen={ () => setOpen(true) }
              open={ open }
              trigger={<Button className="ui button center aligned green">Show short-list ({ shortList.length })</Button>}
            >
              <Modal.Header>Your Shortlist</Modal.Header>
              <Modal.Content>
                <table className="ui very basic table">
                  <thead>
                    <tr>
                      <th className="one wide"></th>
                      <th className="fifteen wide">Artist Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      shortList.map(artist => {
                        return (
                          <tr key={ artist }>
                            <td><i className={ "star icon orange pointer" + (favourites.includes(artist) ? "" : " outline") } onClick={ () => updateFavourites(artist) }></i></td>
                            <td className="left aligned">{ artist }</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </Modal.Content>
            </Modal>
            </td>
          </tr>
        </tbody>
      </table>
      <LastFmSearch onFormSubmit={ searchArtist } />
      <LastFmSearchResult
        artists={ (searchResults != null && searchResults.results) && searchResults.results.artistmatches.artist }
        shortList={ shortList }
        setShortList={ setShortList }
      />
      
    </div>
  );
}

export default LastFm;