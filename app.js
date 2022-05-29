// Require Libraries
const express = require('express');

// Require tenorjs near the top of the file
const Tenor = require("tenorjs").client({
  // Replace with your own key
  "Key": "NX448ESHV8SE", // https://tenor.com/developer/keyregistration
  "Filter": "high", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App Setup
const app = express();

// Styles
app.use(express.static('public'));

// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes

// root route
app.get('/', (req, res) => {
  console.log(req.query) // => "{ term: hey" }[/bold]
  // res.render('home')
  term = ""
  if (req.query.term) {
      term = req.query.term
  }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, "10")
      .then(response => {
          // store the gifs we get back from the search
          const gifs = response;
          // pass the gifs as an object into the home page
          res.render('home', { gifs })
      }).catch(console.error);
})

// root route TEST
// app.get('/', (req, res) => {
//     // set the url of the gif
//     const gifUrl = 'https://media1.tenor.com/images/561c988433b8d71d378c9ccb4b719b6c/tenor.gif?itemid=10058245'
//     // render the hello-gif view, passing the gifUrl into the view to be displayed
//     res.render('handle-gif', { gifUrl })
// });

// greetings route
app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
})
// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});