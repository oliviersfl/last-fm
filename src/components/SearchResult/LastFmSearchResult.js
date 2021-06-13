const LastFmSearchResult = ( {artists }) => {
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
                                        <i className="plus circle icon big green" title={ "Add " + artist.name + " to shortlist" }></i>
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