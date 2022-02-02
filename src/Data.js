import React, { useEffect, useState } from "react";
import TopTracksTable from './TopTracksTable';
import TopArtistsTable from "./TopArtistsTable";

function Data({ spotify }) {
    const [user, setUser] = useState([]);
    const [top_artists, setTopArtists] = useState([]);
    const [top_tracks, setTopTracks] = useState([]);

    useEffect(() => {
        spotify.getMe()
            .then((u) => {
                setUser(u);
        });
        spotify.getMyTopArtists({limit: 50, time_range: "long_term"})
            .then((ta) => {
                setTopArtists(ta);
        });
        spotify.getMyTopTracks({limit: 50, time_range: "long_term"})
        .then((tt) => {
            setTopTracks(tt);
        });
    }, [spotify]);

    let tt_ids = [];
    for (let i = 0; i < top_tracks?.items?.length; i++){
        tt_ids.push(top_tracks?.items[i].id);
    }

    let ta_ids = [];
    for (let i = 0; i < top_artists?.items?.length; i++){
        ta_ids.push(top_artists?.items[i].id);
    }


    return (
        user ? (<div>
            {(user?.display_name) && (<p>Name: {user.display_name}</p>)}
            {(user?.followers?.total) && (<p>Followers: {user.followers.total}</p>)}
            
            <h2>{user?.display_name}'s Top Tracks Analysis</h2>
            <TopTracksTable tt_ids={tt_ids} top_tracks={top_tracks} spotify={spotify}/>
            <h2>{user?.display_name}'s Top Artists Analysis</h2>
            <TopArtistsTable ta_ids={ta_ids} top_artists={top_artists} spotify={spotify}/>
        </div>) : (<div>loading...</div>))
}

export default Data