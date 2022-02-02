import React, { useEffect, useState } from "react";

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function findModes(key_freq){
    let max = key_freq[0];
    let modes = [];
    let counter = 0;

    for (let freq of key_freq){ //finds the max
        if (freq > max){
            max = freq;
        }
    }

    for (let freq of key_freq){ //finds all the modes
        if (freq === max){
            modes.push(keys[counter]);
        }
        counter++;
    }
    return modes;
}

function findModesAgainWeh(m){
    let max = {count: 0, name: ''};
    m.forEach((count, name) => {
        if (count > max.count){
            max.count = count;
            max.name = name;
        }
    })
    return max;
}

function convert_ms(duration){
    var seconds = Math.floor((duration % (1000 * 60)) / (1000));
    var minutes = Math.floor((duration / (1000 * 60)));

    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

function TopTracksTable( { tt_ids, top_tracks, spotify }) {
    const [auds, setAuds] = useState([]);

    useEffect( () => {
        spotify.getAudioFeaturesForTracks(tt_ids)
        .then((tt_aud_feats) => {
            setAuds(tt_aud_feats);
        });
    }, [tt_ids, spotify]);

    let top_track_audio_features = auds?.audio_features;

    let valence_total = 0.0;
    let tempo_total = 0.0;
    let energy_total = 0.0;
    let danceability_total = 0.0;
    let acousticness_total = 0.0;
    let popularity_total = 0.0;
    let duration_total = 0.0;
    let loudness_total = 0.0;
    let minor_count = 0;
    let major_count = 0;
    let four_count = 0;
    let not_four_count = 0;
    let explicit_count = 0;
    let tt_key_freq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let tt_artists = new Map();
    let tt_albums = new Map();
    let earliest_tt_year = 2022;
    let latest_tt_year = 0;

    return (
        <table>
            <tbody>
                <tr>
                    <th>🎶</th>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Duration</th>
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
                    <th>track id</th>

                </tr>
                {(top_tracks?.items) && (top_track_audio_features) && (top_tracks.items.map((track, index) => {
                    valence_total += top_track_audio_features[index]?.valence;
                    tempo_total += top_track_audio_features[index]?.tempo;
                    energy_total += top_track_audio_features[index]?.energy;
                    danceability_total += top_track_audio_features[index]?.danceability;
                    acousticness_total += top_track_audio_features[index]?.acousticness;
                    popularity_total += track.popularity;
                    duration_total += track.duration_ms;
                    loudness_total += top_track_audio_features[index]?.loudness;
                    major_count += top_track_audio_features[index]?.mode;
                    (top_track_audio_features[index]?.time_signature === 4) ? four_count++ : not_four_count++;
                    tt_key_freq[top_track_audio_features[index]?.key]++; //handle if no key is detected?
                    if (tt_albums.get(track.album.name)){
                        tt_albums.set(track.album.name, (tt_albums.get(track.album.name)+1))
                    } else {
                        tt_albums.set(track.album.name, 1);
                    }
                    if (track.explicit) {explicit_count++}
                    if (top_track_audio_features[index]?.mode === 0){minor_count++}
                    if (track.album.release_date && parseInt(track.album.release_date.substring(0, 4)) > latest_tt_year) {latest_tt_year = track.album.release_date.substring(0,4)}
                    if (track.album.release_date && parseInt(track.album.release_date.substring(0, 4)) < earliest_tt_year) {earliest_tt_year = track.album.release_date.substring(0,4)}

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
                            <td>{convert_ms(track.duration_ms)}</td>
                            <td>{track.popularity}</td>
                            <td>{`${track.album.release_date}`}</td>
                            <td>{track.explicit ? "yes" : "no"}</td>
                            <td>{top_track_audio_features[index]?.acousticness}</td>
                            <td>{top_track_audio_features[index]?.danceability}</td>
                            <td>{top_track_audio_features[index]?.energy}</td>
                            <td>{top_track_audio_features[index]?.mode}</td>
                            <td>{keys[top_track_audio_features[index]?.key]}</td>
                            <td>{top_track_audio_features[index]?.loudness}</td>
                            <td>{top_track_audio_features[index]?.tempo}</td>
                            <td>{top_track_audio_features[index]?.time_signature}</td>
                            <td>{top_track_audio_features[index]?.valence}</td>
                            <td>{track.id}</td>
                        </tr>
                    );
                }))}
                    
                {(top_tracks?.items) && (top_track_audio_features) &&
                (<tr>
                    <td></td>
                    <td>Summary:</td>
                    <td>most freq artist</td>
                    <td>Most Freq. Album: {findModesAgainWeh(tt_albums).name}</td>
                    <td>{convert_ms(duration_total / top_tracks.items.length)}</td>
                    <td>{popularity_total / top_tracks.items.length}</td>
                    <td>{earliest_tt_year} - {latest_tt_year}</td>
                    <td>{explicit_count} explicit tracks</td>
                    <td>{acousticness_total / top_tracks.items.length}</td>
                    <td>{danceability_total / top_tracks.items.length}</td>
                    <td>{energy_total / top_tracks.items.length}</td>
                    <td>min: {minor_count} maj: {major_count}</td>
                    <td>{`most common key is ${findModes(tt_key_freq).join(", ")}`}</td>
                    <td>{loudness_total / top_tracks.items.length}</td>
                    <td>{tempo_total / top_tracks.items.length}</td>
                    <td>4/4: {four_count} not 4/4: {not_four_count}</td>
                    <td>{valence_total / top_tracks.items.length}</td>
                    <td></td>
                </tr>)}
            </tbody>
    </table>
    )
}

export default TopTracksTable