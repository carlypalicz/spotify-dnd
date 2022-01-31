export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectURI = "http://localhost:3000/";
const client_id = "32171b27f62748dbba5232d328419944";

const scopes = [
    "user-top-read",
    "user-read-recently-played",
    "user-follow-read",
];

export const loginURL = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

export const getTokenFromURL = () => {
    return window.location.hash.substring(1).split('&').reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    }, {});
};