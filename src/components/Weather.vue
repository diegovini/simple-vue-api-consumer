<template>
		<main>
			<section class="input-section">
				<input
					type="text"
					class="search-box-input"
					placeholder="Type the city name..."
					v-model="cityName"
					@keypress.enter="getCityWeather()"
				/>
				<button type="search" class="search-button" @click="getCityWeather"><i class="fa fa-search"></i></button>
				
			</section>
			  <div class="spinner" v-if="isLoading"><circle-spinner></circle-spinner></div>
				<section class="weather-section" v-else-if="hasWeather">
					<div class="city">{{weather.name}}, {{weather.sys.country}}</div>
					<div class="date">{{formattedDate}}</div>
					<div class="temperature">{{roundedTemperature}}°C</div>
					<div class="description">{{weather.weather[0].description}}</div>
			</section>
		</main>
</template>

<script>
import { CircleSpinner } from 'vue-spinners'
export default {
	name: "Weather",
	components:{
			"circle-spinner":CircleSpinner
	},
	data: function() {
		return {
			weather: {},
			cityName: "",
			isLoading:false,
		};
	},
	methods: {
		async getCityWeather() {
			this.isLoading = true;
			
			try {
				const response = await this.$http.get("weather", {
					params: { q: this.cityName }
				});
				this.weather = response.data;
				this.cityName = "";
			} catch (err) {
				console.log(err);
			}finally{
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
		formattedDate(){
			const options = {weekday:"short", year:"numeric", month:"short", day:"numeric"};
			let formattedDate = new Date(this.weather.dt*1000);
			return formattedDate.toLocaleString(undefined,options);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

main {
	display:grid;
	grid-template-areas: "input"
												"data";
	grid-template-rows: 200px 1fr;
	grid-template-columns: 1fr;
	
	

}
.input-section {
	grid-area:input;
	display:flex;
	align-items: center;
	justify-content: center;
	margin:0 10px;
	
}

.input-section .search-box-input {
	border:0px;
	margin-left:10px;
	font-size: 1.7em;
	padding: .5em;
	color: #39444d;
	outline: none;
	appearance: none;
	border-radius: 5px 25px 5px 25px;
	background-color: rgba(178, 233, 243, 0.3);
	box-shadow: 3px 5px rgba(0, 0, 0, 0.1);
	transition: 0.4s;
}

.input-section .search-box-input:focus {
	border-radius: 15px 5px 15px 5px;
	background-color: rgba(178, 233, 243, 0.5);
}

.input-section .search-button{
	position:relative;
	right:40px;
	top:0;
	border-radius:50%;
	background-color:transparent;
	border:0;
	cursor:pointer;
	font-size:1.9em;
	outline:none;
	
}

.weather-section {
	grid-area:data;
	display:block;
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
	margin-bottom:10px;
}

 .weather-section .temperature {
	display: inline-block;
	font-size: 7em;
	font-weight: 800;
	padding: 20px;
	color: #fff;
	background-color: rgba(255, 255, 255, 0.2);
	text-shadow: 1px 1px rgba(255, 255, 255, 0.9);
	box-shadow: 3px 5px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	margin: 0 0 10px;
}

 .weather-section .description {
	text-transform:capitalize;
	font-size: 3em;
	color: #fff;
	font-style: italic;
	font-weight: 600;
	text-shadow: 2px 4px rgba(0, 0, 0, 0.3);
}

.spinner{
	z-index:2;
}
</style>
