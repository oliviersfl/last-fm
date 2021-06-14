import React, { useState } from 'react';
import Menu from './Menu';
import LastFm from './LastFm';
import MusicBrainz from './MusicBrainz';
import Favourites from './Favourites';
import Content from '../Constants';
import { useCookies } from 'react-cookie';

const App = () => {
    const [cookies, setCookie] = useCookies(['favArtists']);
    
    // Initialize session to empty array if not set
    if(cookies.favArtists == null) {
        setCookie('favArtists', JSON.stringify([]));
    }

    // Initialize state and set default page
    const [currentPage, setCurrentPage] = useState(Content.LastFm);
    const [favourites, setFavourites] = useState(cookies.favArtists);

    return (
        <div className="ui container">
            <Menu
                navigation={ currentPage }
                setCurrentPage={ setCurrentPage }
                favouritesCount={ favourites !== undefined && favourites.length }
            />
            <LastFm visible={ currentPage === Content.LastFm } favourites={ favourites !== undefined && favourites } setFavourites={ setFavourites } />
            <MusicBrainz visible={ currentPage === Content.MusicBrainz } favourites={ favourites !== undefined && favourites } setFavourites={ setFavourites } />
            <Favourites visible={ currentPage === Content.Favourites } favourites={ favourites !== undefined && favourites } setFavourites={ setFavourites }/>
        </div>
    );
}

export default App;