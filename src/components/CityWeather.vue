<template>
	<div id="page-wrapper">
		<main>
			<div class="search-box">
				<input type="text" class="search-input" placeholder="Search city..." />
			</div>
			<div class="weather-wrapper">
				<div class="city-box">
					<div class="city">Brasília, BR</div>
					<div class="date">02/01/2020</div>
				</div>
				<div class="weather-box">
					<div class="temperature">20°c</div>
					<div class="description">Sol</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: "CityWeather",

	data: function() {
		return {
			cityWeather: { main: {} },
			cityName: ""
		};
	},

	methods: {
		async getCityWeather() {
			try {
				const response = await this.$http.get("weather", {
					params: { q: this.cityName }
				});
				this.cityWeather = response.data;
			} catch (err) {
				console.log(err);
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#page-wrapper {
	
	
	
	transition: .4s;
}

main {
	min-height: 100vh;
	padding: 25px;

	background-image: linear-gradient(
		to bottom,
		rgb(0, 0, 0, 0.25),
		rgba(0, 0, 0, 0.9)
	);
}
.search-box {
	width: 100%;
	margin-bottom: 30px;
}
.search-box .search-input {
	width: 100%;
	display: block;
	padding: 15px;
	border: 0px;

	font-size: 20px;
	color: #313131;
	outline: none;
	appearance: none;

	box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 50px 25px 50px 25px;
	transition: 0.2s;
}

.search-box .search-input:focus {
	border-radius: 25px 50px 25px 50px;
	background-color: rgba(255, 255, 255, 0.75);
}

.city-box .city {
	color: #fff;
	font-size: 35px;
	font-weight: 500;
	text-align: center;
	text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.city-box .date {
	text-align: center;
	color: #fff;
	font-weight: 300;
	font-size: 20px;
	font-style: italic;
}

.weather-box {
	text-align: center;
}

.weather-box .temperature {
	display: inline-block;
	padding: 10px 25px;

	font-size: 102px;
	font-weight: 900;
	color: #fff;

	text-shadow: 3px 5px rgba(0, 0, 0, 0.25);
	box-shadow: 3px 5px rgba(0, 0, 0, 0.25);

	background-color: rgba(255, 255, 255, 0.25);

	border-radius: 15px;
	margin: 30px 0px;
}
.weather-box .description {
	font-size: 50px;
	font-weight: 600;
	font-style: italic;
	color: rgba(255, 255, 255, 0.75);
	text-shadow: 3px 5px rgba(0, 0, 0, 0.25);
}
</style>
