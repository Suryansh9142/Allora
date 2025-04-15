const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3007;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRoutes = require('./routes/index');
const { router: animeRoutes, animeList } = require('./routes/anime');
const { router: moviesRoutes, moviesList } = require('./routes/movies');
const { router: tvshowsRoutes, tvShowsList } = require('./routes/tvshows');
const genresRoutes = require('./routes/genres');

// Use routes
app.use('/', indexRoutes);
app.use('/anime', animeRoutes);
app.use('/movies', moviesRoutes);
app.use('/tvshows', tvshowsRoutes);
app.use('/genres', genresRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 