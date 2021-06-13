import React, { useState } from 'react';
import LastFmApi from '../api/lastfm';
import LastFmSearch from './Search/LastFmSearch';
import LastFmSearchResult from './SearchResult/LastFmSearchResult';
import { Button, Modal } from 'semantic-ui-react'

const LastFm = ({ visible }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [open, setOpen] = React.useState(false)

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
              trigger={<Button className="ui button center aligned green">Show short-list</Button>}
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
                    <tr>
                      <td><i className="star outline icon orange pointer"></i></td>
                      <td className="left aligned">Artist name</td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Content>
            </Modal>
            </td>
          </tr>
        </tbody>
      </table>
      <LastFmSearch onFormSubmit={ searchArtist } />
      <LastFmSearchResult artists={ (searchResults != null && searchResults.results) && searchResults.results.artistmatches.artist } />
      
    </div>
  );
}

export default LastFm;