// Importeer express uit de node_modules map
import express, { response } from 'express'

const url = 'https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes?first=1000'
const data = await fetch(url).then((response) => response.json())


// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', function (request, response) {
  // res.send('Hello World!')
  response.render('index', data);
  console.log(data)
})

app.get('/reserveren', (request, response) => {
    response.render('reserveren', data)
  })
app.get('/contact', (request, response) => {
    response.render('contact', data)
  })
app.get('/informatie', (request, response) => {
    response.render('informatie', data)
  })
app.get('/agenda', (request, response) => {
    response.render('agenda', data)
  })
app.get('/index', (request, response) => {
    response.render('index', data)
  })
// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 4000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})