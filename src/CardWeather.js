import React from 'react'

 const CardWeather = (props) => {
    return (
        <div>
            <div className = 'card'>
                <h1>{props.title}</h1>
                <div className = 'card-body'>
                    <h2>{props.country}/{props.city}</h2>
                    <div className = 'row'>
                        <div className = 'col-8'>
                            <div className = 'icon' style={{backgroundImage: `url(http://openweathermap.org/img/wn/${props.img}@2x.png)`}}></div>                           
                            <p>{props.temperature} {props.grade}</p>
                        </div> 
                        <div className = 'col-4'>
                            <p>{props.sky}</p>
                            <p><i className="fas fa-thermometer-three-quarters"></i>Min-Temp: {props.minTemp}</p>
                            <p><i className="fas fa-thermometer-three-quarters"></i>Max-Temp: {props.maxTemp}</p>
                            <p><i className="fas fa-wind"></i> Wind speed: {props.wind}</p>
                            <p><i className="fas fa-cloud"></i> clouds: {props.clouds} %</p>
                        </div>
                    </div>
                    <button onClick={props.funt}>{props.buton}</button>
                </div>
            </div>
        </div>
    );
}
 export default CardWeather;