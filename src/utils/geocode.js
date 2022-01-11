const request=require('request');
// url with error
// const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/12wottywottwott.json?access_token=pk.eyJ1IjoiZ2x5bmVzdGVyIiwiYSI6ImNreHMzeDhmcDM5dmEycXVidDU0MjBpZGMifQ.ch4Hhi2meO6VVcYlesiYNQ&limit=2"
// Good url
// const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ2x5bmVzdGVyIiwiYSI6ImNreHMzeDhmcDM5dmEycXVidDU0MjBpZGMifQ.ch4Hhi2meO6VVcYlesiYNQ&limit=2"


// encodeURIComponent for special chars, e.g. '?' becomes '%3F'
const geocode=(address,callback)=>{
  const geocodeUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiZ2x5bmVzdGVyIiwiYSI6ImNreHMzeDhmcDM5dmEycXVidDU0MjBpZGMifQ.ch4Hhi2meO6VVcYlesiYNQ&limit=2";
  // debugger;
  // request({url:geocodeUrl,json:true},(error,response)=>{
  request({url:geocodeUrl,json:true},(error,{body}={})=>{
    // let resp;
    if (error){
      // resp="Unable to connect to geocoding service";
      callback("Unable to connect to geocoding service",undefined);
    } else if (body.message){
      callback(body.message,undefined); // API returns {"message":"Not Found"} if the URL is incorrect.
    } else if (body.features.length===0) {
      // resp="Search string did not yield any results";
      callback("Search string did not yield any results",undefined)
    } else {
      const [long,latt]=body.features[0].center;
      // resp=`Lattitude: ${latt}, Longitude: ${long}`;
      callback(undefined,{location: body.features[0].place_name, lattitude: latt, longitude: long})
    }
    // debugger;
    // callback(resp);
  })
}

// module.exports={
//   geocode:geocode,
// }

module.exports = geocode;