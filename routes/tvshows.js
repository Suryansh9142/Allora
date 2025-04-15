const express = require('express');
const router = express.Router();

// Mock database for TV show items
const tvShowsList = [
    {
      id: 301,
      title: 'Breaking Bad',
      image: '/images/TVshows page/Breaking Bad.jpg',
      rating: 5,
      description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family\'s future.',
      year: '2008-2013',
      duration: '49 min per episode',
      genres: ['Crime', 'Drama', 'Thriller'],
      cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris'],
      releaseDate: 'January 20, 2008',
      director: 'Vince Gilligan',
      studio: 'AMC',
      ageRating: 'TV-MA',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 302,
      title: 'Game of Thrones',
      image: '/images/TVshows page/Game of Thrones.jpg',
      rating: 4,
      description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
      year: '2011-2019',
      duration: '57 min per episode',
      genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
      cast: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage'],
      releaseDate: 'April 17, 2011',
      director: 'Various',
      studio: 'HBO',
      ageRating: 'TV-MA',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 303,
      title: 'Stranger Things',
      image: '/images/TVshows page/Stanger Things.jpg',
      rating: 5,
      description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
      year: '2016-Present',
      duration: '51 min per episode',
      genres: ['Drama', 'Fantasy', 'Horror', 'Mystery'],
      cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
      releaseDate: 'July 15, 2016',
      director: 'The Duffer Brothers',
      studio: 'Netflix',
      ageRating: 'TV-14',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 304,
      title: 'The Crown',
      image: '/images/TVshows page/The Crown.jpg',
      rating: 4,
      description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
      year: '2016-Present',
      duration: '58 min per episode',
      genres: ['Biography', 'Drama', 'History'],
      cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton'],
      releaseDate: 'November 4, 2016',
      director: 'Various',
      studio: 'Netflix',
      ageRating: 'TV-MA',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 305,
      title: 'The Witcher',
      image: '/images/TVshows page/The Witcher.jpg',
      rating: 4,
      description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
      year: '2019-Present',
      duration: '60 min per episode',
      genres: ['Action', 'Adventure', 'Fantasy'],
      cast: ['Henry Cavill', 'Freya Allan', 'Anya Chalotra'],
      releaseDate: 'December 20, 2019',
      director: 'Various',
      studio: 'Netflix',
      ageRating: 'TV-MA',
      language: 'English',
      subtitles: 'Multiple languages'
    },
    {
      id: 306,
      title: 'The Mandalorian',
      image: '/images/TVshows page/The Mandalorian.jpg',
      rating: 5,
      description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
      year: '2019-Present',
      duration: '40 min per episode',
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      cast: ['Pedro Pascal', 'Carl Weathers', 'Giancarlo Esposito'],
      releaseDate: 'November 12, 2019',
      director: 'Various',
      studio: 'Disney+',
      ageRating: 'TV-14',
      language: 'English',
      subtitles: 'Multiple languages'
    }
];

const genres = [
  'Drama', 'Comedy', 'Action', 'Thriller', 'Sci-Fi', 'Fantasy', 
  'Horror', 'Crime', 'Mystery', 'Documentary', 'Reality', 'Animation'
];

// Home page route
router.get('/', (req, res) => {
  const tvShowsListPreview = tvShowsList.map(show => ({
    id: show.id,
    title: show.title,
    image: show.image,
    rating: show.rating,
    description: show.description
  }));

  res.render('tvshows', { 
    title: 'TV Shows - Allora',
    heading: 'TV Shows',
    tvShowsList: tvShowsListPreview,
    genres: genres,
    bgClass: 'tvshows-bg'
  });
});

// Detail page route
router.get('/detail/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const show = tvShowsList.find(item => item.id === id);

  if (!show) {
    return res.status(404).render('error', { 
      message: 'TV Show not found',
      error: { status: 404, stack: '' }
    });
  }

  res.render('detail', {
    title: `${show.title} - Allora`,
    item: show
  });
});

module.exports = {
  router,
  tvShowsList
}; 