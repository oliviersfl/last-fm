import axios from 'axios';

const KEY = "d006d7c77a09a096bec504716c854a59";

export default axios.create({
    baseURL: "https://ws.audioscrobbler.com/2.0",
    params: {
        method: "artist.search",
        format: "json",
        api_key: KEY,
        limit: 10
    }
});