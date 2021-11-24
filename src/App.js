import React, { useEffect } from "react";
import './App.css';
import Login from './Login';
import Data from './Data';
import { getTokenFromURL } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
const spotify = new SpotifyWebApi();

function App() {
  const [{ user, top_artists, top_tracks, token }, dispatch] = useDataLayerValue();


  useEffect( () => {
    const hash = getTokenFromURL();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token){

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {

        dispatch({
          type: 'SET_USER',
          user: user,
        });
      }); 
      spotify.getMyTopArtists({limit: 50, time_range: "long_term"}).then((top_artists) => {
        dispatch({
          type: 'SET_TOP_ARTISTS',
          top_artists: top_artists,
        })
      });
      spotify.getMyTopTracks({limit: 50, time_range: "long_term"}).then((top_tracks) => {
        dispatch({
          type: 'SET_TOP_TRACKS',
          top_tracks: top_tracks,
        })
      });
    }

  }, [token, dispatch]);

  console.log(user);
  console.log(top_tracks);

  return (
    <div className="App">
      <h1>spotify timeeee</h1>

    {
      token ? (
        <div>
          <Data spotify={spotify}/>
        </div>
      ) :
     (
        <Login/>
      )
    }


    </div>
  );
}

export default App;
