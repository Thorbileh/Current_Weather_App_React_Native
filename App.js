import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const img = require('./assets/back.png')

import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';
const API_KEY = 'f6c87e7eb14a87cb0b926f237d832a50'

export default function App() {

  const [data, setData] = useState({})

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition((success) => {

      let { latitude, longitude } = success.coords;
      fetchDataFromApi(latitude, longitude);

    }, (err) => {
      if (err) {
        fetchDataFromApi("40.7128", "-74.0060")
      }
    })

  }, [])
  const fetchDataFromApi = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
      console.log(data)
      setData(data)
      /* showweatherData(data) */
    })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon} />
        <WeatherScroll weatherData={data.daily} />

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "center"
  }

});
