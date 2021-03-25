const request=require('request')
const forecast=( (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=4279235a95a1126d6e0ea9d13cc40880&query='+latitude+','+longitude

    request( {url, json: true}, (error,{body})=>{
        if(error){
            callback('Unable to Connect to Web Service!',undefined)
        }else if(body.error){
            callback('Unable to find Location, Please enter the correct coordinate.',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out, Feels like '+body.current.feelslike+' degrees out.')
        }
    })
})

module.exports=forecast