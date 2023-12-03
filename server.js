const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'spotifyDB',
  password: '1234',
  port: 5432,
});

app.use(bodyParser.json());

// Get users with their respective playlists, playlist names, and playlist songs
app.get('/users/details', async (req, res) => {
  try {
    const usersResult = await pool.query('SELECT * FROM u_user');

    if (usersResult.rows.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Fetch associated playlists, playlist names, and songs for each user
    const usersWithPlaylistsAndSongs = await Promise.all(usersResult.rows.map(async (user) => {
      const playlistsResult = await pool.query(`
        SELECT
          playlist1.playlistid,
          playlist1.p_name AS playlist_name,
          song.songid,
          song.s_title,
          song.s_genre
        FROM playlist1
        INNER JOIN song ON playlist1.p_songid = song.songid
        WHERE playlist1.p_userid = $1
      `, [user.userid]);

      return { ...user, playlists: playlistsResult.rows };
    }));

    res.json(usersWithPlaylistsAndSongs);
  } catch (error) {
    console.error('Error fetching users with playlists and songs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (existing code)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
