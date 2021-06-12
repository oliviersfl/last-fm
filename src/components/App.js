import React, { useState } from 'react';
import Menu from './Menu';
import LastFm from './LastFm';
import MusicBrainz from './MusicBrainz';
import Favourites from './Favourites';
import Content from '../Constants';

const App = () => {
    // Initialize state and set default page
    const [currentPage, setCurrentPage] = useState(Content.LastFm);
    return (
        <div className="ui container">
            <Menu
                navigation={ currentPage }
                setCurrentPage={ setCurrentPage }
            />
            <LastFm visible={ currentPage === Content.LastFm } />
            <MusicBrainz visible={ currentPage === Content.MusicBrainz } />
            <Favourites visible={ currentPage === Content.Favourites } />
        </div>
    );
}

export default App;