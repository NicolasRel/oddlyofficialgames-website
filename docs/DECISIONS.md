# Décisions de conception

Date : 10 novembre 2026. Ce document dit ce qui a été décidé pour le site, et pourquoi. Les mesures sont dans `QUALITY.md`.

## 1. Architecture du site

| Page | Anglais | Français |
|---|---|---|
| Accueil | `/` | `/fr/` |
| Registre des jeux | `/games/` | `/fr/jeux/` |
| Page d'un jeu | `/games/<jeu>/` | `/fr/jeux/<jeu>/` |
| Espace presse | `/press/` | `/fr/presse/` |
| Contact | `/contact/` | `/fr/contact/` |
| Mentions légales | `/legal/` | `/fr/mentions-legales/` |

- L'anglais est à la racine : c'est la langue internationale et la version `x-default`.
- Le français a ses propres adresses, lisibles en français.
- Chaque page déclare son adresse canonique et ses deux versions (`hreflang`), dans la page et dans le plan du site.
- Le site ne redirige jamais selon la langue du navigateur : chaque adresse sert toujours la même page. Le changement de langue est un lien, dans l'en-tête et le pied de page.
- La page 404 est unique et parle les deux langues.
- Il n'y a pas de route `/privacy` : la politique de confidentialité du jeu reste à `https://privacy.oddlyofficialgames.com`.

## 2. Direction artistique

**Point de départ.** Le studio a déjà une identité validée : l'écran d'entrée de Conepocalypse (cocarde, « ODDLY », tampon « OFFICIAL » incliné, « GAMES »), ses couleurs et ses polices. Le site la reprend sans la modifier. Aucun nouveau logo n'a été créé.

**Idée.** Le nom du studio est le programme : étrangement officiel. Le site est tenu comme un registre administratif. Chaque jeu est un dossier numéroté, chaque section a une référence, un statut vrai reçoit un tampon. L'humour vient de ce sérieux, pas de clins d'œil.

**Indépendance vis-à-vis du premier jeu.** Le langage du studio est celui de l'administration (registre, dossier, tampon), pas celui des cônes. Un jeu d'un tout autre genre recevra le même dossier.

| Élément | Choix |
|---|---|
| Fond | encre `#1C2027`, voile `#0E1014` |
| Texte | émail `#F8F6EF`, gris d'étiquette `#AEB4BE` |
| Accent | un seul, l'orange du tampon `#F47A28` (foncé `#A9481A` sur papier) |
| Papier | `#F8F6EF` pour les dossiers de jeu et les pièces officielles |
| Titres | Big Shoulders Display 800 et 900 |
| Étiquettes, références, navigation | Sofia Sans Condensed 700 et 800 |
| Lecture | Sofia Sans 500 et 700 |

**Règles.**
- Pas de dégradé, pas de halo, pas d'animation décorative.
- Le tampon est réservé à un statut vrai aujourd'hui ; un seul par écran.
- Les pages du studio restent sobres. Une page de jeu peut être plus expressive : visuel officiel encadré comme un portrait, devise sur papier, galerie de captures.
- Mouvement : le tampon s'abat une fois sur l'accueil, les boutons s'enfoncent, les flèches glissent, les pages s'enchaînent par un fondu natif du navigateur. Tout est coupé si l'appareil demande de réduire les animations.

**Écart avec le canevas Design.** Sur téléphone, le canevas dessinait un bouton de menu. Le site affiche les trois liens directement sous le logo : un toucher de moins, et aucun JavaScript.

## 3. Structure éditoriale

- **Accueil** : logo et proposition (« We take silly things very seriously. »), quatre chiffres, le jeu sur le bureau, le règlement intérieur en quatre articles, le registre, le contact.
- **Page d'un jeu** : accroche et statut, devise, ce que fait le joueur en trois gestes, captures réelles, systèmes du jeu, bande-annonce, fiche, boutiques, assistance, confidentialité.
- **Espace presse** : présentations courte et longue du studio et du jeu, fiches, logos, visuel, captures, et la liste de ce qui n'existe pas encore.
- **Contact** : une adresse, trois guichets qui remplissent l'objet du message.

Rien d'inventé : pas d'équipe, pas de partenaires, pas de chiffres, pas de jeux futurs. La ligne suivante du registre est vide et le dit.

Tout ce qui est dit de Conepocalypse a été vérifié dans le jeu : sa spécification, son fichier de localisation (termes anglais officiels) et sa politique de confidentialité publiée.

## 4. Choix technique

**Astro, en génération statique.** Le site est éditorial : il n'a besoin ni de serveur, ni de base de données, ni de CMS.

| Besoin | Réponse |
|---|---|
| Performances | HTML et CSS seuls ; aucun JavaScript envoyé au navigateur |
| Médias | images converties en AVIF et WebP, en plusieurs largeurs, chargées à la demande |
| Deux langues | une vue par type de page, deux fichiers de textes de même structure, vérifiée au build |
| Référencement | canoniques, `hreflang`, plan du site, Open Graph, données structurées (Organization, WebSite, VideoGame) |
| Extension | un jeu est un fichier de données ; les pages en découlent |

Dépendances de production : `astro`, `@astrojs/sitemap`, `sharp`. Les autres (`subset-font`, `opentype.js`, `puppeteer-core`) ne servent qu'aux outils. `npm audit` : 0 vulnérabilité au 10/11/2026.

## 5. Hébergement

| Solution | Coût | Domaine racine avec le DNS Squarespace | Usage commercial | Verdict |
|---|---|---|---|---|
| **GitHub Pages** | gratuit | oui, par quatre enregistrements A | site vitrine admis ; pas de vente en ligne | **retenu** |
| Cloudflare Pages | gratuit | non : le domaine racine exige de confier le DNS à Cloudflare | admis | écarté pour l'instant |
| Vercel (compte existant) | gratuit en offre Hobby | oui | l'offre Hobby est réservée à l'usage non commercial | écarté |
| Netlify | gratuit avec crédits | oui | admis | possible, mais un compte de plus |

**Pourquoi GitHub Pages.**
- La politique de confidentialité y est déjà hébergée, sur le même compte : une seule plateforme à connaître.
- Le domaine est déjà vérifié pour ce compte GitHub.
- La bascule se limite à remplacer les enregistrements qui pointent aujourd'hui vers la page d'attente de Squarespace. Les serveurs DNS, le registrar et la messagerie ne changent pas.
- Aucun nouvel abonnement, aucun nouveau compte.

**Ce que ce choix coûte.**
- Pas d'en-têtes HTTP personnalisés. La politique de sécurité du contenu est posée par une balise `meta` ; `frame-ancestors` et HSTS ne peuvent pas l'être ainsi.
- Le dépôt du site est public (condition de l'offre gratuite).
- Les conditions de GitHub Pages excluent un site dont l'objet principal est la vente en ligne. Une boutique demanderait un autre hébergeur.

Le site ne dépend pas de l'hébergeur : `dist/` est un dossier de fichiers statiques. Passer plus tard à Cloudflare Pages demanderait de déplacer le DNS chez Cloudflare, donc de recréer les enregistrements de messagerie ; ce n'est pas justifié aujourd'hui.

## 6. Sécurité et données

- Aucun secret dans le dépôt, aucune clé dans les fichiers servis.
- Aucun script externe, aucune police chargée depuis un tiers, aucune mesure d'audience.
- Politique de sécurité du contenu : tout vient du site lui-même ; seule exception prévue, le lecteur `youtube-nocookie.com` pour une future bande-annonce.
- Aucun formulaire : le contact se fait par lien `mailto:`. Il n'y a donc ni traitement de données par le site, ni bandeau de consentement.
- Les mentions légales distinguent le site (aucun cookie ; l'hébergeur traite l'adresse IP pour servir les pages) et les jeux (politique propre à chaque jeu, à son adresse).

## 7. Bascule du domaine

À faire seulement avec l'accord de Nicolas. État du DNS relevé le 10/11/2026 (serveurs `nsc1` à `nsc4.squarespacedns.com`).

**Enregistrements à remplacer** (ils pointent vers la page d'attente de Squarespace) :

| Nom | Type | Valeur actuelle | Nouvelle valeur |
|---|---|---|---|
| `@` | A | `198.49.23.144`, `198.49.23.145`, `198.185.159.144`, `198.185.159.145` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `www` | CNAME | `ext-sq.squarespace.com` | `nicolasrel.github.io` |

Facultatif, pour IPv6 : quatre enregistrements AAAA sur `@`, `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

**Enregistrements à ne pas toucher** :

| Nom | Type | Rôle |
|---|---|---|
| `privacy` | CNAME vers `nicolasrel.github.io` | politique de confidentialité |
| `@` | MX `mxa.mailgun.org`, `mxb.mailgun.org` | réception du courrier |
| `@` | TXT `v=spf1 include:mailgun.org ~all` | SPF |
| `pic._domainkey` | TXT | DKIM |
| `_dmarc` | TXT `p=reject` | DMARC |
| `_github-pages-challenge-NicolasRel` | TXT | vérification du domaine par GitHub |
| `_domainconnect` | CNAME | service de Squarespace |

**Ordre des opérations.**
1. Sur GitHub, dans le dépôt du site : supprimer les variables `SITE_URL`, `BASE_PATH` et `PUBLIC_NOINDEX`.
2. Settings › Pages › Custom domain : saisir `oddlyofficialgames.com`. À partir de là, l'adresse de préproduction redirige vers le domaine.
3. Relancer le déploiement (Actions › Deploy › Run workflow).
4. Chez Squarespace, dans le DNS du domaine : remplacer les quatre A et le CNAME `www` selon le tableau. Dans l'interface, ils forment en général le groupe « Squarespace Defaults ».
5. Attendre la propagation (durée de vie actuelle : 4 heures), puis cocher « Enforce HTTPS » dans Settings › Pages dès que GitHub a émis le certificat.
6. Contrôler `https://oddlyofficialgames.com`, `https://www.oddlyofficialgames.com` (doit rediriger vers la racine) et `https://privacy.oddlyofficialgames.com`.

Entre l'étape 4 et l'émission du certificat, le domaine peut afficher une alerte HTTPS pendant quelques minutes à une heure.

**Retour arrière.** Chez Squarespace, remettre les quatre A et le CNAME `www` d'origine (ou réactiver le groupe « Squarespace Defaults ») ; la page d'attente revient après propagation. Sur GitHub, vider le champ Custom domain. Aucune de ces étapes ne touche à la messagerie ni au sous-domaine `privacy`.
