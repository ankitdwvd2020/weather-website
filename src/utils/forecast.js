const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/2768238339180768b33647f35f35693b/'+latitude+',' +longitude
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to connect to the weather services','undefined')
        }else if(body.error){
            callback('Unable to find locations.Try another locations','undefined')

        }else{
            callback('undefined',body.daily.data[0].summary + 'There is a ' +body.daily.data[0].precipProbability+ ' % chance of rain ' +'The low today is ' +body.daily.data[0].temperatureLow+' with a high of '+body.daily.data[0].temperatureHigh) 
        }
    })

}

module.exports = forecast