import React,{useEffect, useState } from 'react'
import { CardWeather,CardInput } from './CardWeather';

let range = true;

function PrintData(data, value){
      value = data;
      return value;
}
 
function getConvert(value){
  let grade = '';
  if(range){
    grade = (value*9/5)+32;
    range = false;
    return grade.toFixed(2);
  }else{
    grade = (value-32)*5/9;
    range = true;
    return grade.toFixed(2);
  }
}

const Data = () => {
  let countryValue = '';
  let cityValue = '';
  let temp = '';
  let minTemp = '';
  let maxTemp = '';
  let speed = '';
  let clouds = '';
  let lat = '';
  let long = '';
  let sky = '';
  let icon = '';

  const  getLocation = () => {
    if (navigator.geolocation){
     navigator.geolocation.getCurrentPosition(getPosition)
        
    }else{
      alert('Not Supported')
    }
  }
  const getPosition =  async (position) =>{
    lat = position.coords.latitude;
    long = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e267d37a3cd129d493e9cdb21ab453cc&units=metric`
    const resp = await fetch(url);
    const info  = await resp.json();
      cityValue = info.name;
      countryValue = info.sys.country;
      temp = info.main.temp;
      minTemp = info.main.temp_min;
      maxTemp = info.main.temp_max;
      speed = info.wind.speed;
      clouds = info.clouds.all;
      sky = info.weather[0].description;
      icon = info.weather[0].icon;
      HandelrData();
    console.log(info)
  }

  
useEffect(() => {
  getLocation()
},[])

  const [isCountry, setCountry] = useState('????');
  const [isCity, setCity] = useState('?????');
  const [isTemp, setTemp] = useState('***');
  const [isMinTemp, setMinTemp] = useState('***');
  const [isMaxTemp, setMaxTemp] = useState('***');
  const [isWindSpeed, setIsWindSpeed] = useState('***');
  const [isClouds, setIsClouds] = useState('***');
  const [isSky, setSky] = useState('***');
  const [isImg, setImg] = useState(null);

    const getData = async (e) => {
      e.preventDefault();
      const {country, city} = e.target.elements
      countryValue = country.value;
      cityValue = city.value;

      const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${countryValue},${cityValue}&appid=e267d37a3cd129d493e9cdb21ab453cc&units=metric`
      const response = await fetch(API_URL);
      const info = await response.json();
      cityValue = info.name;
      countryValue = info.sys.country;
      temp = info.main.temp;
      minTemp = info.main.temp_min;
      maxTemp = info.main.temp_max;
      speed = info.wind.speed;
      clouds = info.clouds.all;
      sky = info.weather[0].description;
      icon = info.weather[0].icon;
      HandelrData();
      range = true;
    }

      const HandelrData = () => {
        setCountry(PrintData(countryValue, isCountry));
        setCity(PrintData(cityValue, isCity));
        setTemp(PrintData(temp, isTemp));
        setMinTemp(PrintData(minTemp, isMinTemp));
        setMaxTemp(PrintData(maxTemp, isMaxTemp));
        setIsWindSpeed(PrintData(speed, isWindSpeed));
        setIsClouds(PrintData(clouds, isClouds));
        setSky(PrintData(sky, isSky));
        setImg(PrintData(icon, isImg));
      }
      
      const HandlerConvert = () =>{
          setTemp(getConvert(isTemp));
      }

  return (
    <div className = 'container'>
        <CardInput country ='Country' city='City' getData = {getData} /> 
        <CardWeather sky={isSky} title='Weather' country = {isCountry} city= {isCity} temperature = {isTemp} grade={range ? 'C' : 'F'} minTemp={isMinTemp} maxTemp={isMaxTemp} wind = {isWindSpeed} clouds = {isClouds} img={isImg} buton ='Convert' funt={HandlerConvert}/> 
    </div>
  );
}

export default Data;