const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
console.log(partialPath)


//set handlebar
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory serve
app.use(express.static(publicPathDirectory))

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Ankit'
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ankit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Ankit',
        problem:'This is some helpful text'
    })
})

app.get('/weather',(req,res)=>{
    address = req.query.address
    if(!address){
        res.send({
            error:'You must provide the address'
        })
    }else{
        geocode(address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send(error)
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                res.send({
                    location:location,
                    forecastData:forecastData,
                    address:address
                })
            })
        })
       
    }
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Ankit',
        errorMessage:'Help article not found'

    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Ankit',
        errorMessage:'Page not found'

    })
})

app.listen(port,()=>{
    console.log('Server is up on' +port)
})