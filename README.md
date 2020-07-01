# simple-vue-api-consumer
I've created a simple api consumer using Vuejs.
In order to use it, follow the steps belows:

### Building the docker image
To build the docker image run the following command:

`docker build --build-arg VUE_APP_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY -t dockerized-weatherapp .` 

Then, run the image in the container by running:

`docker run -it -p 8080:80 --name dockerized-weatherapp1 dockerized-weatherapp`

The name "dockerized-weatherapp" can be different, it's up to you how you want to call it.

This kind of build is for study-only purpose. Your api-key will be exposed in the url call, even thought it was not used explicitly in the Vue app.
In order to hide the api key, you will have to add a proxy, like an express api, to make the 3rd party calls for you.

### Using the app
Now that the app is built, just head to your http://localhost:8080 and type the city name that you want to check the weather.
To search, you can either press enter or click on the icon next to the input.

If no city is found, a error message will be shown.

I hope you will enjoy =)


