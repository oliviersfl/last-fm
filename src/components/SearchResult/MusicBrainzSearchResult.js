import React, { useState } from 'react';
import MusicBrainzRelease from "./MusicBrainzRelease";

const MusicBrainzSearchResult = ({ artists }) => {
    const [activeArtistRelease, setActiveArtistRelease] = useState(null);

    return (
        <div className={ "ui segment content" + (!artists ? " hidden" : "") }>
            <table className="ui basic celled table">
                <thead>
                    <tr>
                        <th className="thirteen wide">Artist Name</th>
                        <th className="three wide"></th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        artists && artists.map((artist) => {
                            return (
                                <React.Fragment key={ artist.id }>
                                    <tr>
                                        <td className="twelve wide">{ artist.name }</td>
                                        <td className="four wide center aligned">
                                            <button className="ui green basic button" onClick={ () => setActiveArtistRelease(artist.id === activeArtistRelease ? null : artist.id) }>{ artist.id === activeArtistRelease ? "Hide" : "Show" } Releases</button>
                                        </td>
                                    </tr>
                                    <tr className={ artist.id === activeArtistRelease ? "" : "hidden"}>
                                        <td colSpan="2">
                                            <MusicBrainzRelease artistId={ artist.id } visible="false" />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MusicBrainzSearchResult;