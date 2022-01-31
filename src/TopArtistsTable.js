import React, { useEffect, useState } from "react";

function TopArtistsTable( { ta_ids, top_artists, spotify }) {
    const [ta_follows, setTaFollows] = useState([]);

    useEffect(() => {
        if (ta_ids.length > 0){
            spotify.isFollowingArtists(ta_ids)
            .then((isFollowing) => {
                setTaFollows(isFollowing);
            });
        }
        else {
            return
        }
    }, [ta_ids, spotify]);

    return (
        <table>
            <tbody>
                <tr>
                    <th>🎶</th>
                    <th>Artist Name</th>
                    <th>Followers</th>
                    <th>Popularity</th>
                    <th>Genres</th>
                    <th>id</th>
                    <th>Following?</th>
                </tr>
                {(top_artists?.items) && (top_artists.items.map((artist, index) => {
                    return (
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{artist.name}</td>
                            <td>{artist.followers.total}</td>
                            <td>{artist.popularity}</td>
                            <td>{artist.genres.join(", ")}</td>
                            <td>{artist.id}</td>
                            <td>{ta_follows[index] ? "yes" : "no"}</td>
                        </tr>
                    );
                }))}
            </tbody>
        </table>
    )
}

export default TopArtistsTable