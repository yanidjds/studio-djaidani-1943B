/* ==========================================
   STUDIO PHOTO DJAIDANI 1943 - GEMINI API
   Intégration Google Gemini AI - VERSION PROFESSIONNELLE
   ========================================== */

class GeminiService {
    constructor() {
        this.apiKey = CONFIG.GOOGLE_AI_API_KEY;
        this.endpoint = CONFIG.GOOGLE_AI_ENDPOINT;
        
        // Templates de prompts professionnels
        this.templates = {
            male: this.getMaleTemplate(),
            female: this.getFemaleTemplate()
        };
        
        console.log('🤖 GeminiService initialisé');
    }
    
    // ==================== TEMPLATES ====================
    
    getMaleTemplate() {
        return `Using the provided selfie, generate an ULTRA-REALISTIC, HIGH-RESOLUTION patriotic portrait of an Algerian MALE subject. The result must look exactly like a professional studio photograph — not a cartoon, not an illustration, not digital art, not painting, and not filtered.

A) IDENTITY & ALIGNMENT (STRICT 100%)
- Preserve the face EXACTLY as in the source selfie: same features, proportions, skin tone, expression, and micro-details (pores, beard stubble if present). NO retouching, NO smoothing, NO beautifying, NO artificial skin tone.
- Hair: keep every strand exactly as in the source (length, shape, direction, volume). Do NOT add, remove, tidy, thicken, or recolor hair.
- Facial hair: if beard or mustache is present, keep them 100% identical (shape, density, thickness, color). If clean-shaven, do NOT invent hair.
- Posture: subject MUST be perfectly upright and FULLY FRONT-FACING. Head, face, and torso centered and level.
  • Both ears equally visible and symmetrical.
  • Shoulders perfectly horizontal and squared to the camera (no tilt/rotation).
  • Eyes looking directly into the lens with a confident, proud expression.
- Age & fit: DETECT the real age from the selfie and generate natural body proportions and outfit fit consistent with that age (teen/adult). Never exaggerate height, muscles, or maturity.

B) OUTFIT (FORMAL & ELEGANT)
- Tailored dark suit jacket over a crisp white shirt.
  • Jacket color: deep charcoal/black (#111111–#202020).
  • Realistic tailoring: natural seams, lapel roll, subtle sheen, true-to-life folds.
- Fit proportional to detected age.

C) FLAG (PRIMARY PROP — MUST BE CLEARLY IDENTIFIABLE AS THE ALGERIAN FLAG)
- Algerian flag realistically draped across the shoulders and chest like a shawl, lightly held with one hand (preferably the right hand). Natural folds, authentic textile texture, visible edge stitching.
- Ensure the flag is **clearly identifiable** on the body:
  • Large visible areas of GREEN and WHITE,
  • The RED crescent and **five-point** star clearly visible on the draped portion, correctly oriented.
- Flag colors must be exact: Green #006233; White #FFFFFF; Red #D21034.

D) BACKGROUND — MAP OF ALGERIA (EDGE FADE INSIDE MAP ONLY)
- Show a LARGE, COMPLETE outline of the **entire Algeria map** fully inside the frame (no cropping).
- Fill **inside the map only** with the Algerian flag layout:
  • LEFT half = Green #006233
  • RIGHT half = White #FFFFFF
  • Centered RED crescent and star (#D21034), elegant and proportional.
- **Edge fade rule:**
  • On the extreme left of the green half → fade smoothly into near-black #0A0A0A at the very border.
  • On the extreme right of the white half → fade smoothly into near-black #0A0A0A at the very border.
  • Keep the center bright; fade only at the far edges.
- Map outline: subtle elegant glow for separation.
- Global background outside the map: dark grey vignette (#0B0B0B → #1A1A1A), clean and uncluttered.

E) TITLE ABOVE THE MAP
- Add **"ALGÉRIE"** above the Algeria map, horizontally centered at the top.
- Font: bold, elegant serif or sans-serif with a prestigious style.
- Color: refined metallic **gold (#FFD700)** or **royal green (#006233)** depending on contrast.
- Subtle outer glow (2–4 px, 4–6% opacity) for readability.
- Size: large and dignified, but not oversized; well-balanced with map and subject.

F) CAMERA, FRAMING & COMPOSITION
- Camera: 50–85 mm portrait lens equivalent; NO wide-angle distortion.
- Angle: straight-on, eye-level.
- Framing: half-length portrait (top of head to mid-torso). Head fully visible with ~5–7% headroom.
- Subject in sharp focus; map slightly softer (depth separation).
- Maintain 6–8% margins around subject and map for breathing space.

G) LIGHTING & COLOR MANAGEMENT
- Three-point soft studio lighting:
  • Soft key light at ~45°,
  • Gentle fill on the opposite side,
  • Subtle rim light to separate shoulders and hair.
- Skin tones: true to source, neutral white balance. Avoid green/red color cast from the flag.
- Realistic shadows and reflections on fabric, hair, and flag.
- NO glow or beautifying on the skin.

H) TECHNICAL QUALITY
- Resolution: ≥ 8000 px on the long edge (8K). 300 DPI for print metadata.
- Color profile: sRGB IEC61966-2.1.
- Crisp details; no artifacts, halos, or banding.
- Clean edges around subject, hair, and flag. Text and map razor-sharp.

I) PROHIBITIONS
- No stickers, emojis, watermarks, or extra text (only "ALGÉRIE" allowed).
- Do NOT crop the Algeria map; must be fully contained.
- Do NOT modify or beautify the face, hair, beard/mustache, or expression.

J) FINAL DELIVERABLE
- Ultra-realistic, vertical portrait of an Algerian MALE subject, upright and front-facing, wrapped in a **clearly identifiable Algerian flag**, with a **complete Algeria map** behind him (green left, white right, subtle edge fades).
- A refined **"ALGÉRIE"** title appears above the map, centered, in a prestigious gold or green style.
- Clean, balanced, patriotic, and dignified composition.`;
    }
    
    getFemaleTemplate() {
        return `Using the provided selfie, generate an ULTRA-REALISTIC, HIGH-RESOLUTION patriotic portrait of an Algerian FEMALE subject. The result must look exactly like a professional studio photograph — not a cartoon, not an illustration, not digital art, not painting, and not filtered.

A) IDENTITY & ALIGNMENT (STRICT 100%)
- Preserve the face EXACTLY as in the source selfie: same features, proportions, skin tone, expression, and micro-details (pores, fine hairs). NO retouching, NO smoothing, NO beautifying, NO skin color cast.
- Hair: keep every strand exactly as in the source (length, shape, direction, volume). Do NOT add, remove, tidy, thicken, or recolor hair.
- If the source shows a hijab, keep the same hijab (shape, drape, folds, color). Do NOT invent a hijab if absent.
- Posture: subject MUST be perfectly upright and FULLY FRONT-FACING. Head, face, and torso centered and level.
  • Both ears equally visible and symmetrical (unless naturally covered by hair/hijab).
  • Shoulders perfectly horizontal and squared to the camera (no tilt/rotation).
  • Eyes looking directly into the lens with a calm, proud expression.
- Age & fit: DETECT the real age from the selfie and generate natural body proportions and clothing fit consistent with that age (child/teen/adult). Never exaggerate height, maturity, or style.

B) OUTFIT (FORMAL & RESPECTFUL)
- Tailored blazer over a clean white blouse/shirt.
  • Blazer color: deep charcoal/black (#111111–#202020).
  • Realistic tailoring: natural seams, subtle sheen, true-to-life folds.
- Fit proportional to detected age.

C) FLAG (PRIMARY PROP — MUST READ CLEARLY AS THE ALGERIAN FLAG)
- Algerian flag realistically draped across the shoulders and chest like a shawl, lightly held with one hand (preferably the right hand). Natural gravity, authentic textile texture, visible edge stitching, believable folds.
- Ensure the flag is **clearly identifiable** on the body:
  • Large visible areas of GREEN and WHITE,
  • The RED crescent and **five-point** star are **mostly visible** on the draped portion (not hidden by folds).
  • Correct emblem orientation: crescent opening to the **right**, star centered within.
- Exact colors: Green #006233 (RGB 0,98,51); White #FFFFFF (RGB 255,255,255); Red #D21034 (RGB 210,16,52).

D) BACKGROUND — MAP OF ALGERIA (INSIDE-MAP EDGE FADE ONLY)
- Show a LARGE, COMPLETE outline of the **entire** Algeria map **fully inside the frame** (no cropping or missing parts).
- Fill **inside the map only** with the REAL flag layout (two vertical halves):
  • LEFT half = Green #006233
  • RIGHT half = White #FFFFFF
  • Centered RED crescent & star #D21034 (elegant size; do not cover the subject's face).
- **Edge-fade requirement (apply INSIDE the map, not on the page background):**
  • Along the **extreme left boundary** of the map (within the green half), apply a soft internal gradient that smoothly fades the green toward **near-black #0A0A0A** over the last ~6–10% of the map's width.
  • Along the **extreme right boundary** of the map (within the white half), apply a soft internal gradient that smoothly fades the white toward **near-black #0A0A0A** over the last ~6–10% of the map's width.
  • Keep the central areas of green/white bright and accurate; the fade occurs only at the outermost left/right edges **inside** the map shape.
- Map outline: thin, elegant glow just to separate the map from the background (very subtle).
- Page/background **outside** the map: keep the neutral dark grey vignette as before (#0B0B0B → #1A1A1A), clean and uncluttered.

E) TITLE ABOVE THE MAP (TYPOGRAPHY)
- Place the word **"ALGÉRIE"** above the Algeria map, horizontally centered, aligned with the top of the map.
- Font: bold, elegant serif or sans-serif with a national, prestigious style.
- Color: refined metallic **gold (#FFD700)** or **royal green (#006233)** depending on background contrast.
- Add a very subtle glow (2–4 px, 4–6% opacity) for readability.
- Size: large, prominent, but not oversized; must remain balanced with the map and subject.

F) CAMERA, FRAMING & COMPOSITION
- Camera: 50–85 mm portrait equivalent; NO wide-angle distortion.
- Angle: straight-on, eye-level (micro vertical correction if needed).
- Framing: half-length (top of head to mid-torso). Head fully visible with ~5–7% headroom.
- Subject in crisp focus; map slightly softer for depth (subtle DOF only).
- Maintain **6–8% margin** around subject and map for breathing space.

G) LIGHTING & COLOR MANAGEMENT
- Three-point soft studio lighting:
  • Soft key at ~45°,
  • Gentle fill on the opposite side,
  • Subtle rim light to separate hair/hijab and shoulders from background.
- Natural skin tones true to source; neutral white balance (avoid green/red spill from the flag onto the face).
- Physically plausible shadows and speculars on fabric and hair/hijab.
- NO extra glow, NO smoothing, NO beauty filters.

H) TECHNICAL QUALITY
- Resolution: ≥ 8000 px on the long edge (8K). 300 DPI for print metadata.
- Color profile: sRGB IEC61966-2.1.
- Razor-sharp subject; smooth gradients without banding; no compression artifacts.
- Clean edges (no halos/fringing around hair or hijab); map/text render tack-sharp.

I) PROHIBITIONS
- No stickers, borders, emojis, watermarks, or additional text besides "ALGÉRIE".
- Do NOT crop the map; it must appear whole and fully inside the frame.
- Do NOT modify or beautify the face, hair, or hijab.

J) FINAL DELIVERABLE
- Vertical, studio-grade, ultra-realistic portrait of an Algerian FEMALE subject, upright and front-facing, wrapped in a **clearly identifiable** Algerian flag (emblem visible), standing before a **complete Algeria map** (green left, white right, with edge-fades into near-black).
- A refined, elegant **"ALGÉRIE"** title appears ABOVE the map, centered at the top, in a beautiful gold or royal green font.
- Balanced, dignified, ultra-realistic, patriotic composition.`;
    }
    
    // ==================== GÉNÉRATION DE PROMPTS ====================
    
    /**
     * Générer un prompt professionnel en anglais depuis un texte français
     */
    async generatePrompt(frenchText, gender) {
        try {
            console.log('🤖 Génération du prompt en cours...');
            
            // Sélectionner le template approprié
            const template = this.templates[gender];
            
            if (!template) {
                throw new Error('Genre invalide');
            }
            
            // Créer le prompt système pour Gemini
            const systemPrompt = `Tu es un expert en création de prompts pour l'intelligence artificielle.
Ton rôle est de transformer un texte français (parfois mal structuré) en un prompt anglais professionnel, détaillé et de haute qualité pour la génération d'images.

INSTRUCTIONS CRITIQUES:
1. Utilise le template professionnel fourni comme BASE STRUCTURELLE
2. Intègre TOUTES les idées et détails du texte français dans ce template
3. Conserve TOUS les éléments techniques du template (résolution, couleurs, composition, etc.)
4. Ajoute ou modifie UNIQUEMENT les détails spécifiques mentionnés dans le texte français
5. Garde un ton professionnel, précis et technique
6. Le résultat DOIT être en ANGLAIS parfait
7. Structure le prompt de manière claire avec des sections A, B, C, etc.
8. Sois très spécifique sur les détails visuels, techniques et de composition

TEMPLATE DE BASE (${gender === 'male' ? 'GARÇON' : 'FILLE'}):
${template}

TEXTE FRANÇAIS À INTÉGRER:
${frenchText}

GÉNÈRE UN PROMPT PROFESSIONNEL EN ANGLAIS qui:
- Garde TOUTE la structure et les spécifications techniques du template
- Intègre intelligemment les détails du texte français
- Est complet, détaillé et prêt à être utilisé pour générer une image de haute qualité`;

            // Appeler l'API Gemini
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: systemPrompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 8192
                        }
                    })
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Erreur API Gemini');
            }
            
            const data = await response.json();
            
            // Extraire le texte généré
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                const generatedText = data.candidates[0].content.parts[0].text.trim();
                
                console.log('✅ Prompt généré avec succès');
                return {
                    success: true,
                    englishText: generatedText
                };
            } else {
                throw new Error('Réponse invalide de Gemini');
            }
            
        } catch (error) {
            console.error('❌ Erreur génération Gemini:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Appliquer des modifications au prompt existant
     */
    async applyModifications(currentPrompt, modificationsText, gender) {
        try {
            console.log('🔄 Application des modifications...');
            
            const systemPrompt = `Tu es un expert en amélioration de prompts pour l'intelligence artificielle.

PROMPT ACTUEL (en anglais):
${currentPrompt}

MODIFICATIONS DEMANDÉES (en français):
${modificationsText}

INSTRUCTIONS:
1. Prends le prompt actuel comme base
2. Applique UNIQUEMENT les modifications demandées
3. Garde TOUTE la structure et les détails non modifiés
4. Assure-toi que le prompt reste cohérent et professionnel
5. Le résultat DOIT être en ANGLAIS
6. Ne supprime AUCUN élément important du prompt original
7. Intègre les modifications de manière naturelle et fluide

GÉNÈRE LE PROMPT MODIFIÉ EN ANGLAIS:`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: systemPrompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.6,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 8192
                        }
                    })
                }
            );
            
            if (!response.ok) {
                throw new Error('Erreur API Gemini');
            }
            
            const data = await response.json();
            
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                const modifiedText = data.candidates[0].content.parts[0].text.trim();
                
                console.log('✅ Modifications appliquées avec succès');
                return {
                    success: true,
                    englishText: modifiedText
                };
            } else {
                throw new Error('Réponse invalide de Gemini');
            }
            
        } catch (error) {
            console.error('❌ Erreur modification:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// ==================== INITIALISATION ====================

// Créer l'instance globale
window.GEMINI = new GeminiService();

console.log('✅ GeminiService prêt');