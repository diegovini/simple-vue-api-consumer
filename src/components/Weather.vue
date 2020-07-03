<template>
	<main>
		<h1>City Weather</h1>

		<section class="input-section">
			<input
				v-focus
				type="text"
				class="search-box-input"
				placeholder="Type the city name..."
				v-model="cityName"
				@keypress.enter="getCityWeather()"
			/>
			<button type="search" class="search-button" @click="getCityWeather">
				<i class="fa fa-search"></i>
			</button>
		</section>
		<transition name="fade">
			<section class="weather-section" v-if="hasWeather">
				<div class="city">{{weather.name}}, {{weather.sys.country}}</div>
				<div class="date">{{formattedDate}}</div>
				<div class="temperature">{{roundedTemperature}}°C</div>
				<div class="description">{{weather.weather[0].description}}</div>
			</section>
			<section class="weather-section" v-else-if="cityNotFound">
				<div class="city">City not found</div>
			</section>
		</transition>
	</main>
</template>

<script>
export default {
	name: "Weather",
	directives: {
		focus: {
			inserted: function(el) {
				el.focus();
			}
		}
	},

	data: function() {
		return {
			weather: {},
			cityName: "",
			cityNotFound: false
		};
	},
	methods: {
		async getCityWeather() {
			this.cityNotFound = false;
			this.weather = {};
			if (this.cityName == "") {
				return;
			}

			try {
				if (process.env.VUE_APP_OPENWEATHER_API_KEY) {
					const response = await this.$http.get("weather", {
						params: { q: this.cityName }
					});
					this.weather = response.data;
				} else {
					const response = await this.$http.get(this.cityName);

					this.weather = response.data;

					this.cityName = "";
				}
			} catch (err) {
				this.isLoading = false;
				this.cityNotFound = true;
			} finally {
				this.isLoading = false;
			}
		}
	},
	computed: {
		roundedTemperature: function() {
			return Math.round(this.weather.main.temp);
		},
		hasWeather: function() {
			return Object.keys(this.weather).length > 1 ? true : false;
		},
		formattedDate() {
			const options = {
				weekday: "short",
				year: "numeric",
				month: "short",
				day: "numeric"
			};
			let formattedDate = new Date(this.weather.dt * 1000);
			return formattedDate.toLocaleString(undefined, options);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

main {
	display: grid;
	grid-template-areas:
		"title"
		"input"
		"weather";

	grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
	grid-gap: 10px;
}

h1 {
	grid-area: title;
	text-align: center;
	margin: 1em 0.5em;
	font-size: 3em;
	color: #fff;
}

.input-section {
	grid-area: input;
	text-align: center;
}

.input-section .search-box-input {
	border: 0px;
	box-sizing: border-box;
	font-size: 1.7em;
	padding: 0.5em;
	color: #39444d;
	outline: none;
	appearance: none;
	border-radius: 5px 25px 5px 25px;
	background-color: rgba(178, 233, 243, 0.3);
	box-shadow: 3px 5px rgba(0, 0, 0, 0.1);
	transition: 0.4s;
}

@media screen and (max-width: 500px) {
	.input-section .search-box-input {
		font-size: 1.2em;
	}
}

.input-section .search-box-input:focus {
	border-radius: 15px 5px 15px 5px;
	background-color: rgba(178, 233, 243, 0.5);
}

.input-section .search-button {
	margin-left: 0.2em;
	margin-top: 0.2em;
	border-radius: 50%;
	background-color: transparent;
	border: 0;
	cursor: pointer;
	font-size: 1.9em;
	outline: none;
}
i {
	outline: none;
}

.weather-section {
	grid-area: weather;
	margin: 1em 0;
	text-align: center;
	transition: 2s;
}
.weather-section .city {
	font-size: 2em;
	color: #fff;
	text-shadow: 2px 2px rgba(0, 0, 0, 0.25);
	font-weight: 600;
}
.weather-section .date {
	font-size: 2em;
	color: #fff;
	text-shadow: 2px 2px rgba(0, 0, 0, 0.4);
	font-weight: 300;
	font-style: italic;
	margin-bottom: 10px;
}

.weather-section .temperature {
	display: inline-block;
	font-size: 7em;
	font-weight: 800;
	padding: 0.1em;
	color: #fff;
	background-color: rgba(255, 255, 255, 0.2);
	text-shadow: 1px 1px rgba(255, 255, 255, 0.9);
	box-shadow: 3px 5px rgba(0, 0, 0, 0.3);
	border-radius: 0.1em;
	margin: 0 0 10px;
}

.weather-section .description {
	text-transform: capitalize;
	font-size: 3em;
	color: #fff;
	font-style: italic;
	font-weight: 600;
	text-shadow: 2px 4px rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	transition: 0.5s;
}
</style>
