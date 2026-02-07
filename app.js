/* ==========================================
   studio photo djaidani 1943 - app principale
   application complète - version professionnelle 2.0
   ========================================== */

class StudioApp {
    constructor() {
        // état de l'application
        this.currentview = 'home';
        this.currentstep = 1;
        this.selectedgender = null;
        this.currentpromptid = null;
        
        // données du formulaire
        this.formdata = {
            title: '',
            frenchText: '',
            englishText: '',
            modifications: []
        };
        
        // Références DOM
        this.elements = {};
        
        console.log('[INIT] Studio Photo Djaidani - Initialisation...');
        this.init();
    }
    
    // ==================== INITIALISATION ====================
    
    async init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            await this.setup();
        }
    }
    
    async setup() {
        try {
            console.log('[CONFIG] Configuration de l'application...');
            
            // Cacher le loader
            this.hideLoader();
            
            // Initialiser les références DOM
            this.initDOMReferences();
            
            // Appliquer le thème
            this.applyTheme();
            
            // Initialiser les événements
            this.initEventListeners();
            
            // Charger les données initiales
            await this.loadInitialData();
            
            // Tester la connexion DB
            this.testDBConnection();
            
            console.log('[OK] Application prête !');
            this.showToast('Application chargée avec succès', 'success');
            
        } catch (error) {
            console.error('[ERROR] Erreur setup:', error);
            this.showToast('Erreur lors du chargement', 'error');
        }
    }
    
    initDOMReferences() {
        this.elements = {
            // Navigation
            navBtns: document.querySelectorAll('.nav-btn'),
            mobileMenuToggle: document.getElementById('mobileMenuToggle'),
            navMenu: document.querySelector('.nav-menu'),
            
            // Theme
            themeToggle: document.getElementById('themeToggle'),
            
            // Creation form
            genderCards: document.querySelectorAll('.gender-card'),
            promptTitle: document.getElementById('promptTitle'),
            frenchText: document.getElementById('frenchText'),
            generateBtn: document.getElementById('generateBtn'),
            englishOutput: document.getElementById('englishOutput'),
            
            // Modifications
            modificationText: document.getElementById('modificationText'),
            applyModificationBtn: document.getElementById('applyModificationBtn'),
            modificationsHistory: document.getElementById('modificationsHistory'),
            historyList: document.getElementById('historyList'),
            
            // Actions
            copyBtn: document.getElementById('copyBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            savePromptBtn: document.getElementById('savePromptBtn'),
            
            // Archives
            searchInput: document.getElementById('searchInput'),
            genderFilter: document.getElementById('genderFilter'),
            sortFilter: document.getElementById('sortFilter'),
            archivesGrid: document.getElementById('archivesGrid'),
            
            // Sync
            testConnectionBtn: document.getElementById('testConnectionBtn'),
            syncNowBtn: document.getElementById('syncNowBtn'),
            dbStatus: document.getElementById('dbStatus'),
            lastSync: document.getElementById('lastSync'),
            exportDataBtn: document.getElementById('exportDataBtn'),
            importDataBtn: document.getElementById('importDataBtn'),
            clearLocalBtn: document.getElementById('clearLocalBtn'),
            autoSyncToggle: document.getElementById('autoSyncToggle'),
            localBackupToggle: document.getElementById('localBackupToggle'),
            
            // Stats
            totalPrompts: document.getElementById('totalPrompts'),
            lastActivity: document.getElementById('lastActivity'),
            recentPromptsGrid: document.getElementById('recentPromptsGrid'),
            
            // Text stats
            wordCount: document.getElementById('wordCount'),
            charCount: document.getElementById('charCount')
        };
    }
    
    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
    }
    
    // ==================== ÉVÉNEMENTS ====================
    
    initEventListeners() {
        console.log('[SETUP] Initialisation des événements...');
        
        // Navigation
        this.elements.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });
        
        // CTA Button (Hero)
        const ctaBtn = document.querySelector('.cta-button');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => this.switchView('create'));
        }
        
        // Mobile menu
        if (this.elements.mobileMenuToggle) {
            this.elements.mobileMenuToggle.addEventListener('click', () => {
                this.elements.navMenu.classList.toggle('show');
            });
        }
        
        // Theme toggle
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Gender selection
        this.elements.genderCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const gender = e.currentTarget.dataset.gender;
                this.selectGender(gender);
            });
        });
        
        // French text input - count words/chars
        if (this.elements.frenchText) {
            this.elements.frenchText.addEventListener('input', () => {
                this.updateTextStats();
            });
        }
        
        // Generate button
        if (this.elements.generateBtn) {
            this.elements.generateBtn.addEventListener('click', () => {
                this.generatePrompt();
            });
        }
        
        // Apply modifications button
        if (this.elements.applyModificationBtn) {
            this.elements.applyModificationBtn.addEventListener('click', () => {
                this.applyModifications();
            });
        }
        
        // Copy button
        if (this.elements.copyBtn) {
            this.elements.copyBtn.addEventListener('click', () => {
                this.copyToClipboard();
            });
        }
        
        // Download button
        if (this.elements.downloadBtn) {
            this.elements.downloadBtn.addEventListener('click', () => {
                this.downloadPrompt();
            });
        }
        
        // Save button
        if (this.elements.savePromptBtn) {
            this.elements.savePromptBtn.addEventListener('click', () => {
                this.savePrompt();
            });
        }
        
        // Search and filters
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', () => {
                this.filterArchives();
            });
        }
        
        if (this.elements.genderFilter) {
            this.elements.genderFilter.addEventListener('change', () => {
                this.filterArchives();
            });
        }
        
        if (this.elements.sortFilter) {
            this.elements.sortFilter.addEventListener('change', () => {
                this.filterArchives();
            });
        }
        
        // Sync buttons
        if (this.elements.testConnectionBtn) {
            this.elements.testConnectionBtn.addEventListener('click', () => {
                this.testDBConnection();
            });
        }
        
        if (this.elements.syncNowBtn) {
            this.elements.syncNowBtn.addEventListener('click', () => {
                this.syncData();
            });
        }
        
        if (this.elements.exportDataBtn) {
            this.elements.exportDataBtn.addEventListener('click', () => {
                this.exportData();
            });
        }
        
        if (this.elements.importDataBtn) {
            this.elements.importDataBtn.addEventListener('click', () => {
                this.importData();
            });
        }
        
        if (this.elements.clearLocalBtn) {
            this.elements.clearLocalBtn.addEventListener('click', () => {
                this.clearLocalData();
            });
        }
        
        console.log('[OK] Événements initialisés');
    }
    
    // ==================== NAVIGATION ====================
    
    switchView(viewName) {
        console.log(`[VIEW] Changement de vue: ${this.currentView} → ${viewName}`);
        
        // Cacher toutes les vues
        document.querySelectorAll('.view-section').forEach(view => {
            view.classList.remove('active');
        });
        
        // Afficher la vue demandée
        const targetView = document.getElementById(`${viewName}View`);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
            
            // Mettre à jour la navigation
            this.elements.navBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.view === viewName) {
                    btn.classList.add('active');
                }
            });
            
            // Fermer le menu mobile
            if (this.elements.navMenu) {
                this.elements.navMenu.classList.remove('show');
            }
            
            // Charger les données si nécessaire
            if (viewName === 'archives') {
                this.loadArchives();
            } else if (viewName === 'sync') {
                this.updateSyncView();
            }
        }
    }
    
    goToStep(stepNumber) {
        console.log(`[STEP] Passage à l'étape ${stepNumber}`);
        this.currentStep = stepNumber;
        
        // Cacher toutes les étapes
        document.querySelectorAll('.step-content').forEach(step => {
            step.style.display = 'none';
        });
        
        // Afficher l'étape demandée
        const targetStep = document.getElementById(`step${stepNumber}`);
        if (targetStep) {
            targetStep.style.display = 'block';
        }
        
        // Mettre à jour l'indicateur
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 <= stepNumber) {
                step.classList.add('active');
            }
        });
    }
    
    // ==================== GENDER SELECTION ====================
    
    selectGender(gender) {
        this.selectedGender = gender;
        console.log('Genre sélectionné:', gender);
        
        // Mettre à jour l'UI
        this.elements.genderCards.forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.gender === gender) {
                card.classList.add('selected');
            }
        });
        
        // Passer à l'étape suivante
        setTimeout(() => {
            this.goToStep(2);
        }, 300);
    }
    
    // ==================== TEXT STATS ====================
    
    updateTextStats() {
        const text = this.elements.frenchText.value;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const chars = text.length;
        
        if (this.elements.wordCount) {
            this.elements.wordCount.textContent = `${words} mots`;
        }
        
        if (this.elements.charCount) {
            this.elements.charCount.textContent = `${chars} / 5000 caractères`;
        }
    }
    
    // ==================== PROMPT GENERATION ====================
    
    async generatePrompt() {
        try {
            // Validation
            if (!this.selectedGender) {
                this.showToast('Veuillez sélectionner un genre', 'warning');
                this.goToStep(1);
                return;
            }
            
            const frenchText = this.elements.frenchText.value.trim();
            if (!frenchText) {
                this.showToast('Veuillez entrer du texte en français', 'warning');
                return;
            }
            
            if (frenchText.split(/\s+/).length < 10) {
                this.showToast('Le texte doit contenir au moins 10 mots', 'warning');
                return;
            }
            
            // Sauvegarder les données
            this.formData.title = this.elements.promptTitle.value.trim() || 'Sans titre';
            this.formData.frenchText = frenchText;
            
            // Afficher le loader
            this.showToast('Génération en cours...', 'info');
            this.elements.generateBtn.disabled = true;
            this.elements.generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération...';
            
            // Appeler Gemini
            const result = await GEMINI.generatePrompt(frenchText, this.selectedGender);
            
            if (result.success) {
                this.formData.englishText = result.englishText;
                this.elements.englishOutput.textContent = result.englishText;
                
                // Passer à l'étape 3
                this.goToStep(3);
                this.showToast('Prompt généré avec succès !', 'success');
            } else {
                throw new Error(result.error || 'Erreur de génération');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur génération:', error);
            this.showToast('Erreur lors de la génération: ' + error.message, 'error');
        } finally {
            this.elements.generateBtn.disabled = false;
            this.elements.generateBtn.innerHTML = '<i class="fas fa-magic"></i> Générer le prompt professionnel';
        }
    }
    
    // ==================== MODIFICATIONS ====================
    
    async applyModifications() {
        try {
            const modText = this.elements.modificationText.value.trim();
            
            if (!modText) {
                this.showToast('Veuillez décrire vos modifications', 'warning');
                return;
            }
            
            // Afficher le loader
            this.showToast('Application des modifications...', 'info');
            this.elements.applyModificationBtn.disabled = true;
            this.elements.applyModificationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Application...';
            
            // Appeler Gemini pour appliquer les modifications
            const result = await GEMINI.applyModifications(
                this.formData.englishText,
                modText,
                this.selectedGender
            );
            
            if (result.success) {
                // Sauvegarder la modification dans l'historique
                this.formData.modifications.push({
                    text: modText,
                    timestamp: new Date().toISOString()
                });
                
                // Mettre à jour le prompt
                this.formData.englishText = result.englishText;
                this.elements.englishOutput.textContent = result.englishText;
                
                // Afficher l'historique
                this.updateModificationsHistory();
                
                // Vider le champ de modification
                this.elements.modificationText.value = '';
                
                this.showToast('Modifications appliquées avec succès !', 'success');
            } else {
                throw new Error(result.error || 'Erreur d\'application');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur modifications:', error);
            this.showToast('Erreur: ' + error.message, 'error');
        } finally {
            this.elements.applyModificationBtn.disabled = false;
            this.elements.applyModificationBtn.innerHTML = '<i class="fas fa-refresh"></i> Appliquer les modifications';
        }
    }
    
    updateModificationsHistory() {
        if (this.formData.modifications.length > 0) {
            this.elements.modificationsHistory.style.display = 'block';
            
            this.elements.historyList.innerHTML = this.formData.modifications.map((mod, index) => `
                <div class="history-item">
                    <div class="history-item-header">
                        <strong>Modification #${index + 1}</strong>
                        <span class="history-item-date">
                            ${new Date(mod.timestamp).toLocaleString('fr-FR')}
                        </span>
                    </div>
                    <div class="history-item-content">${mod.text}</div>
                </div>
            `).join('');
        }
    }
    
    // ==================== ACTIONS ====================
    
    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.formData.englishText);
            this.showToast('Copié dans le presse-papier !', 'success');
        } catch (error) {
            console.error('[ERROR] Erreur copie:', error);
            this.showToast('Impossible de copier', 'error');
        }
    }
    
    downloadPrompt() {
        try {
            const blob = new Blob([this.formData.englishText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `prompt-${this.formData.title.replace(/\s+/g, '-')}-${Date.now()}.txt`;
            link.click();
            URL.revokeObjectURL(url);
            
            this.showToast('Prompt téléchargé !', 'success');
        } catch (error) {
            console.error('[ERROR] Erreur téléchargement:', error);
            this.showToast('Erreur de téléchargement', 'error');
        }
    }
    
    async savePrompt() {
        try {
            this.showToast('Sauvegarde en cours...', 'info');
            
            const result = await DB.savePrompt({
                title: this.formData.title,
                gender: this.selectedGender,
                frenchText: this.formData.frenchText,
                englishText: this.formData.englishText,
                modifications: this.formData.modifications
            });
            
            if (result.success) {
                this.showToast('Prompt sauvegardé avec succès !', 'success');
                this.currentPromptId = result.promptId;
                
                // Mettre à jour les stats
                this.loadInitialData();
            } else {
                throw new Error(result.error || 'Échec de sauvegarde');
            }
            
        } catch (error) {
            console.error('[ERROR] Erreur sauvegarde:', error);
            this.showToast('Erreur: ' + error.message, 'error');
        }
    }
    
    // ==================== DATA LOADING ====================
    
    async loadInitialData() {
        try {
            console.log('[DATA] Chargement des données...');
            
            // Charger les stats
            const stats = await DB.getStats();
            this.updateStats(stats);
            
            // Charger les prompts récents
            const recentPrompts = await DB.getRecentPrompts(6);
            this.displayRecentPrompts(recentPrompts);
            
        } catch (error) {
            console.error('[ERROR] Erreur chargement:', error);
        }
    }
    
    updateStats(stats) {
        if (this.elements.totalPrompts) {
            this.elements.totalPrompts.textContent = stats.total || 0;
        }
        
        if (this.elements.lastActivity) {
            this.elements.lastActivity.textContent = stats.lastActivity || '-';
        }
    }
    
    displayRecentPrompts(prompts) {
        if (!this.elements.recentPromptsGrid) return;
        
        if (prompts.length === 0) {
            this.elements.recentPromptsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <p>Aucun prompt pour le moment</p>
                    <button class="btn-secondary" onclick="app.switchView('create')">
                        Créer votre premier prompt
                    </button>
                </div>
            `;
        } else {
            this.elements.recentPromptsGrid.innerHTML = prompts.map(prompt => this.createPromptCard(prompt)).join('');
        }
    }
    
    createPromptCard(prompt) {
        const preview = prompt.frenchText.substring(0, 150) + '...';
        const date = new Date(prompt.createdAt).toLocaleDateString('fr-FR');
        
        return `
            <div class="prompt-card" onclick="app.viewPrompt('${prompt._id}')">
                <div class="prompt-card-header">
                    <div>
                        <h4 class="prompt-card-title">${prompt.title}</h4>
                        <div class="prompt-card-meta">
                            <span class="gender-badge ${prompt.gender}">
                                <i class="fas fa-${prompt.gender === 'male' ? 'male' : 'female'}"></i>
                                ${prompt.gender === 'male' ? 'Garçon' : 'Fille'}
                            </span>
                            <span><i class="fas fa-calendar"></i> ${date}</span>
                        </div>
                    </div>
                </div>
                <p class="prompt-card-preview">${preview}</p>
                <div class="prompt-card-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); app.editPrompt('${prompt._id}')">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="action-btn danger" onclick="event.stopPropagation(); app.deletePrompt('${prompt._id}')">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `;
    }
    
    // ==================== ARCHIVES ====================
    
    async loadArchives() {
        try {
            console.log('[LOAD] Chargement des archives...');
            const result = await DB.getAllPrompts();
            
            this.allPrompts = result.prompts || [];
            this.filterArchives();
            
        } catch (error) {
            console.error('[ERROR] Erreur archives:', error);
            this.showToast('Erreur de chargement des archives', 'error');
        }
    }
    
    filterArchives() {
        if (!this.allPrompts) return;
        
        let filtered = [...this.allPrompts];
        
        // Filtre par recherche
        const searchTerm = this.elements.searchInput?.value.toLowerCase() || '';
        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchTerm) ||
                p.frenchText.toLowerCase().includes(searchTerm)
            );
        }
        
        // Filtre par genre
        const genderFilter = this.elements.genderFilter?.value || '';
        if (genderFilter) {
            filtered = filtered.filter(p => p.gender === genderFilter);
        }
        
        // Tri
        const sortBy = this.elements.sortFilter?.value || 'recent';
        if (sortBy === 'recent') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortBy === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        // Afficher
        this.displayArchives(filtered);
    }
    
    displayArchives(prompts) {
        if (!this.elements.archivesGrid) return;
        
        if (prompts.length === 0) {
            this.elements.archivesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>Aucun prompt trouvé</p>
                </div>
            `;
        } else {
            this.elements.archivesGrid.innerHTML = prompts.map(prompt => this.createPromptCard(prompt)).join('');
        }
    }
    
    async deletePrompt(promptId) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce prompt ?')) {
            return;
        }
        
        try {
            const result = await DB.deletePrompt(promptId);
            
            if (result.success) {
                this.showToast('Prompt supprimé', 'success');
                this.loadArchives();
                this.loadInitialData();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('[ERROR] Erreur suppression:', error);
            this.showToast('Erreur de suppression', 'error');
        }
    }
    
    // ==================== SYNC ====================
    
    async testDBConnection() {
        try {
            this.elements.dbStatus.innerHTML = `
                <span class="status-badge status-checking">
                    <i class="fas fa-spinner fa-spin"></i>
                    Vérification...
                </span>
            `;
            
            const result = await DB.testConnection();
            
            if (result.success) {
                this.elements.dbStatus.innerHTML = `
                    <span class="status-badge status-connected">
                        <i class="fas fa-check-circle"></i>
                        Connecté
                    </span>
                `;
                this.showToast('Connexion réussie !', 'success');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            this.elements.dbStatus.innerHTML = `
                <span class="status-badge status-error">
                    <i class="fas fa-times-circle"></i>
                    Déconnecté
                </span>
            `;
            this.showToast('Erreur de connexion', 'error');
        }
    }
    
    async syncData() {
        try {
            this.showToast('Synchronisation...', 'info');
            const result = await DB.syncData();
            
            if (result.success) {
                this.showToast(`Synchronisation réussie ! (${result.count} prompts)`, 'success');
                this.updateSyncView();
                this.loadInitialData();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('[ERROR] Erreur sync:', error);
            this.showToast('Erreur de synchronisation', 'error');
        }
    }
    
    updateSyncView() {
        if (this.elements.lastSync) {
            this.elements.lastSync.textContent = DB.getLastSyncDate();
        }
    }
    
    async exportData() {
        try {
            const result = await DB.exportData();
            if (result.success) {
                this.showToast('Données exportées !', 'success');
            }
        } catch (error) {
            this.showToast('Erreur d\'export', 'error');
        }
    }
    
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const result = await DB.importData(file);
                if (result.success) {
                    this.showToast(`${result.count}/${result.total} prompts importés`, 'success');
                    this.loadArchives();
                    this.loadInitialData();
                } else {
                    this.showToast('Erreur d\'import', 'error');
                }
            }
        };
        input.click();
    }
    
    clearLocalData() {
        if (!confirm('Êtes-vous sûr ? Cette action est irréversible.')) {
            return;
        }
        
        const result = DB.clearLocalStorage();
        if (result.success) {
            this.showToast('Données locales effacées', 'success');
            this.loadInitialData();
        }
    }
    
    // ==================== THEME ====================
    
    applyTheme() {
        const theme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'light';
        document.body.className = `theme-${theme}`;
        
        const icon = this.elements.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    toggleTheme() {
        const current = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'light';
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, newTheme);
        this.applyTheme();
    }
    
    // ==================== TOAST NOTIFICATIONS ====================
    
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, CONFIG.TOAST_DURATION);
    }
}

// ==================== INITIALISATION GLOBALE ====================

// Créer l'instance globale
window.app = new StudioApp();

console.log('[OK] Application Studio Photo Djaidani chargée');
