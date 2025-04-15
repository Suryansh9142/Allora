const express = require('express');
const router = express.Router();

// Mock database of content items
const contentDatabase = [
  {
    id: 101,
    title: 'Attack on Titan',
    type: 'anime',
    image: '/images/Home page/Attack On Titan.jpg',
    rating: 5,
    year: '2013-2023',
    duration: '25 min per episode',
    description: 'Humanity\'s last stand against man-eating giants in a post-apocalyptic world. After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    genres: ['Action', 'Drama', 'Fantasy', 'Horror'],
    cast: ['Yuki Kaji', 'Yui Ishikawa', 'Marina Inoue', 'Hiroshi Kamiya'],
    releaseDate: 'April 7, 2013',
    director: 'Tetsuro Araki',
    studio: 'Wit Studio / MAPPA',
    ageRating: 'R - 17+',
    language: 'Japanese',
    subtitles: 'English, Spanish, French',
    relatedContent: [
      {
        id: 4,
        title: 'Demon Slayer',
        image: '/images/Anime page/Demon Slayer.jpg',
        rating: 5
      },
      {
        id: 5,
        title: 'My Hero Academia',
        image: '/images/Anime page/My Hero Academia.jpg',
        rating: 4
      }
    ]
  },
  {
    id: 201,
    title: 'Inception',
    type: 'movies',
    image: '/images/Home page/inception.jpg',
    rating: 4,
    year: '2010',
    duration: '2h 28min',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.',
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
    releaseDate: 'July 16, 2010',
    director: 'Christopher Nolan',
    studio: 'Warner Bros. Pictures',
    ageRating: 'PG-13',
    language: 'English',
    subtitles: 'Multiple languages',
    relatedContent: [
      {
        id: 6,
        title: 'Interstellar',
        image: '/images/Movies page/Interstellar.jpg',
        rating: 5
      },
      {
        id: 7,
        title: 'The Matrix',
        image: '/images/Movies page/The Matrix.jpg',
        rating: 5
      }
    ]
  },
  {
    id: 301,
    title: 'Breaking Bad',
    type: 'tvshows',
    image: '/images/Home page/Breaking Bad.jpg',
    rating: 5,
    year: '2008-2013',
    duration: '49 min per episode',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family\'s future. When chemistry teacher Walter White is diagnosed with Stage III cancer and given only two years to live, he decides he has nothing to lose.',
    genres: ['Crime', 'Drama', 'Thriller'],
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris'],
    releaseDate: 'January 20, 2008',
    director: 'Vince Gilligan',
    studio: 'AMC',
    ageRating: 'TV-MA',
    language: 'English',
    subtitles: 'Multiple languages',
    relatedContent: [
      {
        id: 8,
        title: 'Better Call Saul',
        image: '/images/TVshows page/Better Call Saul.jpg',
        rating: 4
      },
      {
        id: 9,
        title: 'Ozark',
        image: '/images/TVshows page/Ozark.jpg',
        rating: 4
      }
    ]
  }
];

// Home page route
router.get('/', (req, res) => {
  const featuredContent = contentDatabase.map(item => ({
    id: item.id,
    title: item.title,
    image: item.image,
    rating: item.rating,
    description: item.description,
    type: item.type
  }));

  res.render('index', { 
    title: 'Allora - Your Anime & Movie Hub',
    heading: 'Allora',
    featuredContent: featuredContent,
    bgClass: 'home-bg'
  });
});

// Detail page route
router.get('/detail/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = contentDatabase.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).render('404', { 
      title: 'Page Not Found',
      heading: 'Page Not Found',
      bgClass: 'home-bg'
    });
  }
  
  res.render('detail', {
    title: `${item.title} - Allora`,
    heading: item.title,
    item: item,
    bgClass: 'detail-bg'
  });
});

module.exports = router; 