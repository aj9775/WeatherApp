import React, { useCallback, useEffect, useState } from 'react'
import {getDayFunction,getIconName} from './helpers.js';
import morning from './../Images/morning.jpg';
import traffic from './../Images/traffic.jpg';
import afternoon from './../Images/afternoon.jpg';
import evening from './../Images/evening.jpg';
import dinner from './../Images/dinner.jpg';
import night from './../Images/night.jpg';
import star from './../Images/star.jpg';
import classes from './mainBody.module.css';
import c from '../Images/Icons/c.svg';
import h from '../Images/Icons/hc.svg';
import hc from '../Images/Icons/hc.svg';
import hr from '../Images/Icons/hr.svg';
import lc from '../Images/Icons/lc.svg';
import lr from '../Images/Icons/lr.svg';
import s from '../Images/Icons/s.svg';
import sl from '../Images/Icons/sl.svg';
import sn from '../Images/Icons/sn.svg';
import t from '../Images/Icons/t.svg';


const Searchurl='https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=';
const Dataurl='https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/';
const images=[morning,traffic,afternoon,evening,dinner,night,star];
const icons=[c,h,hc,hr,lc,lr,s,sl,sn,t];
let currentImage="";


const currentTime= new Date().getHours();
if(currentTime>=5 && currentTime<10){
    currentImage= images[0];
}
else if(currentTime>=10 && currentTime<12){
    currentImage= images[1];
}
else if(currentTime>=12 && currentTime<16){
    currentImage= images[2];
}
else if(currentTime>=16 && currentTime<19){
    currentImage= images[3];
}
else if(currentTime>=19 && currentTime<22){
    currentImage= images[4];
}
else if(currentTime>=22 && currentTime<24){
    currentImage= images[5];
}
else if(currentTime>=0 && currentTime<5){
    currentImage= images[0];
}

const MainBody=()=>{
    const [tempsearchText, setTempSearchText]= useState("");
    const [cityData, setCityData]= useState([]);
    //const [weatherData, setWeatherData]= useState({""});
    let weatherData="";
    let weatherIcon=c;
    const [cityList, setCityList]= useState("");
    const [loader, setLoader]= useState(false);
    const [weatherReport_max, setweatherReport_max]= useState("");
    const [weatherReport_min, setWeatherReport_min]= useState("");
    const [weatherReport_future, setWeatherReport_future]= useState("");
    let searchText="";
    const fetchData= async function(){ 
        try{await fetch(Searchurl+searchText).then(result=>result.json())
    .then(data=>{
        setCityData(data);
        generateMarkup();
        setLoader(false);
    });
    }
    catch(err){
        setLoader(false);}
}
    const fetchWeather= async function(id){ 
        await fetch(Dataurl+id).then(result=>result.json())
        .then(data=>{
            //setWeatherData(data);
            weatherData=data;
        })
        generateWeatherMarkup_min();
        generateWeatherMarkup_max();
        generateFutureWeatherMarkup_max();
        setLoader(false);
    }
    const generateMarkup=function(){
        if(cityData=="") return;
        console.log(cityData);
        setCityList(cityData.map((ct,i)=>{
            return(
                    <div className={classes.cityName} key={ct.woeid} onClick={cityClick.bind(this,ct.woeid)}>{ct.title}</div>
                )
        }));
    }
    const generateWeatherMarkup_min=function(){
        if(cityData=="") return;
        const time= weatherData.time.toString();
        const id= getIconName(weatherData.consolidated_weather[0].weather_state_abbr)
        weatherIcon=icons[id];
        setWeatherReport_min(
                    <div className={classes.weatherDisplay}>
                        <div className={classes.tempDiv}>
                            {weatherData.consolidated_weather[0].the_temp.toFixed(2)}
                        </div>
                        <div className={classes.LocationDiv}>
                            <div className={classes.cityNameDiv}>{weatherData.title}</div>
                            <div className={classes.currentTimeDiv}>{time.slice(0,10)}</div>
                        </div>
                        <div className={classes.weatherIcon}
                        title={weatherData.consolidated_weather[0].weather_state_name}
                        style={{backgroundImage:`URL("${weatherIcon}")`}}></div>
                    </div>
                );
        console.log(weatherData);
    }
    const generateWeatherMarkup_max=function(){
        if(cityData=="") return;
        const windSpd=weatherData.consolidated_weather[0].wind_speed.toFixed(2);
        const windDir=weatherData.consolidated_weather[0].wind_direction_compass;
        const wind= windSpd+' '+windDir;
        setweatherReport_max(
                <div className={classes.weatherDetailsDiv}>
                    <span>Weather Details</span>
                    <div className={classes.weatherList} >
                        <p>Humidity</p> <p>{weatherData.consolidated_weather[0].humidity}</p></div>
                    <div className={classes.weatherList} >
                        <p>Air Pressure</p> <p>{weatherData.consolidated_weather[0].air_pressure.toFixed(2)}</p></div>
                    <div className={classes.weatherList} >
                    <p>Visibility</p> <p>{weatherData.consolidated_weather[0].visibility.toFixed(2)}</p></div>
                    <div className={classes.weatherList} >
                        <p>Max Temperature</p> <p>{weatherData.consolidated_weather[0].max_temp.toFixed(2)}</p></div>
                    <div className={classes.weatherList} >
                    <p>Min Temperature</p> <p>{weatherData.consolidated_weather[0].min_temp.toFixed(2)}</p></div>
                    <div className={classes.weatherList} ><p>Wind</p> <p> {wind}</p></div>
                </div>
                );
    }
    const generateFutureWeatherMarkup_max=function(){
        if(cityData=="") return;
        const Id1=parseInt(getIconName(weatherData.consolidated_weather[1].weather_state_abbr));
        const weatherIcon1= icons[Id1];
        const tempDay1= getDayFunction(new Date(weatherData.consolidated_weather[1].applicable_date));
        const Id2=parseInt(getIconName(weatherData.consolidated_weather[2].weather_state_abbr));
        const weatherIcon2= icons[Id2];
        const tempDay2= getDayFunction(new Date(weatherData.consolidated_weather[2].applicable_date));
        const Id3=parseInt(getIconName(weatherData.consolidated_weather[3].weather_state_abbr));
        const weatherIcon3= icons[Id3];
        const tempDay3= getDayFunction(new Date(weatherData.consolidated_weather[3].applicable_date));
        const Id4=parseInt(getIconName(weatherData.consolidated_weather[4].weather_state_abbr));
        const weatherIcon4= icons[Id4];
        const tempDay4= getDayFunction(new Date(weatherData.consolidated_weather[4].applicable_date));
        const Id5=parseInt(getIconName(weatherData.consolidated_weather[5].weather_state_abbr));
        const weatherIcon5= icons[Id5];
        const tempDay5= getDayFunction(new Date(weatherData.consolidated_weather[5].applicable_date));
        setWeatherReport_future(
                <div className={classes.futureWeatherDetailsDiv}>
                    <span>Next Days</span>
                    <div className={classes.futureData}>
                        <div className={classes.futureDays}>
                            <div className={classes.DayText}>{tempDay1}</div>
                            <div className={classes.FutureIcons}
                                title={weatherData.consolidated_weather[1].weather_state_name}
                                style={{backgroundImage:`URL("${weatherIcon1}")`}}>
                            </div>
                            <div className={classes.futureTemp}>temp-{weatherData.consolidated_weather[1].the_temp.toFixed(2)}</div>
                        </div>
                        <div className={classes.futureDays}>
                            <div className={classes.DayText}>{tempDay2}</div>
                            <div className={classes.FutureIcons}
                                title={weatherData.consolidated_weather[2].weather_state_name}
                                style={{backgroundImage:`URL("${weatherIcon2}")`}}>
                            </div>
                            <div className={classes.futureTemp}>temp-{weatherData.consolidated_weather[2].the_temp.toFixed(2)}</div>
                        </div>
                        <div className={classes.futureDays}>
                            <div className={classes.DayText}>{tempDay3}</div>
                            <div className={classes.FutureIcons}
                                title={weatherData.consolidated_weather[3].weather_state_name}
                                style={{backgroundImage:`URL("${weatherIcon3}")`}}>
                            </div>
                            <div className={classes.futureTemp}>temp-{weatherData.consolidated_weather[3].the_temp.toFixed(2)}</div>
                        </div>
                        <div className={classes.futureDays}>
                            <div className={classes.DayText}>{tempDay4}</div>
                            <div className={classes.FutureIcons}
                                title={weatherData.consolidated_weather[4].weather_state_name}
                                style={{backgroundImage:`URL("${weatherIcon4}")`}}>
                            </div>
                            <div className={classes.futureTemp}>temp-{weatherData.consolidated_weather[4].the_temp.toFixed(2)}</div>
                        </div>
                        <div className={classes.futureDays}>
                            <div className={classes.DayText}>{tempDay5}</div>
                            <div className={classes.FutureIcons}
                                title={weatherData.consolidated_weather[5].weather_state_name}
                                style={{backgroundImage:`URL("${weatherIcon5}")`}}>
                            </div>
                            <div className={classes.futureTemp}>temp-{weatherData.consolidated_weather[5].the_temp.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                );
                setCityList('');
    }
    const cityClick=useCallback((id,e)=>{
        e.stopPropagation();
        setLoader(true);
        fetchWeather(id);
    });
    const SearchChangeHandler = useCallback((e) => {
        setTempSearchText(e.target.value);
      }, []);
    const searchClick=useCallback(()=>{
        searchText= tempsearchText;
        if(searchText=='') return;
        setLoader(true);
        fetchData();
    });
    return(
        <div className={classes.mainDiv}>
            <div className={classes.leftBody}>
                <div className={classes.imageDiv} style={{backgroundImage:`url("${currentImage}")`}}>    
                    <div className={classes.dataDiv}>
                        {weatherReport_min}
                    </div>  
                </div>
            </div>
            <div className={classes.rightBody}>
                <div className={classes.searchDiv}>
                    <input className={classes.inputDiv} placeholder="Search for City" value={tempsearchText}
                    onChange={SearchChangeHandler}></input>
                    <div className={classes.buttonDiv} onClick={searchClick}></div>
                </div>
                <div className={classes.LoaderDiv} style={{display:`${loader==true?'flex':'none'}`}}></div>
                <div className={classes.SearchDisplayDiv}
                style={{display:`${loader==true?'none':'flex'}`}}>
                        <scrollbar
                            speed={0.5}
                            className={classes.searchResContainer}
                            contentClassName={classes.searchItem}
                            horizontal={false}
                            verticalScrollbarStyle={{
                            backgroundColor: "black",
                            width: "30px",
                            right: "5%",
                            cursor:'pointer',
                            }}
                            vertical={true}
                            >
                        {cityList}
                    </scrollbar>
                </div>
                <div className={classes.detailsDiv}>
                    {weatherReport_max}
                </div>
                <div className={classes.futureDiv}>
                    {weatherReport_future}
                </div>
            </div>
        </div>
    )
}

export default MainBody;