const LastFmSearchResult = ( {artists, shortList, setShortList }) => {
    const addToShortList = (artistName) => {
        // Do not add if already in shortlist
        if(shortList.includes(artistName)) {
            return;
        }
        shortList.push(artistName);
        // Update state to update count of short list
        setShortList(Array.from(shortList));
    }
    return (
        <div className={ "ui segment content" + (!artists ? " hidden" : "") }>
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th className="one wide"></th>
                        <th className="fourteen wide">Artist Name</th>
                        <th className="one wide"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        artists && artists.map((artist) => {
                            return (
                                <tr key={ artist.name }>
                                    <td className="center aligned">
                                        <div className="ui image">
                                            <img src={ artist.image[0]["#text"] } alt="artist" />
                                        </div>
                                    </td>
                                    <td>{ artist.name }</td>
                                    <td className="center aligned">
                                        <i
                                            className={ "plus circle icon big link " + (shortList.includes(artist.name) ? " grey" : " green" ) }
                                            title={ "Add " + artist.name + " to shortlist" }
                                            onClick={ () => addToShortList(artist.name) }
                                        ></i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default LastFmSearchResult;