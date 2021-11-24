import React from 'react';
import { useDataLayerValue } from './DataLayer';

function Data({ spotify }) {
    const [{ user, top_artists, top_tracks }, dispatch] = useDataLayerValue();
    return (
        <div>
            <p>yea babey ! data time</p>
            {(user?.display_name) && (<p>Name: {user.display_name}</p>)}
            {(user?.followers?.total) && (<p>Followers: {user.followers.total}</p>)}

            <h2>top artists</h2>
            {(top_artists?.items) && (top_artists.items.map((artist) => {
                return (<p key={artist.name}>{artist.name}</p>);
            }))}

            <h2>top tracks</h2>
            {(top_tracks?.items) && (top_tracks.items.map((track) => {
                return (<p key={track.name}>{track.name}</p>);
            }))}
        </div>
    )
}

export default Data