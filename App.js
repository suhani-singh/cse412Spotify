import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:3001/users/details')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users with playlists and songs:', error);
        setError(`Error fetching users with playlists and songs: ${error.message}`);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Users, Playlists, and Songs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.userid}>
              <h2>{user.username}</h2>

              {user.playlists && user.playlists.length > 0 ? (
                user.playlists.map(playlist => (
                  <div key={playlist.playlistid}>
                    <strong>{playlist.playlist_name}</strong>

                    {playlist.songs && playlist.songs.length > 0 ? (
                      <ul>
                        {playlist.songs.map(song => (
                          <li key={song.songid}>
                            {song.s_title} - {song.s_genre}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No songs for this playlist.</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No playlists for this user.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
