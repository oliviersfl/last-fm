import React, { useState } from 'react';
import LastFmFavourite from "./Favourites/LastFmFavourite";
import MusicBrainzFavourite from "./Favourites/MusicBrainzFavourite";
import { Table, Message } from 'semantic-ui-react';

const Favourites = ({ visible, favourites, setFavourites }) => {
    const [activeArtistRelease, setActiveArtistRelease] = useState(null);
    return (
        <div className={ "ui segment content" + (!visible && " hidden") }>
            <h1>Favourites</h1>

            <Message className={ favourites.length === 0 ? "" : "hidden" }>
                <Message.Header>No favourites added</Message.Header>
                <p>You haven't added any favourites yet. Please search for your favourite artist and releases to add to this list.</p>
            </Message>

            <Table className={ favourites.length === 0 ? "hidden" : "" }>
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
                        <LastFmFavourite key={ favourite } favouriteArtist={ favourite } favourites={ favourites } setFavourites={ setFavourites }/>
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