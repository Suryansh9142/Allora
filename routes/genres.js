const express = require('express');
const router = express.Router();
const { animeList } = require('./anime');
const { moviesList } = require('./movies');
const { tvShowsList } = require('./tvshows');

// Define all genres with their details
const allGenres = {
  action: {
    name: 'Action',
    image: '/images/Genres page/action.webp',
    description: 'Exciting sequences with physical feats and stunts'
  },
  adventure: {
    name: 'Adventure',
    image: '/images/Genres page/Adventure.webp',
    description: 'Exciting journeys and new experiences'
  },
  comedy: {
    name: 'Comedy',
    image: '/images/Genres page/Comedy.avif',
    description: 'Humor and entertainment designed to make you laugh'
  },
  drama: {
    name: 'Drama',
    image: '/images/Genres page/Drama.avif',
    description: 'Serious, emotional, or conflict-based themes'
  },
  fantasy: {
    name: 'Fantasy',
    image: '/images/Genres page/Fantasy.avif',
    description: 'Magical and supernatural elements in imaginary worlds'
  },
  horror: {
    name: 'Horror',
    image: '/images/Genres page/Horror.jpg',
    description: 'Frightening and suspenseful content designed to scare'
  },
  shonen: {
    name: 'Shonen',
    image: '/images/Genres page/Shonen.jpg',
    description: 'Action-packed anime targeted at teenage boys'
  },
  shojo: {
    name: 'Shojo',
    image: '/images/Genres page/Shojo.jpg',
    description: 'Romance and drama targeted at teenage girls'
  },
  seinen: {
    name: 'Seinen',
    image: '/images/Genres page/Seinen.png',
    description: 'Mature themes targeted at adult men'
  },
  isekai: {
    name: 'Isekai',
    image: '/images/Genres page/Isekai.webp',
    description: 'Characters transported to or reborn in another world'
  },
  thriller: {
    name: 'Thriller',
    image: '/images/Genres page/Thriller.avif',
    description: 'Suspenseful and exciting stories'
  },
  scifi: {
    name: 'Sci-Fi',
    image: '/images/Genres page/Sci-Fi.jpg',
    description: 'Futuristic and technological themes'
  },
  romance: {
    name: 'Romance',
    image: '/images/Genres page/Romance.webp',
    description: 'Love stories and relationships'
  },
  documentary: {
    name: 'Documentary',
    image: '/images/Genres page/Documentary.jpg',
    description: 'Non-fiction films about real events and people'
  }
};

// Main genres page
router.get('/', (req, res) => {
  const popularGenres = [
    allGenres.action,
    allGenres.adventure,
    allGenres.comedy,
    allGenres.drama,
    allGenres.fantasy,
    allGenres.horror
  ];

  const animeGenres = [
    allGenres.shonen,
    allGenres.shojo,
    allGenres.seinen,
    allGenres.isekai
  ];

  const movieGenres = [
    allGenres.thriller,
    allGenres.scifi,
    allGenres.romance,
    allGenres.documentary
  ];

  res.render('genres', { 
    title: 'Genres - Allora',
    heading: 'Genres',
    popularGenres: popularGenres,
    animeGenres: animeGenres,
    movieGenres: movieGenres,
    bgClass: 'genres-bg'
  });
});

// Genre detail page
router.get('/:genreName', (req, res) => {
  const genreName = req.params.genreName.toLowerCase();
  const genre = allGenres[genreName];
  
  if (!genre) {
    return res.status(404).render('404', { title: 'Genre Not Found' });
  }
  
  // Combine all content from anime, movies, and TV shows
  const allContent = [
    ...animeList.map(item => ({ ...item, type: 'anime' })),
    ...moviesList.map(item => ({ ...item, type: 'movies' })),
    ...tvShowsList.map(item => ({ ...item, type: 'tvshows' }))
  ];
  
  // Filter content by genre
  const genreContent = allContent.filter(item => 
    item.genres && item.genres.some(g => g.toLowerCase() === genreName)
  );
  
  res.render('genre-detail', {
    title: `${genre.name} - Allora`,
    heading: genre.name,
    genre: genre,
    content: genreContent,
    bgClass: 'genre-detail-bg'
  });
});

module.exports = router; 