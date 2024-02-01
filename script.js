const search = document.querySelector('#search')
const btn = document.querySelector('.si')
const cont = document.querySelector('.container')
const err = document.querySelector('#err')
const weather_icon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const city_name = document.querySelector('.city')
const humidity = document.querySelector('.humidity')
const wind_speed = document.querySelector('.speed')
const loading = document.querySelector('#lddiv')


navigator.geolocation.getCurrentPosition(showPosition,showerror);
async function showPosition(position){
    cont.style.display='none'
    loading.classList.remove('dp')
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
  
    console.log("Latitude: " + lat);
    console.log("Longitude: " + lon);
   const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bb2df190fb721e857ed0ddf9882c7e72`)
   if(!resp.ok)
   {
       cont.classList.add('dp')
       err.classList.remove('dp')
       console.log(resp.ok)
    throw new Error('Latitude Longitude galat hai...')
   }
   try{
    const data = await resp.json()
    loading.classList.add('dp')
    cont.style.display='flex'  
    temperature.innerHTML = Math.round(data.main.temp-273.15,2)+"°C"
    city_name.innerHTML = data.name+", "+data.sys.country
    humidity.innerHTML = data.main.humidity+"%"
    wind_speed.innerHTML = Math.round((data.wind.speed*18)/5,2)+" Km/h"
    const wdata = data.weather[0].main
    if(wdata == 'Clear')
    {
        weather_icon.src='./images/clear.png'
    }   
    else if(wdata == 'Clouds')
    {
        weather_icon.src='./images/clouds.png'
    } 
    else if(wdata == 'Mist')
    {
        weather_icon.src='./images/mist.png'
    }
    else if(wdata == 'Rain')
    {
        weather_icon.src='./images/rain.png'
    }
    else if(wdata == 'Snow')
    {
        weather_icon.src='./images/snow.png'
    }
   }
   catch(err)
   {
    console.log(err)

   }
}
function showerror(error)
{
    switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
      }    
}












async function searchfn()
{   
    const city  = search.value
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb2df190fb721e857ed0ddf9882c7e72`)
    if(!resp.ok)
    {
        cont.style.display = 'none'
        err.classList.remove('dp')
        console.log(resp.ok)
     throw new Error('Ulta Seedha To input de raha hai yarrr..')
    }
    try{
    const data = await resp.json()
    console.log(data)
    temperature.innerHTML = Math.round(data.main.temp-273.15,2)+"°C"
    city_name.innerHTML = data.name+", "+data.sys.country
    humidity.innerHTML = data.main.humidity+"%"
    wind_speed.innerHTML = Math.round((data.wind.speed*18)/5,2)+" Km/h"
    const wdata = data.weather[0].main
    if(wdata == 'Clear')
    {
        weather_icon.src='./images/clear.png'
    }   
    else if(wdata == 'Clouds')
    {
        weather_icon.src='./images/clouds.png'
    } 
    else if(wdata == 'Mist')
    {
        weather_icon.src='./images/mist.png'
    }
    else if(wdata == 'Rain')
    {
        weather_icon.src='./images/rain.png'
    }
    else if(wdata == 'Snow')
    {
        weather_icon.src='./images/snow.png'
    }
    }
    catch(err)
    {
    console.error(err)
    
    }  
}

const search_box = document.querySelector('.search-box')

function change()
{
    btn.style.display='block'
}


search_box.addEventListener('click',change)


btn.addEventListener('click',searchfn)
search.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter')
    {
        e.preventDefault()
        searchfn()
    }
})

