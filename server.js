const express = require('express')
const hbs = require('hbs')
const fs=require('fs')
const port = process.env.PORT || 3001

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'))

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs')
//   next()
// })

app.use((req, res, next)=>{
  var now = new Date().toString()
  var log = `The request to ${req.url} made at ${now}`

  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      fs.appendFile('server.log',`There was error in ${req.url}`)
    }
  })
  next()  //without next nothing after will be executed
})

hbs.registerHelper('getCurrentYear',(owner)=>{
  return new Date().getFullYear() + owner
})

app.get('/',(req, res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    message:"Welcome to my awesome app!!"
  })
})

app.get('/about',(req, res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    message:"This is some about texts"
  })
})

app.listen(port,()=>{
  console.log(`Listening for requests on port ${port}`)
})
