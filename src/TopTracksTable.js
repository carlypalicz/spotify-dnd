import React, { useEffect, useState } from "react";

function TopTracksTable( { tt_ids, top_tracks, spotify }) {
    const [auds, setAuds] = useState([]);

    useEffect( () => {
        spotify.getAudioFeaturesForTracks(tt_ids)
        .then((tt_aud_feats) => {
            setAuds(tt_aud_feats);
        });
    }, [tt_ids, spotify]);

    let top_track_audio_features = auds?.audio_features;

    return (
        <table>
            <tbody>
                <tr>
                    <th>🎶</th>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>id</th>
                    <th>Duration (ms)</th>
                    <th>Popularity</th>
                    <th>Release Date</th>
                    <th>Explicit?</th>
                    <th>Acousticness</th>
                    <th>Danceability</th>
                    <th>Energy</th>
                    <th>Mode</th>
                    <th>Key</th>
                    <th>Loudness</th>
                    <th>Tempo</th>
                    <th>Time Sig</th>
                    <th>Valence</th>
                </tr>
                {(top_tracks?.items) && (top_track_audio_features) && (top_tracks.items.map((track, index) => {
                    return (
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{track.name}</td>
                            <td>{(track.artists) && (track.artists.map((artist) => {
                                return (
                                    artist.name
                                );
                            }))}</td>
                            <td>{track.album.name}</td>
                            <td>{track.id}</td>
                            <td>{track.duration_ms}</td>
                            <td>{track.popularity}</td>
                            <td>{track.album.release_date}</td>
                            <td>{track.explicit ? "yes" : "no"}</td>
                            <td>{top_track_audio_features[index]?.acousticness}</td>
                            <td>{top_track_audio_features[index]?.danceability}</td>
                            <td>{top_track_audio_features[index]?.energy}</td>
                            <td>{top_track_audio_features[index]?.mode}</td>
                            <td>{top_track_audio_features[index]?.key}</td>
                            <td>{top_track_audio_features[index]?.loudness}</td>
                            <td>{top_track_audio_features[index]?.tempo}</td>
                            <td>{top_track_audio_features[index]?.time_signature}</td>
                            <td>{top_track_audio_features[index]?.valence}</td>
                        </tr>
                    );
                }))}
            </tbody>
    </table>
    )
}

export default TopTracksTable