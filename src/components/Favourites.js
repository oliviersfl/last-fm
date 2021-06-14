function Favourites({ visible, favourites, setFavourites }) {
    console.log(favourites);
    return (
        <div className={ "ui segment content" + (!visible && " hidden") }>
            <h1>Favourites</h1>
            <p>Count: { favourites.length }</p>

            {
                favourites.map(favourite => {
                    return typeof(favourite) === "string" ?
                    <p>{ favourite }</p>
                    :
                    <div>
                        <h2>{ favourite.name }</h2>
                        { favourite.releases.map(release => {
                            return <p><i>{ release.title }</i></p>
                        }) }
                    </div>
                })
            }
        </div>
    )
}

export default Favourites;