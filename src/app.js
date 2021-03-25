const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()
const port=process.env.PORT || 3000

//Define Path For Express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const ViewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup Handle Bars engin and views location
app.set('view engine','hbs')
app.set('views',ViewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Prakhar Pandey'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Prakhar Pandey'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Prakhar Pandey',
    })

})

app.get('/Weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an Address!'
        })
    }
    geoCode(req.query.address,(error,{ latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error: error })
            }
            res.send({
                forecast:forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title:'404',
        name:'Prakhar Pandey',
        errorMessage:'Help article not found',
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        title:'404',
        name:'Prakhar Pandey',
        errorMessage:'Page not found',
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})
