const LastFmSearchResult = ( {artists }) => {
    return (
        <div className="ui segment content">
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th className="two wide"></th>
                        <th className="twelve wide">Artist Name</th>
                        <th className="two wide"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        artists && artists.map((artist) => {
                            return (
                                <tr key={ artist.name }>
                                    <td>
                                        <div className="ui image">
                                            <img src={ artist.image[0]["#text"] } alt="artistImage" />
                                        </div>
                                    </td>
                                    <td>{ artist.name }</td>
                                    <td></td>
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