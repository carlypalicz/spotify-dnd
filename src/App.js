import React, { useEffect, useState } from "react";
import './App.css';
import Login from './Login';
import Data from './Data';
import { getTokenFromURL } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState("");

  useEffect( () => {
    const hash = getTokenFromURL();
    window.location.hash = "";
    setToken(hash.access_token);
    spotify.setAccessToken(hash.access_token);
  }, []);

  return (
    <div className="App">
      <h1>Spotify API Data Sample</h1>

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
      <div>
        <p>copyright Carly Palicz 2022</p>
      </div>
    </div>
  );
}

export default App;
