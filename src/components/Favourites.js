function Favourites({ visible, favourites, setFavourites }) {
    return (
        <div className={ "ui segment content" + (!visible && " hidden") }>
            <h1>Favourites</h1>
            <p>Count: { favourites.length }</p>
        </div>
    )
}

export default Favourites;