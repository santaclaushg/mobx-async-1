import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import JSONPretty from "react-json-pretty";

class App extends Component {
  componentDidMount() {
    this.props.WeatherStore.loadWeatherGenerator("");
  }
  render() {
    const { WeatherStore } = this.props;
    const { weatherData } = WeatherStore;
    console.log(weatherData);
    const weatherDataArray = [];
    for (let key in weatherData) {
      console.log(weatherData[key]);
      weatherDataArray.push({ key, data: weatherData[key] });
    }
    console.log(weatherDataArray);
    return (
      <div className="App">
        {/* <JSONPretty json={this.props.WeatherStore.weatherData} /> */}
        {weatherDataArray.map(weatherData => (
          <ul key={weatherData.key}>
            <li>{weatherData.data.body}</li>
            <li>{weatherData.data.email}</li>
            <li>{weatherData.data.id}</li>
            <li>{weatherData.data.name}</li>
            <li>{weatherData.data.postId}</li>
          </ul>
        ))}
      </div>
    );
  }
}

export default inject("WeatherStore")(observer(App));
