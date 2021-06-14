import React from 'react';
import { Icon, Button, Table } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';

const MusicBrainzFavourite = ({ favouriteRelease, favourites, setFavourites, activeArtistRelease, setActiveArtistRelease }) => {
    const [cookies, setCookie] = useCookies(['favArtists']);

    const removeArtist = () => {
        var fav = favourites.slice();
        for(var i = 0; i < favourites.length; i++) {
            if(typeof(favourites[i]) == "string") {
                continue;
            }

            if(favourites[i].id === favouriteRelease.id) {
                fav.splice(i, 1);
                setFavourites(fav);
                var date = new Date(Date.now());
                setCookie('favArtists', JSON.stringify(fav), { expires: new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()) });
                return;
            }
        }
    }

    const removeRelease = (releaseId) => {
        var fav = favourites.slice();

        for(var i = 0; i < fav.length; i++) {
            if(typeof(fav[i]) == "string") {
                continue;
            }
            for(var j = 0; j < fav[i].releases.length; j++) {
                if(fav[i].releases[j].id === releaseId) {
                    fav[i].releases.splice(j, 1);

                    if(fav[i].releases.length === 0) {
                        fav.splice(i, 1);
                    }
                    setFavourites(fav);
                    var date = new Date(Date.now());
                    setCookie('favArtists', JSON.stringify(fav), { expires: new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()) });
                    return;
                }
            }
        }
    }

    return (
        <React.Fragment>
            <Table.Row>
                <Table.Cell textAlign='center'><Icon color='red' name='minus circle' className='pointer' size='large' onClick={ () => removeArtist() } /></Table.Cell>
                <Table.Cell>{ favouriteRelease.name }</Table.Cell>
                <Table.Cell textAlign='center'><Button basic color='green' content={ (favouriteRelease.id === activeArtistRelease ? 'Hide' : 'Show') + ' Releases' } onClick={ () => setActiveArtistRelease(favouriteRelease.id === activeArtistRelease ? null : favouriteRelease.id) } /></Table.Cell>
            </Table.Row>
            <Table.Row className={ favouriteRelease.id === activeArtistRelease ? "" : "hidden"}>
                <Table.Cell colSpan="3">
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Year</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Release Label</Table.HeaderCell>
                                <Table.HeaderCell>Number of tracks</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {
                            favouriteRelease.releases.map(release => {
                                return (
                                    <Table.Row key={ release.id }>
                                        <Table.Cell><Icon color='red' name='minus circle' className='pointer' size='large' onClick={ () => removeRelease(release.id) } /></Table.Cell>
                                        <Table.Cell>{ release.year }</Table.Cell>
                                        <Table.Cell>{ release.title }</Table.Cell>
                                        <Table.Cell>{ release.label }</Table.Cell>
                                        <Table.Cell>{ release.noTracks }</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                        </Table.Body>
                    </Table>
                </Table.Cell>
            </Table.Row>
        </React.Fragment>
    );
}

export default MusicBrainzFavourite;