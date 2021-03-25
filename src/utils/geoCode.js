const request=require('request')
const geoCode=( (adderss, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adderss)+'.json?access_token=pk.eyJ1IjoicHA4OTkxIiwiYSI6ImNrbWZyY3lidDAyOGEycHFsOHVwYmxkZDkifQ.-Hm9nvInS45sLYgoFeat7g&limit=1'

    request( {url:url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to location Services!',undefined)
        }else if (body.features.length===0){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
})

module.exports=geoCode 