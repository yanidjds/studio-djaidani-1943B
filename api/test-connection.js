// test-connection.js - Vercel Function
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }
    
    let client;
    
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not set');
        }
        
        client = await MongoClient.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        
        // Ping the database
        await client.db('admin').command({ ping: 1 });
        
        return res.status(200).json({
            success: true,
            message: 'Connexion MongoDB réussie'
        });
        
    } catch (error) {
        console.error('Connection error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
};
