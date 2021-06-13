function Favourites({ visible }) {
    return (
        <div className={ "ui segment content" + (!visible && " hidden") }>
            <h1>Favourites</h1>
        </div>
    )
}

export default Favourites;