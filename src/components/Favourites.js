import React, { useState } from 'react';
import LastFmFavourite from "./Favourites/LastFmFavourite";
import MusicBrainzFavourite from "./Favourites/MusicBrainzFavourite";
import { Table } from 'semantic-ui-react'

const Favourites = ({ visible, favourites, setFavourites }) => {
    const [activeArtistRelease, setActiveArtistRelease] = useState(null);
    return (
        <div className={ "ui segment content" + (!visible && " hidden") }>
            <h1>Favourites</h1>
            <p>Count: { favourites.length }</p>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='1'></Table.HeaderCell>
                        <Table.HeaderCell width='12'>Artist Name</Table.HeaderCell>
                        <Table.HeaderCell width='3'></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                    favourites.map(favourite => {
                        return typeof(favourite) === "string" ?
                        <LastFmFavourite key={ favourite.id } favouriteArtist={ favourite } favourites={ favourites } setFavourites={ setFavourites }/>
                        :
                        <MusicBrainzFavourite
                            key={ favourite.id }
                            favouriteRelease={ favourite }
                            favourites={ favourites }
                            setFavourites={ setFavourites }
                            activeArtistRelease={ activeArtistRelease }
                            setActiveArtistRelease={ setActiveArtistRelease }
                        />
                    })
                }
                </Table.Body>
            </Table>
        </div>
    )
}

export default Favourites;