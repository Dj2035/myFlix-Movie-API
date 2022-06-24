const express = require('express'),
  morgan = require('morgan');

const app = express();

//List of top 10 movies
let topMovies = [
  {
    title: 'Aquaman',
    actor: 'Jason Momoa'
  },
  {
    title: 'Black Panther',
    actor: 'Chadwick Boseman'
  },
  {
    title: 'Spider man',
    actor: 'Tom Holland'
  },
  {
    title: 'Fast Five',
    actor: 'Vin Diesel'
  },
  {
    title: 'John Wick',
    actor: 'Keanu Reeves'
  },
  {
    title: 'Terminator',
    actor: 'Arnold Schwarzenegger'
  },
  {
    title: 'Ninja Assassins',
    actor: 'Rain Lee Joon'
  },
  {
    title: 'Mission impossible',
    actor: 'Tom Cruise'
  },
  {
    title: 'Wonder Woman',
    actor: 'Gal Gadot'
  },
  {
    title: 'Taken',
    actor: 'Liam Neeson'
  }
];

// logging requests using the morgan middlewarelibrary
app.use(morgan('common'));

//Serving static documentation file located in public folder
app.use('/', express.static('public'));

//request function for top 10 movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//Default textual response for root folder
app.get('/', (req, res) => {
  res.send('Welcome to my movie api!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
