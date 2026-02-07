/* ==========================================
   STUDIO PHOTO DJAIDANI 1943 - CONFIG
   Configuration & API Keys - VERSION PROFESSIONNELLE
   ========================================== */

// ==================== API CONFIGURATION ====================
const CONFIG = {
    // Google AI Studio API
    GOOGLE_AI_API_KEY: 'AIzaSyChPuVLJTY_oKhUNYZA5IT8x5Ft7SlugOs',
    GOOGLE_AI_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    
    // MongoDB Configuration  
    MONGODB_URI: 'mongodb+srv://djaidaniadam02_db_user:0WZcqW2iFYDyiDtb@cluster0.vlltcxf.mongodb.net/?retryWrites=true&w=majority&appName=cluster0',
    DB_NAME: 'studio_djaidani_1943',
    COLLECTION_NAME: 'prompts',
    
    // Application Settings
    APP_NAME: 'Studio Photo Djaidani 1943',
    APP_VERSION: '2.0.0',
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    
    // Local Storage Keys
    STORAGE_KEYS: {
        THEME: 'djaidani_theme',
        LAST_GENDER: 'djaidani_last_gender',
        DRAFTS: 'djaidani_drafts',
        SETTINGS: 'djaidani_settings',
        LAST_SYNC: 'djaidani_last_sync'
    },
    
    // UI Settings
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 5000,
    AUTO_SAVE_DELAY: 2000,
    
    // Text Limits
    MAX_TITLE_LENGTH: 100,
    MAX_FRENCH_TEXT_LENGTH: 5000,
    MAX_MODIFICATION_LENGTH: 1000,
    
    // Pagination
    ITEMS_PER_PAGE: 12,
    RECENT_ITEMS_COUNT: 6
};

// Export config
window.CONFIG = CONFIG;

console.log('✅ Configuration chargée - v' + CONFIG.APP_VERSION);
