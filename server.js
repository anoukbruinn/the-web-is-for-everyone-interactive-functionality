// Importeer express uit de node_modules map
import express, { response } from 'express'

const url = 'https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes'
const data = await fetch(url).then((response) => response.json())


// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Stel afhandeling van formulieren in (BEKIJK DEZE CODE NOG)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Maak een route voor de index
app.get('/', function (request, response) {
  // res.send('Hello World!')
  response.render('index', data);
  // console.log(data)
})

app.get('/reserveren', (request, response) => {
    response.render('reserveren', data)
  })
app.post("/toegevoegd",(request, response) => {
 
postJson(url, request.body).then ((data) => {

  if (data.success) (
    response.redirect ('/reserveren')
  )

  else {console.log('Oeps iets gaat mis!')}
  })

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
  app.get('/toevoegen', (request, response) => {
    response.render('toevoegen', data)
  })
// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 4000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

async function fetchJson(url, payload = {}) {
    return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error);  
}

// POST FUNCTION (BEKIJK DEZE CODE NOG)

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
 export async function postJson(url, body) {
  return await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .catch((error) => error)
}


