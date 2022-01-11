const path=require('path');
const express=require('express');
const hbs=require('hbs'); // needed for partials.
const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');
// console.log("__dirname =>",__dirname);
// console.log("__filename =>",__filename)
// console.log("path =>",path.join(__dirname,'../public'));

const app=express();
// Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');
// Setup handlbars and views location
app.set('view engine', 'hbs'); // which templating engine did we install
app.set('views',viewsPath); //custom dir for hbs views
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
// app.get('',(req,res)=>{
//   res.send('<h1>Hello Express</h1>');
// })



// app.use(express.static(path.join(__dirname,'../public/about.html')));
// app.get('/help',(req,res)=>{
//   // res.send("Help page");
//   res.send([{
//     name:'GB',
//     sex: 'yes',
//   },{
//     name:'AB',
//     sex: 'no thanks',
//   }])
// })
// app.use(express.static(path.join(__dirname,'../public/help.html')));
// app.get('/about',(req,res)=>{
//   res.send('<h2>About Page</h2>');
// })

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather App',
    name:"Glenn B",
  });
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Page',
    name: "gcb",
  });
})

app.get('/help',(req,res)=>{
  res.render('help',{       // hbs templates need to be in 'views' folder by default
    msg:"Here is some helpful text!!!",
    title:'Help Page',
    name: "Glenn Bee",
  })
})

app.get('/weather',(req,res)=>{
  // res.send('Weather page');
  const address = req.query.address;
  if (!address){
    return res.send({
      error: 'You must provide an address',
    })
  }
  // Below code copied from weather-app
  geocode(address,(error,{lattitude,longitude,location}={})=>{
    if (error){
      return res.send({
        error: "Error: "+error,
      })
    }
    forecast(lattitude, longitude, (error, forecastData/*{current_temp, temp_feelslike}*/) => {
      if (error){
        return res.send({          // Must return or 2nd res.send will try to send and cause an error.
          error: "Error: "+error,
        })
      }
      return res.send({
        location,
        forecast:forecastData,
        address: req.query.address,
        // location: 'dataLocation', location,
        // temp: `It is currently ${current_temp} degrees outside.`,
        // feelsLike: `It feels like ${temp_feelslike} degrees.`,
      })
    })
  });
  // res.send(output);
  // res.send({
  //   location: "Philadelphia",
  //   forecast:"miserable",
  //   address: req.query.address,
  // });
})

app.get('/products',(req,res)=>{
  //console.log(req.query.search); //http://localhost:3000/products?search=games&rating=5 { search: 'games', rating: '5' }
  if (!req.query.search){
    return res.send({     // Must return or 2nd res.send will try to send and cause an error.
      error:"You must provide a search term",
    })
  }
  res.send({
    products:[],
  });
})

//app.com
//app.com/help
//app.com/about

// specific 'help' not found route
app.get('/help/*',(req,res)=>{
  // res.send("Help article not found");
  res.render('error404',{
    errorMsg:"Help article not found",
    title:'404 - Not Found',
    name: "Glenn Bee",
  })
})
// Must be last app.get for error handling
app.get('*',(req,res)=>{
  // res.send("My 404 page");
  res.render('error404',{
    errorMsg: "Page not found",
    title:'404 - Not Found',
    name: "Glenn Bee",
  })
})

app.listen(3000,()=>{
  console.log('Server running on port 3000');
});

// localhost:3000 <--websbrowser address