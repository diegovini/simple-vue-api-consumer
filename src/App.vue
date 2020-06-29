<template>
	<div id="app">
		<Weather />
	</div>
</template>

<script>
import Weather from "./components/Weather.vue";

export default {
	name: "app",
	components: {
		Weather
	}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");
* {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
}
body {
	font-family: "Montserrat", sans-serif;
	background-color: lightcoral;
}
</style>

