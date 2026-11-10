# Site officiel d'Oddly Official Games

Le site vitrine du studio, publié à l'adresse `https://oddlyofficialgames.com`. Il est statique, bilingue (anglais à la racine, français sous `/fr/`), sans cookies, sans traceurs et sans JavaScript exécuté dans le navigateur.

Ce dépôt ne contient que le site. Le jeu Conepocalypse a son propre dépôt, et la politique de confidentialité du jeu aussi (voir « Politique de confidentialité » plus bas).

## Démarrer

Il faut Node.js 22.23 ou plus récent.

```bash
npm install
```

```bash
npm run dev
```

Le site s'ouvre sur `http://localhost:4321`. Les changements s'affichent à l'enregistrement.

| Commande | Effet |
|---|---|
| `npm run dev` | site en local, rechargé à chaque changement |
| `npm run build` | construit le site dans `dist/` |
| `npm run preview` | sert `dist/` en local, comme en production |
| `npm run check` | contrôle le site construit : liens, ancres, versions de langue, balises, textes alternatifs, lien vers la politique de confidentialité |
| `npm run fonts` | refait les polices web à partir de `assets-src/fonts/` |
| `npm run og` | refait le logo vectoriel, les favicons et les images de partage |

## Où se trouve quoi

| Dossier ou fichier | Contenu |
|---|---|
| `src/i18n/en.ts`, `src/i18n/fr.ts` | tous les textes du site, hors fiches des jeux |
| `src/i18n/routes.mjs` | la liste des pages et leur adresse dans chaque langue |
| `src/data/games/` | le catalogue : un fichier par jeu, et la liste dans `index.ts` |
| `src/data/site.ts` | nom, adresse de contact, éditeur, hébergeur, date des mentions légales |
| `src/assets/games/<jeu>/` | visuel et captures de chaque jeu (optimisés au build) |
| `public/press/` | fichiers téléchargeables de l'espace presse |
| `src/views/` | une vue par type de page, commune aux deux langues |
| `src/pages/` | une page par adresse ; chaque fichier appelle une vue avec sa langue |
| `src/components/` | en-tête, pied de page, logo, tampon, carte de jeu, registre |
| `src/styles/global.css` | toute la feuille de style |
| `scripts/` | outils : polices, marque, contrôle, captures, Lighthouse |
| `docs/` | décisions de conception et rapport de qualité |

## Modifier un texte

1. Ouvrir `src/i18n/en.ts` et chercher la phrase.
2. La modifier, puis faire la même chose à la même clé dans `src/i18n/fr.ts`.

Les deux fichiers ont la même structure. Une clé présente dans l'un et absente de l'autre fait échouer `npm run build` : une page ne peut pas rester à moitié traduite.

En français, écrire une espace ordinaire avant `: ; ? !` et à l'intérieur des guillemets `« »`. Le site les rend insécables à l'affichage.

Les textes d'un jeu (accroche, étapes, fiche, présentation presse) sont dans son fichier, par exemple `src/data/games/conepocalypse.ts`, sous `copy.en` et `copy.fr`.

## Ajouter un jeu

1. Copier `src/data/games/conepocalypse.ts` sous le nom du nouveau jeu, par exemple `mon-jeu.ts`. Changer `id` (c'est aussi l'adresse : `/games/mon-jeu/` et `/fr/jeux/mon-jeu/`), `number`, `title`, puis les textes des deux langues.
2. Déposer le visuel et les captures dans `src/assets/games/mon-jeu/`, et les importer en tête du fichier.
3. Déposer les fichiers offerts à la presse dans `public/press/mon-jeu/`, et renseigner `keyArtDownload` et le champ `download` de chaque capture.
4. Ajouter le jeu à la liste de `src/data/games/index.ts`.
5. Ajouter son image de partage : une ligne `gameCard(...)` à la fin de `scripts/build-brand.mjs`, puis `npm run og`.

Le catalogue, l'accueil, le registre, l'espace presse, le pied de page, le plan du site et les deux pages du jeu se mettent à jour seuls.

Ne renseigner que ce qui est vrai aujourd'hui. Un champ laissé à `null` (boutiques, bande-annonce) affiche un état honnête : « pas encore référencé », « en attente de visa ».

## Ajouter ou remplacer des captures

1. Déposer l'image dans `src/assets/games/<jeu>/` (JPG ou PNG, portrait).
2. Dans le fichier du jeu, l'importer et l'ajouter à `screenshots` avec un texte alternatif dans les deux langues.
3. Copier le même fichier dans `public/press/<jeu>/` et indiquer son chemin dans `download`.

N'utiliser que de vraies captures du jeu. Si l'interface montrée n'est pas dans la langue de la page, le dire dans `galleryNote`.

## Ajouter une bande-annonce

Dans le fichier du jeu, remplacer `trailer: null` par l'une des deux formes :

```ts
trailer: { youtubeId: 'XXXXXXXXXXX' },
```

```ts
trailer: { file: '/press/conepocalypse/trailer.mp4', poster: '/press/conepocalypse/trailer.jpg' },
```

La première affiche le lecteur YouTube sans cookies (`youtube-nocookie.com`), déjà autorisé par la politique de sécurité du site. La seconde lit un fichier déposé dans `public/`. Retirer ensuite la ligne « Bande-annonce » de `press.missing` dans les deux fichiers de textes.

## Mettre à jour les liens App Store et Google Play

Dans le fichier du jeu :

```ts
stores: { appStore: 'https://apps.apple.com/app/idXXXXXXXXX', googlePlay: 'https://play.google.com/store/apps/details?id=com.oddlyofficialgames.conepocalypse' },
```

Les boutons de la page du jeu et la fiche de l'espace presse deviennent des liens. Mettre à jour en même temps `status`, `statusNote` et les lignes « Statut » et « Date de sortie » de `facts`, dans les deux langues, puis retirer la ligne « Fiches des boutiques » de `press.missing`.

## Mettre à jour les pages de présentation

| Page | Texte | Mise en page |
|---|---|---|
| Accueil | `home` dans `src/i18n/*.ts` | `src/views/HomeView.astro` |
| Registre des jeux | `games`, `register` | `src/views/GamesView.astro` |
| Page d'un jeu | fichier du jeu, et `game` pour les intitulés communs | `src/views/GameView.astro` |
| Espace presse | `press`, et `pressShort`, `pressLong` du jeu | `src/views/PressView.astro` |
| Contact | `contact` | `src/views/ContactView.astro` |
| Mentions légales | `legal`, et `src/data/site.ts` | `src/views/LegalView.astro` |

Après un changement des mentions légales, mettre à jour `legalUpdated` dans `src/data/site.ts`.

Pour ajouter une page : une ligne dans `src/i18n/routes.mjs`, une vue dans `src/views/`, et un fichier par langue dans `src/pages/`.

## Publier

Le site est publié par GitHub Pages. Chaque `git push` sur `main` lance `.github/workflows/deploy.yml`, qui construit le site, le contrôle (`npm run check`) et le met en ligne. Un contrôle en échec bloque la publication.

Avant de pousser :

```bash
npm run build
```

```bash
npm run check
```

**Production.** Aucun réglage : sans variable, le site est construit pour `https://oddlyofficialgames.com`.

**Préproduction.** Tant que le domaine n'est pas branché, le site est servi à l'adresse du projet, `https://nicolasrel.github.io/oddlyofficialgames-website/` (dépôt public, GitHub Pages en mode « GitHub Actions »). Trois variables du dépôt (Settings › Secrets and variables › Actions › Variables) règlent ce mode :

| Variable | Valeur |
|---|---|
| `SITE_URL` | `https://nicolasrel.github.io` |
| `BASE_PATH` | `/oddlyofficialgames-website/` |
| `PUBLIC_NOINDEX` | `1` (demande aux moteurs de ne pas indexer) |

**Bascule vers le domaine.** Supprimer les trois variables, indiquer `oddlyofficialgames.com` dans Settings › Pages › Custom domain, relancer le déploiement, puis modifier le DNS. La procédure complète, avec le retour arrière, est dans `docs/DECISIONS.md`, section « Bascule du domaine ».

## Politique de confidentialité

La politique de confidentialité de Conepocalypse n'est pas dans ce dépôt et ne doit pas y entrer.

- Adresse officielle : `https://privacy.oddlyofficialgames.com`
- Dépôt responsable : `NicolasRel/oddlyofficialgames-legal` (GitHub Pages, branche `main`, fichier `index.html`)
- Le site y renvoie depuis la page du jeu, l'espace presse, les mentions légales et le pied de page. L'adresse est dans le champ `privacyUrl` du jeu.

`npm run check` échoue si une page ne contient plus ce lien. Le site ne publie aucune autre politique de confidentialité pour le jeu.

## Marque

Le logo (cocarde, « ODDLY », tampon « OFFICIAL », « GAMES ») est celui de l'écran d'entrée du studio dans Conepocalypse. `scripts/build-brand.mjs` le reproduit en tracés vectoriels, aux mêmes mesures et aux mêmes couleurs. Ne pas le redessiner ici.

Le portrait « Le Président » est le visuel officiel de Conepocalypse. Il est utilisé tel quel, seulement redimensionné.

Polices : Big Shoulders Display, Sofia Sans et Sofia Sans Condensed, sous licence SIL Open Font License 1.1 (textes dans `public/fonts/`).

## Droits

Le code, les textes et les visuels de ce dépôt appartiennent à Oddly Official Games. Tous droits réservés. Les polices restent sous leur licence d'origine.
