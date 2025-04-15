# Allora - Anime & Movie Streaming Website

Allora is a fully responsive website for anime, movie, and TV show enthusiasts. The site features a beautiful, modern UI with smooth animations and a user-friendly interface.

## Features

- **Responsive Design**: Works on all devices from mobile phones to desktop computers
- **Beautiful UI**: Modern design with smooth animations and transitions
- **Multiple Pages**: Home, Anime, Movies, TV Shows, and Genres pages
- **Search Functionality**: Search for content across the site
- **Genre Filtering**: Browse content by genre
- **Interactive Elements**: Hover effects, card animations, and more

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **EJS**: Embedded JavaScript templates for server-side rendering
- **HTML5/CSS3**: For structure and styling
- **JavaScript (ES6+)**: For client-side functionality
- **Google Fonts**: For typography
- **Font Awesome**: For icons

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd allora-website
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
allora-website/
├── app.js                  # Main application file
├── package.json            # Project dependencies
├── routes/                 # Route handlers
│   ├── index.js            # Home page routes
│   ├── anime.js            # Anime page routes
│   ├── movies.js           # Movies page routes
│   ├── tvshows.js          # TV Shows page routes
│   └── genres.js           # Genres page routes
├── views/                  # EJS templates
│   ├── partials/           # Reusable template parts
│   │   ├── header.ejs      # Header partial
│   │   └── footer.ejs      # Footer partial
│   ├── index.ejs           # Home page template
│   ├── anime.ejs           # Anime page template
│   ├── movies.ejs          # Movies page template
│   ├── tvshows.ejs         # TV Shows page template
│   ├── genres.ejs          # Genres page template
│   └── 404.ejs             # 404 page template
└── public/                 # Static assets
    ├── css/                # Stylesheets
    │   └── styles.css      # Main stylesheet
    ├── js/                 # JavaScript files
    │   └── script.js       # Main JavaScript file
    └── images/             # Image assets
```

## Future Enhancements

- User authentication system
- Video player functionality
- Favorites and watchlist features
- Rating and review system
- More advanced filtering options

## Credits

- Fonts: Google Fonts (Caveat, Cinzel Decorative, Macondo)
- Icons: Font Awesome
- Images: Various sources (for demonstration purposes only)

## License

This project is for educational purposes only. All content is used for demonstration. 