import React, { useState } from 'react';
import LastFmApi from '../api/lastfm';
import LastFmSearch from './Search/LastFmSearch';
import LastFmSearchResult from './SearchResult/LastFmSearchResult';
import { Button, Modal, Message } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';

const LastFm = ({ visible, favourites, setFavourites }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [shortList, setShortList] = useState([]);
  const [open, setOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['favArtists']);

  const updateFavourites = (artistName) => {
    var date = new Date(Date.now());
    var favArtists = cookies.favArtists;

    // Add to favourites
    if(!favArtists.includes(artistName)) {
      favArtists.push(artistName);
    }

    // Remove from favourites (if artist already in session)
    else {
      var index = favArtists.indexOf(artistName);
      favArtists.splice(index, 1);
    }

    setCookie('favArtists', JSON.stringify(favArtists), { expires: new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()) });
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
                <Message className={ shortList.length === 0 ? "" : "hidden" }>
                  <Message.Header>No shortlist added</Message.Header>
                  <p>You haven't added any artists to the shortlist. Pick some from the search results.</p>
                </Message>

                <table className={ "ui very basic table" + (shortList.length === 0 ? " hidden" : "") }>
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