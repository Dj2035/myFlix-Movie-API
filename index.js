const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

//List of movies
let movies = [
  {
    Title: "Aquaman",
    Actor: "Jason Momoa",
    movieID: "1",
    Genre: {
      Name: "Drama",
      Description: "Drama is category of narrative fiction"
    },
    Director: {
      Name: "Darren Aronofsky",
      Bio: "Born february 12, 1969"
    }
  },
  {
    Title: "Black Panther",
    Actor: "Chadwick Boseman",
    movieID: "2",
    Genre: {
      Name: "Action",
      Description: "Action is category of fiction with many fighting scenes"
    },
    Director: {
      Name: "Arnold Scheider",
      Bio: "Born february 12, 1975"
    }
  },
  {
    Title: "Walking Dead",
    Actor: "Nick Peterson",
    movieID: "3",
    Genre: {
      Name: "Horror",
      Description: "Horror is category of frightful movies"
    },
    Director: {
      Name: "Luc Sonderland",
      Bio: "Born May 12, 1970"
    }
  },
  {
    Title: "John Wick",
    Actor: "Keanu Reeves",
    movieID: "4",
    Genre: {
      Name: "Action",
      Description: "Action is category of fiction with many fighting scenes"
    },
    Director: {
      Name: "Morgan Freemann",
      Bio: "Born November 19, 1976"
    }
  },
  {
    Title: "The Princess Bride",
    Actor: "Martin Talisman",
    movieID: "5",
    Genre: {
      Name: "Action",
      Description: "Action is category of fiction with many fighting scenes"
    },
    Director: {
      Name: "Ron Reiner",
      Bio: "Born february 12, 1975"
    }
  }
];

let users = [
  {
    id: "1",
    username: "Kim",
    favoriteMovies: []
  },
  {
    id: "2",
    username: "Joe",
    favoriteMovies: ["Aquaman"]
  }
];

// logging requests using the morgan middlewarelibrary
app.use(morgan('common'));

//Serving static documentation file located in public folder
app.use('/', express.static('public'));

//GET movies
app.get('/movies', (req, res) => {
  res.status(200).send('Successful GET request returning data on all the movies');
});

app.get('/users', (req, res) => {
  res.status(200).json('movies');
});

//GET single movie title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie');
  }
});

//GET data about genre by name
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre');
  }
});

//GET data about director by name
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director');
  }
});

//Post: Allow users to register
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.username) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need usernames')
  }
});

//UPDATE user name
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
    user.username = updatedUser.username;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user')
  }
});

//CREATE: Allow users add favorite movies
app.post('/users/:username/movies/:movieId', (req, res) => {
  const { username, movieId } = req.params;
  let user = users.find( user => user.username == username );

  if(user) {
    user.favoriteMovies.push(movieId);
    res.status(200).send(`Movie with id: ${movieId} has been added to ${username}'s array'`);
  } else {
    res.status(400).send('no such user')
  }

});

//DELETE a movie by title
app.delete('/users/:username/movies/:movieId', (req, res) => {
  const { username, movieId } = req.params;

  let user = users.find( user => user.username == username );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( movie => movie !== movieId);
    res.status(200).send(`Movie with id: ${movieId} has been removed from ${username}'s array'`);
  } else {
    res.status(400).send('no such user')
  }
});


//DELETE user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter( user => user.id != id );
    res.status(200).send(`user with id: ${id} has been successfully deleted`);
  } else {
    res.status(400).send('no such user')
  }
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
