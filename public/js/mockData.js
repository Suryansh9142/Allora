// Mock user data for testing
const mockUserData = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocLFPDQHFUCnbKH5JgqnGvt0z-HbIjV-e4gxHC9eFw=s96-c',
    joinDate: 'January 15, 2023',
    googleConnected: true,
    accountType: 'Premium',
    lastLogin: 'Today at 10:45 AM',
    favoriteGenres: ['Action', 'Sci-Fi', 'Comedy'],
    watchStats: {
        totalWatched: 42,
        totalHours: 86,
        favoriteCategory: 'Anime'
    },
    watchHistory: [
        { title: 'Attack on Titan', type: 'anime', lastWatched: '2 days ago', progress: '75%', episode: 'S4E15' },
        { title: 'Inception', type: 'movie', lastWatched: '1 week ago', progress: '100%', duration: '2h 28m' },
        { title: 'Breaking Bad', type: 'tvshow', lastWatched: '3 days ago', progress: '60%', episode: 'S3E7' }
    ],
    watchlist: [
        { title: 'Demon Slayer', type: 'anime', addedOn: '5 days ago', image: '/images/anime-1.jpeg' },
        { title: 'The Matrix', type: 'movie', addedOn: '2 weeks ago', image: '/images/1129034.jpg' },
        { title: 'Stranger Things', type: 'tvshow', addedOn: '1 month ago', image: '/images/baground#1.webp' }
    ],
    achievements: [
        { name: 'Binge Watcher', description: 'Watched 10 episodes in a row', icon: 'fa-medal', date: 'March 15, 2023' },
        { name: 'Movie Buff', description: 'Watched 20 movies', icon: 'fa-film', date: 'February 28, 2023' },
        { name: 'Early Bird', description: 'Joined during beta period', icon: 'fa-certificate', date: 'January 20, 2023' }
    ]
};

// Function to initialize mock data in localStorage
function initMockData() {
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(mockUserData));
        localStorage.setItem('isLoggedIn', 'true');
        console.log('Mock user data initialized in localStorage');
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockUserData, initMockData };
} else {
    // When used in browser
    window.initMockData = initMockData;
    window.mockUserData = mockUserData;
} 