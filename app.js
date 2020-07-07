window.addEventListener('load',()=> {
    let long;
    let lat;
    let wid;
    let temperatureDescription= document.getElementsByClassName('temperature-description')[0];
    let temperatureDegree= document.getElementsByClassName('temperature-degree')[0];
    let locationCity= document.getElementsByClassName('location-city')[0];
    let locationCountry= document.getElementsByClassName('location-country')[0];
    let image= document.getElementsByClassName('image')[0];

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const search = `${proxy}https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;

            fetch(search)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    wid = data[0].woeid;
                    const proxy = 'https://cors-anywhere.herokuapp.com/';
                    const weather = `${proxy}https://www.metaweather.com/api/location/${wid}/`;

                    fetch(weather)
                        .then(response =>{
                            return response.json();
                        })
                        .then(data =>{
                            console.log(data);
                            const { applicable_date, humidity, max_temp, min_temp, the_temp, weather_state_name, weather_state_abbr} = data.consolidated_weather[0];
                            temperatureDegree.textContent= the_temp.toFixed(1);
                            temperatureDescription.textContent= weather_state_name;
                            locationCity.textContent = data.title;
                            locationCountry.textContent = data.parent.title;
                            const url= `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`;
                            image.src = url; 
                        });

                });
        });
    }
});

let input = document.getElementsByClassName('btn')[0];

input.addEventListener('keyup', ()=>{
    let query;
    let wid;
    let temperatureDescription= document.getElementsByClassName('temperature-description')[0];
    let temperatureDegree= document.getElementsByClassName('temperature-degree')[0];
    let locationCity= document.getElementsByClassName('location-city')[0];
    let locationCountry= document.getElementsByClassName('location-country')[0];
    let image= document.getElementsByClassName('image')[0];

    event.preventDefault();
    if (event.keyCode === 13) {
        query=input.value;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const search = `${proxy}https://www.metaweather.com/api/location/search/?query=${query}`;

        fetch(search)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    if (data.length<1){
                        document.getElementsByClassName('warning')[0].style.display = 'flex';
                        document.getElementsByClassName('location')[0].style.display = 'none';
                        document.getElementsByClassName('temperature')[0].style.display = 'none';
                    }
                    else {
                        document.getElementsByClassName('location')[0].style.display = 'flex';
                        document.getElementsByClassName('temperature')[0].style.display = 'flex';
                        document.getElementsByClassName('warning')[0].style.display = 'none';
                        wid = data[0].woeid;
                    const proxy = 'https://cors-anywhere.herokuapp.com/';
                    const weather = `${proxy}https://www.metaweather.com/api/location/${wid}/`;

                    fetch(weather)
                        .then(response =>{
                            return response.json();
                        })
                        .then(data =>{
                            console.log(data);
                            const { applicable_date, humidity, max_temp, min_temp, the_temp, weather_state_name, weather_state_abbr} = data.consolidated_weather[0];
                            temperatureDegree.textContent= the_temp.toFixed(1);
                            temperatureDescription.textContent= weather_state_name;
                            locationCity.textContent = data.title;
                            locationCountry.textContent = data.parent.title;
                            const url= `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`;
                            image.src = url; 
                        });
                    }
                })
    }
});