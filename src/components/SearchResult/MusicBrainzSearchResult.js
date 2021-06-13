const MusicBrainzSearchResult = ({ artists }) => {
    return (
        <div className={ "ui segment content" + (!artists && " hidden") }>
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th>Artist Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        artists && artists.map((artist) => {
                            return (
                                <tr key={ artist.name }>
                                    <td className="twelve wide">{ artist.name }</td>
                                    <td className="four wide">Show Releases</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MusicBrainzSearchResult;