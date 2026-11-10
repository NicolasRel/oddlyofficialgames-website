# Rapport de qualité

Date : 10 novembre 2026. Chaque ligne dit ce qui a été exécuté et ce qui a été mesuré. Ce qui n'a pas été vérifié est listé à la fin, séparément.

## 1. Construction et contrôle automatique

| Contrôle | Commande | Résultat |
|---|---|---|
| Build | `npm run build` | 13 pages, 0 erreur, 0 avertissement |
| Contrôle du site construit | `npm run check` | 13 pages, « No problem found » |
| Liens externes | `node scripts/check-site.mjs --external` | 2 liens, 2 réponses 200 (`privacy.oddlyofficialgames.com`, déclaration de confidentialité de GitHub) |
| Dépendances | `npm audit` | 0 vulnérabilité |
| Secrets | recherche de clés, jetons, mots de passe et chemins privés dans le dépôt | aucun |

`npm run check` vérifie, pour chaque page : la langue déclarée, le titre (70 caractères au plus), la description (50 à 170), un seul `h1`, l'adresse canonique, les trois `hreflang`, la réciprocité entre les deux langues, les balises de partage, un texte alternatif et des dimensions sur chaque image, l'absence de script, la validité des données structurées, chaque lien interne, chaque ancre, chaque fichier d'image, et la présence du lien vers la politique de confidentialité officielle.

## 2. Lighthouse

Lighthouse 13.6.0, Chrome sans interface, sur le site construit servi en local (`npm run preview`), profils mobile et ordinateur. Résultats de la seconde passe, après corrections.

| Page | Profil | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| Accueil (EN) | mobile | 100 | 100 | 100 | 100 | 0,7 s | 0,001 |
| Accueil (EN) | ordinateur | 100 | 100 | 100 | 100 | 0,2 s | 0,001 |
| Accueil (FR) | mobile | 100 | 100 | 100 | 100 | 0,7 s | 0,001 |
| Accueil (FR) | ordinateur | 100 | 100 | 100 | 100 | 0,2 s | 0,001 |
| Registre (EN) | mobile | 100 | 100 | 100 | 100 | 1,7 s | 0,001 |
| Registre (EN) | ordinateur | 100 | 100 | 100 | 100 | 0,4 s | 0,001 |
| Conepocalypse (EN) | mobile | 100 | 100 | 100 | 100 | 0,7 s | 0,001 |
| Conepocalypse (EN) | ordinateur | 100 | 100 | 100 | 100 | 0,4 s | 0,001 |
| Conepocalypse (FR) | mobile | 100 | 100 | 100 | 100 | 0,7 s | 0,024 |
| Conepocalypse (FR) | ordinateur | 100 | 100 | 100 | 100 | 0,4 s | 0,001 |
| Presse (EN) | mobile | 100 | 100 | 100 | 100 | 0,7 s | 0,023 |
| Presse (EN) | ordinateur | 100 | 100 | 100 | 100 | 0,2 s | 0 |
| Contact (EN) | mobile | 100 | 100 | 100 | 100 | 0,6 s | 0,001 |
| Contact (EN) | ordinateur | 100 | 100 | 100 | 100 | 0,2 s | 0,001 |
| Mentions légales (EN) | mobile | 100 | 100 | 100 | 100 | 0,6 s | 0,001 |
| Mentions légales (EN) | ordinateur | 100 | 100 | 100 | 100 | 0,2 s | 0 |

Objectif de la mission : 95 ou plus dans les quatre catégories. Atteint sur les seize mesures.

Limite de cette mesure : serveur local, donc sans latence réseau réelle (Lighthouse la simule). La mesure sur l'adresse de préproduction est en section 7.

La première passe donnait 97 en accessibilité sur la page du jeu (liste de la galerie mal déclarée) et signalait des noms accessibles différents du texte visible (logo, bouton de langue, boutons de téléchargement). Les trois points sont corrigés.

## 3. Affichages

Captures pleine page prises avec Chrome (`node scripts/screenshots.mjs`), dix pages à cinq tailles, soit 50 captures, relues à l'œil.

| Taille | Largeur × hauteur | Résultat |
|---|---|---|
| Téléphone compact | 360 × 740 | conforme |
| Téléphone récent | 390 × 844 | conforme |
| Tablette | 768 × 1024 | conforme |
| Ordinateur portable | 1366 × 768 | conforme |
| Écran large | 1920 × 1080 | conforme |
| Zoom 400 % (équivalent 320 px) | 320 × 640 | aucun débordement sur les 13 pages |

Sur les 50 captures : aucune erreur de console, aucune requête en échec, aucun débordement horizontal.

## 4. Anomalies trouvées et corrigées

| Anomalie | Où | Correction |
|---|---|---|
| Le titre du jeu passait sous le portrait | page du jeu, 1366 px | le titre se dimensionne sur la largeur de sa colonne, quelle que soit sa longueur |
| Bandeau des chiffres décalé de 40 px par rapport au reste | accueil | sélecteur CSS trop large |
| Numéros de section trop petits | toutes les sections | agrandis |
| Débordement horizontal de 33 à 63 px | espace presse, téléphone | les adresses longues se coupent dans les fiches |
| « 1 développeur » sur deux lignes | accueil, tablette | quatre colonnes à partir de 960 px seulement |
| Boutons désalignés entre les trois guichets | contact | le lien vers l'espace presse passe au-dessus du bouton |
| Colonne centrée sous un titre aligné à gauche | mentions légales | même alignement que les autres pages |
| Filet du pied de page plus large que le contenu | toutes les pages | corrigé |
| Vignettes rognées sur le haut de l'écran du jeu | espace presse | vignettes en portrait |
| En-tête trop large de 6 à 13 px | toutes les pages, 320 px | navigation resserrée sous 368 px |
| Le tampon dépassait du cadre pendant son animation | accueil, téléphone | la section d'accueil rogne ce qui dépasse |
| Orthographe britannique mêlée à celle du jeu (« Mobilise », « Humour ») | textes anglais | orthographe américaine, comme dans le jeu (« MOBILIZE ») |
| Descriptions trop longues (jusqu'à 239 caractères) | accueil et page du jeu | ramenées sous 170 |

## 5. Accessibilité

| Point | Méthode | Résultat |
|---|---|---|
| Règles automatiques (axe, via Lighthouse) | 16 mesures | 100 partout |
| Navigation au clavier | touche Tab sur l'accueil et la page du jeu | ordre logique ; lien d'évitement en premier ; 22 et 20 éléments atteints |
| Focus visible | style calculé de chaque élément atteint | contour plein de 3 px sur tous |
| Titres | relevé de la hiérarchie | un `h1` par page, niveaux sans saut |
| Zones tactiles | mesure de chaque lien et bouton | 40 px ou plus ; seules exceptions, les liens dans une phrase, admises par WCAG 2.5.8 |
| Contrastes | audit Lighthouse | aucun échec ; texte principal à 15:1, gris d'étiquette à 8:1, orange sur encre à 6:1 |
| Mouvement réduit | lecture du CSS | animations, transitions et fondus entre pages coupés |
| Textes alternatifs | `npm run check` | toutes les images en ont un, dans la langue de la page |
| Langue | `npm run check` | `lang` sur chaque page ; les liens vers l'autre langue portent `lang` et `hreflang` |
| Zoom | 320 px de large | aucun débordement |

## 6. Traductions

- Les deux fichiers de textes ont la même structure, vérifiée au build : une clé manquante arrête la construction.
- Les 12 pages existent dans les deux langues, à des adresses propres.
- Le français est écrit, pas traduit mot à mot ; espaces insécables posées à l'affichage.
- Les termes du jeu (C.O.N.E., Bureau des Travaux Définitivement Provisoires, Standby Office, The Wire, Tenders, grades) viennent du fichier de localisation du jeu.

## 7. Préproduction

**État au 10/11/2026 : la préproduction publique n'est pas en ligne.** Le dépôt a été créé en privé ; GitHub Pages gratuit demande un dépôt public, et ce passage en public attend l'accord de Nicolas.

Ce qui a été vérifié à la place :

| Contrôle | Résultat |
|---|---|
| Workflow sur GitHub (premier push, commit `fa56e29`) | `npm ci`, build et `npm run check` réussis sur le serveur de GitHub ; seule l'étape de mise en ligne échoue, Pages n'étant pas activé |
| Build de préproduction (`SITE_URL`, `BASE_PATH`, `PUBLIC_NOINDEX`) | 13 pages ; `npm run check` avec le chemin de base : « No problem found » |
| Même build servi en local sous `/oddlyofficialgames-website/` | pages, polices, images de partage, fichiers presse, plan du site : 200 ; 6 captures (3 pages, téléphone et ordinateur) sans erreur de console, sans requête en échec, sans débordement |
| Non-indexation | balise `noindex, nofollow` présente sur les pages de ce build |

Restent à faire une fois le site en ligne : Lighthouse sur l'adresse réelle, contrôle des trois adresses après la bascule du domaine.

## 8. Ce qui reste, et ce qui n'a pas été vérifié

**Limites connues, assumées.**
- Les captures montrent l'interface française, y compris sur les pages anglaises ; la légende le dit. Des captures en anglais demandent un build du jeu.
- Pas de bande-annonce : aucune n'est validée pour diffusion. L'emplacement est prêt.
- Pas d'archive unique du dossier de presse : les fichiers se téléchargent un par un.
- En-têtes de sécurité HTTP : limités par l'hébergeur (voir `DECISIONS.md`, section 5).

**Non vérifié.**
- Téléphones et tablettes réels : tout a été vu dans Chrome en émulation.
- Safari et Firefox : non lancés. Le site n'utilise que du HTML et du CSS courants ; les requêtes de conteneur et `overflow: clip` demandent Safari 16 ou plus récent.
- Lecteurs d'écran (VoiceOver, NVDA, TalkBack) : non lancés. La structure a été vérifiée, pas l'écoute.
- Aperçus de partage sur les réseaux sociaux : les balises sont présentes et les images existent, mais aucun réseau n'a été interrogé.
- Rendu perçu : la qualité visuelle a été jugée sur captures par Claude. Le regard de Nicolas reste la porte humaine.
