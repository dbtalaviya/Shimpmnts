"use client"
import { redirect } from 'next/dist/server/api-utils';
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data));
                Login.redirect('/home');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username:</label>
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} className="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500">Login</button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    );
};

export default Login;