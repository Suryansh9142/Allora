const express = require('express');
const router = express.Router();

// Mock database for movie items
const moviesList = [
    {
      id: 201,
      title: 'Inception',
      image: '/images/Movies page/Inception.jpg',
      rating: 5,
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      year: '2010',
      duration: '2h 28min',
      genres: ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
      releaseDate: 'July 16, 2010',
      director: 'Christopher Nolan',
      studio: 'Warner Bros. Pictures',
      ageRating: 'PG-13',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 202,
      title: 'The Dark Knight',
      image: '/images/Movies page/The Dark Knight.jpg',
      rating: 5,
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      year: '2008',
      duration: '2h 32min',
      genres: ['Action', 'Crime', 'Drama', 'Thriller'],
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
      releaseDate: 'July 18, 2008',
      director: 'Christopher Nolan',
      studio: 'Warner Bros. Pictures',
      ageRating: 'PG-13',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 203,
      title: 'Interstellar',
      image: '/images/Movies page/Interstellar.jpg',
      rating: 5,
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      year: '2014',
      duration: '2h 49min',
      genres: ['Adventure', 'Drama', 'Sci-Fi'],
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      releaseDate: 'November 7, 2014',
      director: 'Christopher Nolan',
      studio: 'Paramount Pictures',
      ageRating: 'PG-13',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 204,
      title: 'The Matrix',
      image: '/images/Movies page/The Matrix.jpg',
      rating: 5,
      description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
      year: '1999',
      duration: '2h 16min',
      genres: ['Action', 'Sci-Fi'],
      cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
      releaseDate: 'March 31, 1999',
      director: 'The Wachowskis',
      studio: 'Warner Bros. Pictures',
      ageRating: 'R',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 205,
      title: 'Pulp Fiction',
      image: '/images/Movies page/Pulp Fiction.jpg',
      rating: 4,
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      year: '1994',
      duration: '2h 34min',
      genres: ['Crime', 'Drama'],
      cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
      releaseDate: 'October 14, 1994',
      director: 'Quentin Tarantino',
      studio: 'Miramax',
      ageRating: 'R',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 206,
      title: 'The Shawshank Redemption',
      image: '/images/Movies page/The Shawshank Redemption.jpg',
      rating: 5,
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      year: '1994',
      duration: '2h 22min',
      genres: ['Drama'],
      cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      releaseDate: 'September 23, 1994',
      director: 'Frank Darabont',
      studio: 'Columbia Pictures',
      ageRating: 'R',
      language: 'English',
      subtitles: 'Multiple languages'
    }
];

const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 
  'Sci-Fi', 'Thriller', 'Documentary', 'Animation', 'Fantasy', 'Crime'
];

// Home page route
router.get('/', (req, res) => {
  const moviesListPreview = moviesList.map(movie => ({
    id: movie.id,
    title: movie.title,
    image: movie.image,
    rating: movie.rating,
    description: movie.description
  }));

  res.render('movies', { 
    title: 'Movies - Allora',
    heading: 'Movies',
    moviesList: moviesListPreview,
    genres: genres,
    bgClass: 'movies-bg'
  });
});

// Detail page route
router.get('/detail/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = moviesList.find(item => item.id === id);

  if (!movie) {
    return res.status(404).render('error', { 
      message: 'Movie not found',
      error: { status: 404, stack: '' }
    });
  }

  res.render('detail', {
    title: `${movie.title} - Allora`,
    item: movie
  });
});

module.exports = {
  router,
  moviesList
}; 