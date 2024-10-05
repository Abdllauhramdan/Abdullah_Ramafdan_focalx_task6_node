const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Import posts routes
const postsRoutes = require('./routes/posts');

// Use posts routes for '/posts'
app.use('/posts', postsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
