import Menu from './Menu';
import LastFm from './LastFm';
import MusicBrainz from './MusicBrainz';
import Favourites from './Favourites';

function App() {
    return (
        <div className="ui container">
            <Menu />
            <LastFm />
            <MusicBrainz />
            <Favourites />
        </div>
    );
}

export default App;