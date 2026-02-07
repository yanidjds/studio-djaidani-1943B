// delete-prompt.js - Vercel Function
const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'studio_djaidani_1943';
const COLLECTION_NAME = 'prompts';

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    let client;
    
    try {
        const data = req.body;
        
        // Validation
        if (!data.promptId) {
            return res.status(400).json({ error: 'ID du prompt manquant' });
        }
        
        // Connexion MongoDB
        client = await MongoClient.connect(MONGODB_URI);
        
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        
        // Supprimer le document
        const result = await collection.deleteOne({
            _id: new ObjectId(data.promptId)
        });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Prompt non trouvé' });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Prompt supprimé'
        });
        
    } catch (error) {
        console.error('Error:', error);
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
