import { Icon, Table } from 'semantic-ui-react'
import { useCookies } from 'react-cookie';

const LastFmFavourite = ( { favouriteArtist, favourites, setFavourites }) => {
    const [cookies, setCookie] = useCookies(['favArtists']);

    const removeLastFmFavourite = () => {
        // make copy of array
        var fav = favourites;

        // remove artist from new temp array
        var index = fav.indexOf(favouriteArtist);
        fav.splice(index, 1);

        // assign to favourites object
        setFavourites(fav);
        var date = new Date(Date.now());
        setCookie('favArtists', JSON.stringify(fav), { expires: new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()) });
    }

    return(
        <Table.Row key={ favouriteArtist }>
            <Table.Cell textAlign='center'>
                <Icon
                    color='red'
                    name='minus circle'
                    className='link'
                    size='large'
                    onClick={ () => removeLastFmFavourite() }
                    title={ "Remove " + favouriteArtist + " from favourites" }
                />
            </Table.Cell>
            <Table.Cell>{ favouriteArtist }</Table.Cell>
            <Table.Cell textAlign='center'></Table.Cell>
        </Table.Row>
    );
}

export default LastFmFavourite;