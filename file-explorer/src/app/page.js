import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get('/api/folders/null'); // Use "null" to fetch root folders
        if (response.data.success) {
          setFolders(response.data.folders);
        } else {
          console.error('Failed to fetch folders:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []);

  return (
    <div>
      <h1>File Explorer</h1>
      <h2>Root Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder._id}>
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
