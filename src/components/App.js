import React, { useState } from 'react';
import Menu from './Menu';
import LastFm from './LastFm';
import MusicBrainz from './MusicBrainz';
import Favourites from './Favourites';
import Content from '../Constants';
import Session from 'react-session-api'

const App = () => {
    Session.config(true, 0);
    
    // Initialize session to empty array if not set
    if(Session.get("favArtists") == null) {
        Session.set("favArtists", JSON.stringify([]));
    }

    // Initialize state and set default page
    const [currentPage, setCurrentPage] = useState(Content.LastFm);
    const [favourites, setFavourites] = useState([]);

    return (
        <div className="ui container">
            <Menu
                navigation={ currentPage }
                setCurrentPage={ setCurrentPage }
                favouritesCount={ favourites.length }
            />
            <LastFm visible={ currentPage === Content.LastFm } favourites={ favourites } setFavourites={ setFavourites } />
            <MusicBrainz visible={ currentPage === Content.MusicBrainz } favourites={ favourites } setFavourites={ setFavourites } />
            <Favourites visible={ currentPage === Content.Favourites } favourites={ favourites } setFavourites={ setFavourites }/>
        </div>
    );
}

export default App;