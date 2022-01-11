// console.log("Client-side JS loaded!!!");
// NB This is front end JS that runs in the browser
// 'fetch' is a brwser based API - it's not part of Javascript and not accessible in Nodejs.

// fetch('https://puzzle.mead.io/puzzle')  // asynchronous request
// .then((response)=>{
//   response.json().then((data)=>{
//     console.log(data);
//   })
// })


// fetch('http://localhost:3000/weather?address=chiredzi')
// .then((resp)=>{
//   resp.json().then((data)=>{
//     if (data.error){return console.log(data.error)}
//     console.log(data.location);
//     console.log(data.forecast);
//   })
// })

const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');
// messageOne.innerHTML="Hi Glenn!!!"
// messageOne.textContent="Hello Glenn!!!"
  weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();   // Stops browser refreshing with form submit
  console.log("Form submitted");
  const location = search.value;
  console.log("Imput value: "+location);
  messageTwo.textContent ="Loading data...";
  messageOne.textContent ="";
  // fetch('http://localhost:3000/weather?address='+location)  // won't work on heroku
  fetch('/weather?address='+location)  // this will work on heroku and localhos.
  .then((resp)=>{
    resp.json().then((data)=>{
      // if (data.error){return console.log(data.error)}
      if (data.error){
        messageTwo.textContent ="";
        return messageOne.textContent=data.error;
      }
      console.log("data.location : "+ data.location);
      console.log("data.forecast : "+ JSON.stringify(data.forecast));
      // messageTwo.textContent=`Location :${data.forecast.location}
      // \\nConditions :${data.forecast.conditions}. 
      // \\nCurrent temperature :${data.forecast.current_temp} 
      // \\nFeels like :${data.forecast.temp_feelslike}`
      messageOne.textContent ="";
      messageTwo.setAttribute('style', 'white-space: pre;'); // To get multiline paragraph using "".textContent" 
      messageTwo.textContent = `Location: ${data.forecast.location} \r\n`;
      messageTwo.textContent += `Conditions: ${data.forecast.conditions} \r\n`;
      messageTwo.textContent += `Current temperature: ${data.forecast.current_temp} \r\n`;
      messageTwo.textContent += `Feels like :${data.forecast.temp_feelslike}`;
    })
  })
});


// THE CODE BELOW IS TOTALLY THE WRONG!! WAY TO GO ABOUT THIS.
// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/chiredzi.json?access_token=pk.eyJ1IjoiZ2x5bmVzdGVyIiwiYSI6ImNreHMzeDhmcDM5dmEycXVidDU0MjBpZGMifQ.ch4Hhi2meO6VVcYlesiYNQ&limit=2')
// .then((resp)=>{
//   resp.json().then((data)=>{
//     // console.log('Data is =>',data);
//     console.log(data.features[0]);
//     const long=data.features[0].center[0];
//     const latt=data.features[0].center[1];
//     fetch('http://api.weatherstack.com/current?access_key=d093bc1b902623ed12c46eb39508c637&query='+latt+','+long+'&units=m')
//     .then((resp)=>{
//       resp.json().then((data)=>{
//         console.log(data.current,data.location);
//       })
//     })

//   })
// })

