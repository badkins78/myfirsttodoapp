const { time } = require('console')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000


let db,
    dbConnectionStr=process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
      console.log(`connected to ${dbName} Database`)
      db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json)

app.get('/', (request, response)=>{
  db.collection('chores').find().toArray()
  .then(data => {
    response.render('index.ejs', {info: data})
  })
  .catch(error => console.error(error))
})

app.post('addChore', (request, response) => {
  db.collection('chores').insertOne({choreName: request.body.choreName,
  workerName: request.body.workerName, supervisorName: request.body.supervisorName, timesWeekly: request.body.timesWeekly})
  .then(result => {
    console.log('chore added')
    response.redirect('/')
  })
  .catch(error => console.error(error))
})

app.put('/updateTimes', (request, response)=>{
  db.collection('chores').updateOne({choreName: request.body.choreName, workerName: request.body.workerName, supervisorName: request.body.supervisorName, timesWeekly: request.body.timesWeekly},{
    $set:{
      timesWeekly:request.body.timesWeekly + 1
    },
  },{
      sort: {_id: -1},
      upsert: true
    })
    .then(result => {
      console.log('added instance')
      response.json('instance added')
    })
    .catch(error => console.error(error))
  })

  app.delete('/deleteChore', (request, response) => {
    db.collection('chores').deleteOne({choreName: request.body.chorename})
    .then(result =>{
      console.log('deleted chore')
      response.json('deleted chore')
    })
    .catch(error => console.error(error))
  })

  app.listen(process.env.PORT || PORT , () => {
    console.log(`server is running on port ${PORT}`)
  })