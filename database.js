/* ==========================================
   STUDIO PHOTO DJAIDANI 1943 - DATABASE
   Gestion MongoDB & LocalStorage - VERSION PROFESSIONNELLE
   ========================================== */

class DatabaseManager {
    constructor() {
        this.db = null;
        this.isConnected = false;
        this.localCache = new Map();
        
        console.log('[DB] DatabaseManager initialisé');
    }
    
    // ==================== MONGODB CONNECTION ====================
    
    /**
     * Tester la connexion MongoDB via API Netlify Function
     */
    async testConnection() {
        try {
            console.log('[CONNECT] Test de connexion MongoDB...');
            
            const response = await fetch('/api/test-connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.isConnected = true;
                console.log('[OK] Connexion MongoDB réussie');
                return { success: true, message: 'Connexion réussie' };
            } else {
                throw new Error(data.error || 'Échec de connexion');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur de connexion:', error);
            this.isConnected = false;
            return { success: false, error: error.message };
        }
    }
    
    // ==================== PROMPTS CRUD ====================
    
    /**
     * Sauvegarder un nouveau prompt
     */
    async savePrompt(promptData) {
        try {
            console.log('[DB] Sauvegarde du prompt...');
            
            // Préparer les données
            const prompt = {
                title: promptData.title || 'Sans titre',
                gender: promptData.gender,
                frenchText: promptData.frenchText,
                englishText: promptData.englishText,
                modifications: promptData.modifications || [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                version: 1
            };
            
            // Sauvegarder en local d'abord
            this.saveToLocalStorage(prompt);
            
            // Sauvegarder sur MongoDB
            const response = await fetch('/api/save-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prompt)
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('[OK] Prompt sauvegardé avec succès');
                prompt._id = data.promptId;
                this.localCache.set(data.promptId, prompt);
                return { success: true, promptId: data.promptId, prompt };
            } else {
                throw new Error(data.error || 'Échec de sauvegarde');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur de sauvegarde:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Récupérer tous les prompts
     */
    async getAllPrompts(filters = {}) {
        try {
            console.log('📥 Récupération des prompts...');
            
            const response = await fetch('/api/get-prompts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filters)
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log(`[OK] ${data.prompts.length} prompts récupérés`);
                
                // Mettre à jour le cache local
                data.prompts.forEach(prompt => {
                    this.localCache.set(prompt._id, prompt);
                });
                
                return { success: true, prompts: data.prompts };
            } else {
                throw new Error(data.error || 'Échec de récupération');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur de récupération:', error);
            
            // Fallback sur le localStorage
            const localPrompts = this.getFromLocalStorage();
            return { success: false, prompts: localPrompts, error: error.message };
        }
    }
    
    /**
     * Mettre à jour un prompt existant
     */
    async updatePrompt(promptId, updates) {
        try {
            console.log('🔄 Mise à jour du prompt...');
            
            const updateData = {
                ...updates,
                updatedAt: new Date().toISOString()
            };
            
            const response = await fetch('/api/update-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    promptId,
                    updates: updateData
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('[OK] Prompt mis à jour avec succès');
                
                // Mettre à jour le cache
                if (this.localCache.has(promptId)) {
                    const cached = this.localCache.get(promptId);
                    this.localCache.set(promptId, { ...cached, ...updateData });
                }
                
                return { success: true };
            } else {
                throw new Error(data.error || 'Échec de mise à jour');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur de mise à jour:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Supprimer un prompt
     */
    async deletePrompt(promptId) {
        try {
            console.log('🗑️ Suppression du prompt...');
            
            const response = await fetch('/api/delete-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ promptId })
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('[OK] Prompt supprimé avec succès');
                
                // Supprimer du cache
                this.localCache.delete(promptId);
                
                return { success: true };
            } else {
                throw new Error(data.error || 'Échec de suppression');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur de suppression:', error);
            return { success: false, error: error.message };
        }
    }
    
    // ==================== LOCAL STORAGE ====================
    
    /**
     * Sauvegarder dans le localStorage
     */
    saveToLocalStorage(prompt) {
        try {
            const existingPrompts = this.getFromLocalStorage();
            const newPrompts = [prompt, ...existingPrompts.slice(0, 49)]; // Garder max 50
            
            localStorage.setItem('djaidani_prompts', JSON.stringify(newPrompts));
            console.log('[DB] Sauvegardé en local');
            
        } catch (error) {
            console.error('[ERROR] Erreur localStorage:', error);
        }
    }
    
    /**
     * Récupérer depuis le localStorage
     */
    getFromLocalStorage() {
        try {
            const stored = localStorage.getItem('djaidani_prompts');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('[ERROR] Erreur lecture localStorage:', error);
            return [];
        }
    }
    
    /**
     * Effacer le localStorage
     */
    clearLocalStorage() {
        try {
            localStorage.removeItem('djaidani_prompts');
            console.log('🗑️ LocalStorage effacé');
            return { success: true };
        } catch (error) {
            console.error('[ERROR] Erreur effacement:', error);
            return { success: false, error: error.message };
        }
    }
    
    // ==================== STATISTIQUES ====================
    
    /**
     * Obtenir les statistiques
     */
    async getStats() {
        try {
            const result = await this.getAllPrompts();
            const prompts = result.prompts || [];
            
            return {
                total: prompts.length,
                byGender: {
                    male: prompts.filter(p => p.gender === 'male').length,
                    female: prompts.filter(p => p.gender === 'female').length
                },
                lastActivity: prompts.length > 0 
                    ? new Date(prompts[0].createdAt).toLocaleDateString('fr-FR')
                    : '-'
            };
            
        } catch (error) {
            console.error('[ERROR] Erreur stats:', error);
            return {
                total: 0,
                byGender: { male: 0, female: 0 },
                lastActivity: '-'
            };
        }
    }
    
    /**
     * Obtenir les prompts récents
     */
    async getRecentPrompts(limit = 6) {
        try {
            const result = await this.getAllPrompts();
            const prompts = result.prompts || [];
            
            return prompts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, limit);
                
        } catch (error) {
            console.error('[ERROR] Erreur prompts récents:', error);
            return [];
        }
    }
    
    // ==================== SYNCHRONISATION ====================
    
    /**
     * Synchroniser les données
     */
    async syncData() {
        try {
            console.log('🔄 Synchronisation des données...');
            
            // Récupérer tous les prompts du serveur
            const result = await this.getAllPrompts();
            
            if (result.success) {
                // Mettre à jour le timestamp de dernière synchro
                localStorage.setItem(
                    CONFIG.STORAGE_KEYS.LAST_SYNC,
                    new Date().toISOString()
                );
                
                console.log('[OK] Synchronisation réussie');
                return { success: true, count: result.prompts.length };
            } else {
                throw new Error('Échec de synchronisation');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur de synchronisation:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Obtenir la date de dernière synchronisation
     */
    getLastSyncDate() {
        try {
            const lastSync = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_SYNC);
            return lastSync ? new Date(lastSync).toLocaleString('fr-FR') : 'Jamais';
        } catch (error) {
            return 'Jamais';
        }
    }
    
    // ==================== EXPORT / IMPORT ====================
    
    /**
     * Exporter les données
     */
    async exportData() {
        try {
            const result = await this.getAllPrompts();
            const prompts = result.prompts || [];
            
            const dataStr = JSON.stringify(prompts, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `studio-djaidani-export-${Date.now()}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            
            console.log('[OK] Données exportées');
            return { success: true };
            
        } catch (error) {
            console.error('[ERROR] Erreur export:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Importer des données
     */
    async importData(file) {
        try {
            console.log('📥 Import des données...');
            
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (!Array.isArray(data)) {
                throw new Error('Format de fichier invalide');
            }
            
            // Sauvegarder chaque prompt
            let successCount = 0;
            for (const prompt of data) {
                const result = await this.savePrompt(prompt);
                if (result.success) successCount++;
            }
            
            console.log(`[OK] ${successCount}/${data.length} prompts importés`);
            return { success: true, count: successCount, total: data.length };
            
        } catch (error) {
            console.error('[ERROR] Erreur import:', error);
            return { success: false, error: error.message };
        }
    }
}

// ==================== INITIALISATION ====================

// Créer l'instance globale
window.DB = new DatabaseManager();

console.log('[OK] DatabaseManager prêt');