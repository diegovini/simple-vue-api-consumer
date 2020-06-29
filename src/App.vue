<template>
  <div id="app">
    <!-- <CityWeather/> -->
    <Weather/>
  </div>
</template>

<script>
import CityWeather from './components/CityWeather.vue'
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  components: {
    CityWeather,
    Weather
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
*{
  margin:0px;
  padding:0px;
  box-sizing: border-box;
}
body{
  font-family: 'Montserrat', sans-serif;
  background-color:lightcoral;
}

</style>

