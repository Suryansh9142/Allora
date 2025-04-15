const express = require('express');
const router = express.Router();

// Mock database for anime items
const animeList = [
    {
      id: 101,
      title: 'Attack on Titan',
      image: '/images/Anime page/Attack On Titan.jpg',
      rating: 5,
      description: 'Humanity\'s last stand against man-eating giants in a post-apocalyptic world.',
      year: '2013-2023',
      duration: '25 min per episode',
      genres: ['Action', 'Drama', 'Fantasy', 'Horror'],
      cast: ['Yuki Kaji', 'Yui Ishikawa', 'Marina Inoue'],
      releaseDate: 'April 7, 2013',
      director: 'Tetsuro Araki',
      studio: 'Wit Studio / MAPPA',
      ageRating: 'R - 17+',
      language: 'Japanese',
      subtitles: 'English, Spanish, French'
    },
    {
      id: 102,
      title: 'Demon Slayer',
      image: '/images/Anime page/Demon Slayer.jpg',
      rating: 5,
      description: 'A young man becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.',
      year: '2019-Present',
      duration: '23 min per episode',
      genres: ['Action', 'Fantasy', 'Adventure', 'Supernatural'],
      cast: ['Natsuki Hanae', 'Akari Kito', 'Hiro Shimono'],
      releaseDate: 'April 6, 2019',
      director: 'Haruo Sotozaki',
      studio: 'ufotable',
      ageRating: 'R - 17+',
      language: 'Japanese',
      subtitles: 'English, Spanish, French'
    },
    {
      id: 103,
      title: 'My Hero Academia',
      image: '/images/Anime page/My Hero Academia.jpg',
      rating: 4,
      description: 'In a world where people with superpowers are the norm, a boy without them dreams of becoming a hero.',
      year: '2016-Present',
      duration: '23 min per episode',
      genres: ['Action', 'Comedy', 'Superhero'],
      cast: ['Daiki Yamashita', 'Nobuhiko Okamoto', 'Kenta Miyake'],
      releaseDate: 'April 3, 2016',
      director: 'Kenji Nagasaki',
      studio: 'Bones',
      ageRating: 'PG-13',
      language: 'Japanese',
      subtitles: 'English, Spanish, French'
    },
    {
      id: 104,
      title: 'One Piece',
      image: '/images/Anime page/One Piece.jpg',
      rating: 5,
      description: 'Monkey D. Luffy and his pirate crew explore the Grand Line in search of the world\'s ultimate treasure.',
      year: '1999-Present',
      duration: '23 min per episode',
      genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
      cast: ['Mayumi Tanaka', 'Kazuya Nakai', 'Akemi Okamura'],
      releaseDate: 'October 20, 1999',
      director: 'Konosuke Uda',
      studio: 'Toei Animation',
      ageRating: 'PG-13',
      language: 'Japanese',
      subtitles: 'English, Spanish, French'
    },
    {
      id: 105,
      title: 'Naruto',
      image: '/images/Anime page/Naruto.jpg',
      rating: 4,
      description: 'A young ninja seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
      year: '2002-2017',
      duration: '23 min per episode',
      genres: ['Action', 'Adventure', 'Fantasy', 'Martial Arts'],
      cast: ['Junko Takeuchi', 'Chie Nakamura', 'Kazuhiko Inoue'],
      releaseDate: 'October 3, 2002',
      director: 'Hayato Date',
      studio: 'Pierrot',
      ageRating: 'PG-13',
      language: 'Japanese',
      subtitles: 'English, Spanish, French'
    },
    {
      id: 106,
      title: 'Death Note',
      image: '/images/Anime page/Death Note.jpg',
      rating: 5,
      description: 'A high school student discovers a supernatural notebook that grants its user the ability to kill anyone.',
      year: '2006-2007',
      duration: '23 min per episode',
      genres: ['Psychological Thriller', 'Supernatural', 'Mystery'],
      cast: ['Mamoru Miyano', 'Kappei Yamaguchi', 'Shido Nakamura'],
      releaseDate: 'October 3, 2006',
      director: 'Tetsuro Araki',
      studio: 'Madhouse',
      ageRating: 'R - 17+',
      language: 'Japanese',
      subtitles: 'English, Spanish, French'
    }
];

const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
  'Mecha', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'
];

// Home page route
router.get('/', (req, res) => {
  const animeListPreview = animeList.map(anime => ({
    id: anime.id,
    title: anime.title,
    image: anime.image,
    rating: anime.rating,
    description: anime.description
  }));

  res.render('anime', { 
    title: 'Anime - Allora',
    heading: 'Anime',
    animeList: animeListPreview,
    genres: genres,
    bgClass: 'anime-bg'
  });
});

// Detail page route
router.get('/detail/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const anime = animeList.find(item => item.id === id);

  if (!anime) {
    return res.status(404).render('error', { 
      message: 'Anime not found',
      error: { status: 404, stack: '' }
    });
  }

  res.render('detail', {
    title: `${anime.title} - Allora`,
    item: anime
  });
});

module.exports = {
  router,
  animeList
}; 