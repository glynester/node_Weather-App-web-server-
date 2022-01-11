const request=require('request');

// url with error
// const url = "http://api.weatherstack.com/current?access_key=d093bc1b902623ed12c46eb39508c637&query=&units=m";
// Good url
// const url = "http://api.weatherstack.com/current?access_key=d093bc1b902623ed12c46eb39508c637&query=37.8627,-122.4233&units=m";

const forecast=(latt,long,callback)=>{
  const url="http://api.weatherstack.com/current?access_key=d093bc1b902623ed12c46eb39508c637&query="+latt+","+long+"&units=m";
  // request({url:url,json:true},(error,response)=>{
  request({url,json:true},(error,{body}={})=>{
    if (error){
      callback("Unable to connect to weather service",undefined);
    } else if (body.error){
        callback(body.error.type + ": " + body.error.info);
        // callback("Unable to find location",undefined);     // code 615
    } else {
      callback(undefined ,{location:body.location.name+", "+body.location.country,
        conditions:body.current.weather_descriptions[0], current_temp:body.current.temperature, 
        temp_feelslike:body.current.feelslike});
      // callback(undefined,`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees outside. 
      // It feels like ${response.body.current.feelslike} degrees.`);
    }

  })
}


module.exports=forecast;