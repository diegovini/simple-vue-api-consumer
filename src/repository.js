import axios from 'axios';

const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;
const units = "metric"
//const lang=""
const baseURL = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/`

//axios.defaults.headers

const repository = axios.create({
  baseURL,
});

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
});

export default repository;








