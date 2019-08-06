import {
  configure,
  action,
  observable,
  runInAction,
  flow,
  decorate
} from "mobx";

configure({ enforceActions: "observed" });

class WeatherStore {
  weatherData = {};

  loadWeather = city => {
    fetch(`http://jsonplaceholder.typicode.com/comments/${city}`)
      .then(response => response.json())
      .then(data => this.setWeather(data));
  };

  setWeather = data => {
    this.weatherData = data;
  };
  loadWeatherInline = city => {
    fetch(`http://jsonplaceholder.typicode.com/comments/${city}`)
      .then(response => response.json())
      .then(data => {
        runInAction(() => (this.weatherData = data));
      });
  };
  loadWeatherAsync = async city => {
    const response = await fetch(
      `http://jsonplaceholder.typicode.com/comments/${city}`
    );
    const data = await response.json();
    runInAction(() => {
      this.weatherData = data;
    });
  };
  loadWeatherGenerator = flow(function*(city) {
    const response = yield fetch(
      `http://jsonplaceholder.typicode.com/comments/${city}`
    );
    const data = yield response.json();
    runInAction(() => {
      this.weatherData = data;
    });
  });
}
decorate(WeatherStore, {
  weatherData: observable,
  setWeather: action
});

const store = new WeatherStore();

export default store;
