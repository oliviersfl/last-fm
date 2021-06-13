import React, { useState, useEffect } from 'react';
import MusicBrainzApi from '../../api/musicbrainz';

const MusicBrainzRelease = ({ artistId }) => {
    const [releases, setReleases] = useState(null)

    useEffect(() => {
        searchRelease(artistId);
    }, [artistId]);

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
                                        <i className="star outline icon orange pointer"></i>
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