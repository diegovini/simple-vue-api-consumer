import axios from 'axios';

const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;
const units = "metric"
let baseURL;
if (process.env.VUE_APP_OPENWEATHER_API_KEY) {
   baseURL = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/`
} else {
   baseURL = process.env.VUE_APP_API
}

//axios.defaults.headers

const repository = axios.create({
  baseURL,
});

if (process.env.VUE_APP_OPENWEATHER_API_KEY) {
  repository.interceptors.request.use(config => {
    config.params = {
      // add your default ones
      appid: apiKey,
      units: units,
      // lang:lang,
      // spread the request's params
      ...config.params,
    };
    return config;
  })
}

export default repository;








