import React, { useState, useEffect } from 'react';
import MusicBrainzApi from '../../api/musicbrainz';
import Session from 'react-session-api';

const MusicBrainzRelease = ({ artistId }) => {
    const [releases, setReleases] = useState(null);
    const [favourites, setFavourites] = React.useState([]);

    useEffect(() => {
        searchRelease(artistId);
        var favArtists = JSON.parse(Session.get("favArtists"));
        setFavourites(favArtists);
    }, [artistId]);

    const favouritesHasRelease = (releaseId) => {
        var releaseFound = false;
        for(var i = 0; i < favourites.length; i++) {
            if(typeof(favourites[i]) == "string") {
                continue;
            }
            for(var j = 0; j < favourites[i].releases.length; j++) {
                if(favourites[i].releases[j].id === releaseId) {
                    releaseFound = true;
                }
            }
        }
        return releaseFound;
    }

    const updateFavourites = (releaseObj) => {

        var favArtists = JSON.parse(Session.get("favArtists"));

        // if artist not found create new artist with release
        if(favArtists.findIndex(x => x.id === artistId) === -1) {

            var artistName = releaseObj["artist-credit"] && releaseObj["artist-credit"][0].name;
            var label = (releaseObj["label-info"] && releaseObj["label-info"].length > 0 && releaseObj["label-info"][0].label && releaseObj["label-info"][0].label.name) ? releaseObj["label-info"][0].label.name : "";
            var release = {
                id: releaseObj.id,
                year: releaseObj.date && new Date(releaseObj.date).getFullYear(),
                title: releaseObj.title,
                label: label,
                noTracks: releaseObj["track-count"]
            }
            
            var artist = {
                id: artistId,
                name: artistName,
                releases: [release]
            }

            favArtists.push(artist);
            Session.set("favArtists", JSON.stringify(favArtists));
        }

        // if artist found
        else {
            var releaseFound = false;
            var a, b = -1;
            for(var i = 0; i < favArtists.length; i++) {
                if(typeof(favArtists[i]) == "string") {
                    continue;
                }
                for(var j = 0; j < favArtists[i].releases.length; j++) {
                    if(favArtists[i].releases[j].id === releaseObj.id) {
                        releaseFound = true;
                        a = i;
                        b = j;
                    }
                }
            }
            // if release not found, add to favourites to existing artist
            if(!releaseFound) {
                var release = {
                    id: releaseObj.id,
                    year: releaseObj.date && new Date(releaseObj.date).getFullYear(),
                    title: releaseObj.title,
                    label: label,
                    noTracks: releaseObj["track-count"]
                }
                var index = favArtists.findIndex(x => x.id === artistId);
                favArtists[index].releases.push(release);
                Session.set("favArtists", JSON.stringify(favArtists));
            }

            // if release found, remove from favourites
            else {
                favArtists[a].releases.splice(b, 1);

                if(favArtists[a].releases.length === 0) {
                    favArtists.splice(a, 1);
                }
                Session.set("favArtists", JSON.stringify(favArtists));
            }
        }

        setFavourites(favArtists);
    }

    const searchRelease = async (artistId) => {
        await MusicBrainzApi.get("/release", {
        params: {
            query: "arid:" + artistId
        }
        }).then((response) => {
            setReleases(response.data.releases);
        }, (error) => {
        
        });
    }

    return (
        releases &&

        <React.Fragment>
            {/* Hide table if no Release available  */}
            <div className={ "ui error message" + (releases.length === 0 ? "" : " hidden") }>
                <div className="header">No releases found for this artist</div>
            </div>

            {/* Show content if Releases found  */}
            <table className={ "ui table" + (releases.length > 0 ? "" : " hidden")}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Year</th>
                        <th>Title</th>
                        <th>Release Label</th>
                        <th>Number of tracks</th>
                    </tr>
                    {
                        releases.map((release) => {
                            return (
                                <tr key={ release.id }>
                                    <td>
                                        <i className={ "star icon orange pointer" + (favouritesHasRelease(release.id) ? "" : " outline") } onClick={ () => updateFavourites(release) }></i>
                                    </td>
                                    <td>{ release.date && new Date(release.date).getFullYear() }</td>
                                    <td>{ release.title }</td>
                                    <td>
                                        {
                                            release["label-info"] && release["label-info"].map((labelInfo) => {
                                                return (
                                                    labelInfo && labelInfo.label && labelInfo.label.name
                                                );
                                            })
                                        }
                                    </td>
                                    <td>{ release["track-count"] }</td>
                                </tr>
                            );
                        })
                    }
                </thead>
            </table>
        </React.Fragment>
    );
}

export default MusicBrainzRelease;