import { Icon, Button, Table } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';

const MusicBrainzFavourite = ({ favouriteRelease, favourites, setFavourites }) => {
    const [cookies, setCookie] = useCookies(['favArtists']);

    const removeArtist = () => {
        var fav = favourites.slice();
        for(var i = 0; i < favourites.length; i++) {
            if(typeof(favourites[i]) == "string") {
                continue;
            }

            if(favourites[i].id === favouriteRelease.id) {
                console.warn("release to be removed found");
                fav.splice(i, 1);
                setFavourites(fav);
                console.log(fav);
                var date = new Date(Date.now());
                setCookie('favArtists', JSON.stringify(fav), { expires: new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()) });
                return;
            }
        }
    }

    return (
        <Table.Row>
            <Table.Cell textAlign='center'><Icon color='red' name='minus circle' className='pointer' size='large' onClick={ () => removeArtist() } /></Table.Cell>
            <Table.Cell>{ favouriteRelease.name }</Table.Cell>
            <Table.Cell textAlign='center'><Button basic color='green' content='Show Releases' /></Table.Cell>
        </Table.Row>
    );
}

export default MusicBrainzFavourite;