"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState({ folders: [], files: [] });
  const [showFolders, setShowFolders] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to fetch folders and files
  const fetchFolders = async (root) => {
    try {
      const response = await axios.post('/api/folder/get', { rootId: root });
      if (response.data.success) {
        setData(prevData => ({
          ...prevData,
          folders: response.data.folders,
          files: response.data.files
        }));
        setShowFolders(true);
      } else {
        console.error('Failed to fetch folders:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  // Function to fetch file details
  const fetchFileDetails = async (fileId) => {
    try {
      const response = await axios.post('/api/file/get', { id: fileId });
      console.log(response);
      if (response.data.success) {

        setSelectedFile(response.data);
        console.log(selectedFile);
      } else {
        console.error('Failed to fetch file details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching file details:', error);
    }
  };

  // Function to toggle folder expansion
  const toggleFolder = async (folderId) => {
    if (expandedFolders[folderId]) {
      // Collapse the folder
      setExpandedFolders(prev => ({ ...prev, [folderId]: false }));
    } else {
      // Expand the folder
      try {
        const response = await axios.post('/api/folder/get', { rootId: folderId });
        if (response.data.success) {
          setData(prevData => ({
            ...prevData,
            folders: [...prevData.folders, ...response.data.folders],
            files: [...prevData.files, ...response.data.files]
          }));
          setExpandedFolders(prev => ({ ...prev, [folderId]: true }));
        } else {
          console.error('Failed to fetch subfolders:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching subfolders:', error);
      }
    }
  };

  useEffect(() => {
    if (!showFolders) {
      fetchFolders(null);
    }
  }, [showFolders]);

  return (
    <div className="flex h-screen">
      {/* Left Pane */}
      <div className="flex-1 p-4 border-r border-gray-300 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">File Explorer</h1>
        {!showFolders ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => fetchFolders(null)}
          >
            Show Root Folders
          </button>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2">Folders</h2>
            <ul className="list-none p-0">
              {data.folders.map(folder => (
                <li key={folder._id} className="mb-2">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => toggleFolder(folder._id)}
                  >
                    {expandedFolders[folder._id] ? '−' : '+'}
                  </button>
                  {folder.name}
                  {expandedFolders[folder._id] && (
                    <ul className="list-none pl-4">
                      {data.folders.filter(f => folder.child.includes(f._id)).map(subfolder => (
                        <li key={subfolder._id} className="mb-1">
                          <button
                            className="text-blue-500 hover:underline mr-2"
                            onClick={() => toggleFolder(subfolder._id)}
                          >
                            {expandedFolders[subfolder._id] ? '−' : '+'}
                          </button>
                          {subfolder.name}
                        </li>
                      ))}
                      {data.files.filter(file => file.parent === folder._id).map(file => (
                        <li key={file._id} className="mb-1">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => fetchFileDetails(file._id)}
                          >
                            {file.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Pane */}
      <div className="flex-1 p-4 border-l border-gray-300">
        {selectedFile ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">File Details</h2>
            <p className="mb-2"><strong>Name:</strong> {selectedFile.name}</p>
            <p><strong>Content:</strong></p>
            <pre className="bg-gray-100 p-2 border border-gray-300 rounded">{selectedFile.content}</pre>
          </div>
        ) : (
          <p>Select a file to see its details.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
