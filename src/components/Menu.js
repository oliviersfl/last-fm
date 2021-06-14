import Content from '../Constants';

function Menu({ navigation, setCurrentPage, favouritesCount }) {
    return (
        <div className="app">
            <div className="ui secondary pointing menu">
                <a
                    className={ navigation === Content.MusicBrainz ? "active item" : "item" }
                    onClick={ () => setCurrentPage(Content.MusicBrainz)
                }>
                    MusicBrainz
                </a>
                <a
                    className={ navigation === Content.LastFm ? "active item" : "item" }
                    onClick={ () => setCurrentPage(Content.LastFm)
                }>
                    Last.fm
                </a>
                <a
                    className={ navigation === Content.Favourites ? "active item" : "item" }
                    onClick={ () => setCurrentPage(Content.Favourites) }

                >
                    ⭐ Favourites { favouritesCount > 0 ? "(" + favouritesCount + ") " : "" }
                </a>
            </div>
        </div>
    );
}

export default Menu;