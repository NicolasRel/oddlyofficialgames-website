import type { Game } from './types';
import president from '../../assets/games/conepocalypse/president.jpg';
import shot01 from '../../assets/games/conepocalypse/shot-01-parking.jpg';
import shot02 from '../../assets/games/conepocalypse/shot-02-town-night.jpg';
import shot03 from '../../assets/games/conepocalypse/shot-03-cones-laid.jpg';
import shot04 from '../../assets/games/conepocalypse/shot-04-department.jpg';
import shot05 from '../../assets/games/conepocalypse/shot-05-country.jpg';
import shot06 from '../../assets/games/conepocalypse/shot-06-continent.jpg';

// Everything said here must be true of the game as it exists today.
// Sources: the game's design spec, its localization file and its published privacy policy.
export const conepocalypse: Game = {
  id: 'conepocalypse',
  number: '001',
  title: 'Conepocalypse',
  status: 'in-development',
  platforms: ['iOS (iPhone)', 'Android'],
  stores: { appStore: null, googlePlay: null },
  trailer: null,
  privacyUrl: 'https://privacy.oddlyofficialgames.com',
  supportEmail: 'contact@oddlyofficialgames.com',
  keyArt: president,
  keyArtDownload: '/press/conepocalypse/conepocalypse-key-art-the-president.png',
  ogImage: { en: '/og/conepocalypse-en.png', fr: '/og/conepocalypse-fr.png' },
  screenshots: [
    {
      image: shot01,
      download: '/press/conepocalypse/conepocalypse-screenshot-01.jpg',
      alt: {
        en: 'Game screenshot: the parking space. A row of cones closes a street, stamped “Delivered”.',
        fr: 'Capture du jeu : la place de parking. Une rangée de cônes ferme une rue, tamponnée « Livré ».',
      },
    },
    {
      image: shot02,
      download: '/press/conepocalypse/conepocalypse-screenshot-02.jpg',
      alt: {
        en: 'Game screenshot: the town at night. Cones gather in the lit yard of the workshop.',
        fr: 'Capture du jeu : la ville, de nuit. Les cônes se rassemblent dans la cour éclairée de l’atelier.',
      },
    },
    {
      image: shot03,
      download: '/press/conepocalypse/conepocalypse-screenshot-03.jpg',
      alt: {
        en: 'Game screenshot: dozens of cones laid on a closed exit, with the report of cones laid during the absence.',
        fr: 'Capture du jeu : des dizaines de cônes posés sur une sortie fermée, avec le rapport des cônes posés pendant l’absence.',
      },
    },
    {
      image: shot04,
      download: '/press/conepocalypse/conepocalypse-screenshot-04.jpg',
      alt: {
        en: 'Game screenshot: the department. A busy road, a branch office and three worksites awaiting cones.',
        fr: 'Capture du jeu : le département. Une route chargée, une antenne du Bureau et trois chantiers en attente de cônes.',
      },
    },
    {
      image: shot05,
      download: '/press/conepocalypse/conepocalypse-screenshot-05.jpg',
      alt: {
        en: 'Game screenshot: the country. A branch office on the coast, near a lighthouse.',
        fr: 'Capture du jeu : le pays. Une antenne du Bureau sur le littoral, près d’un phare.',
      },
    },
    {
      image: shot06,
      download: '/press/conepocalypse/conepocalypse-screenshot-06.jpg',
      alt: {
        en: 'Game screenshot: the continent at night, with a cross-border compliance corridor.',
        fr: 'Capture du jeu : le continent, de nuit, avec un corridor de conformité transfrontalier.',
      },
    },
  ],
  copy: {
    en: {
      metaTitle: 'Conepocalypse — mobile incremental game of administrative satire',
      metaDescription:
        'Conepocalypse is a mobile incremental (idle) game for iOS and Android. Run the Bureau of Permanently Temporary Works and close the roads, one cone at a time.',
      genreLine: 'Mobile incremental · iOS & Android',
      kicker: 'File No. 001 · C.O.N.E. approval · Standard NE-01',
      promise: ['One cone. One parking space.', 'Then nobody gets through.'],
      pitch:
        'A mobile incremental game of solemn administrative satire. You run the Bureau of Permanently Temporary Works, mobilize an army of very conscientious traffic cones, and extend your jurisdiction one closed road at a time.',
      cardPitch:
        'You run the Bureau of Permanently Temporary Works. It starts with a single traffic cone on parking space No. 4. It does not stop there.',
      statusNote: 'iPhone and Android. Closed beta in progress. Not on the stores yet.',
      quote: {
        source: 'C.O.N.E. — Commission for Obstruction Normalization & Enforcement · Official motto',
        text: '“A closed road is a compliant road.”',
      },
      portrait: {
        title: 'Cone 01 · “The President”',
        label: 'Official portrait',
        alt: 'Official portrait of Cone 01: a traffic cone with a furrowed brow, hand on heart, standing in front of a monumental STOP sign.',
      },
      stepsTitle: 'What you actually do',
      steps: [
        {
          title: 'Mobilize',
          text: 'Tap or hold MOBILIZE. Cones leave the workshop and walk to the worksites, where they stand with great conviction.',
        },
        {
          title: 'Decide',
          text: 'Every worksite awaits your ruling: Open, Diversion or Closed. Detours are what funds the Bureau, and a road user with no route left brings in nothing.',
        },
        {
          title: 'Expand',
          text: 'Deliver the works and the next jurisdiction opens: the parking space, the town, the department, the country, the continent. There are eight. The last ones are not reasonable.',
        },
      ],
      featuresTitle: 'The administration at work',
      features: [
        {
          title: 'Upgrades and research',
          text: 'Manufacturing, laying crews, billing. Research studies whose effects compound. The workshop keeps making cones without you.',
        },
        {
          title: 'Public tenders',
          text: 'Each tender won multiplies a territory’s subsidies, then resets its local accounts, as procedure requires.',
        },
        {
          title: 'The Wire',
          text: 'The Bureau’s news wire reports events, decrees and certified weather bulletins with complete seriousness.',
        },
        {
          title: 'The Standby Office',
          text: 'It covers your absence, then hands you a report when you return: cones laid, works delivered, time lost.',
        },
        {
          title: 'A career at the Bureau',
          text: 'Fifteen grades, from Trainee Marking Agent to Director of Obstructions, with a daily agenda and a Convention every week.',
        },
        {
          title: 'General Reorganization',
          text: 'Always voluntary. The Bureau starts over, bigger, and keeps its Derogations.',
        },
      ],
      galleryNote:
        'Real captures of the game, November 2026. French interface shown; the game is playable in English and French.',
      facts: [
        { label: 'Developer', value: 'Oddly Official Games' },
        { label: 'Genre', value: 'Incremental (idle), portrait' },
        { label: 'Platforms', value: 'iOS (iPhone), Android' },
        { label: 'Languages', value: 'English, French' },
        { label: 'Engine', value: 'Unity' },
        { label: 'Status', value: 'In development · closed beta' },
        { label: 'Release date', value: 'Not announced' },
      ],
      pressShort:
        'Conepocalypse is a mobile incremental game of solemn administrative satire, in development for iOS and Android. The player runs the Bureau of Permanently Temporary Works and closes the roads of eight nested jurisdictions, starting with a single traffic cone on a parking space.',
      pressLong: [
        'In Conepocalypse, the player directs the Bureau of Permanently Temporary Works under the authority of the C.O.N.E., the Commission for Obstruction Normalization & Enforcement, whose motto is “A closed road is a compliant road.” Everything begins with Cone 01 and parking space No. 4.',
        'The player mobilizes cones, opens worksites and rules on each street: open, diverted or closed. Detours are what pays the Bureau, so a network where nobody can pass earns nothing: the joke is also the rule. Upgrades, research, public tenders and a voluntary General Reorganization extend the administration across eight jurisdictions, each one containing the last.',
        'The tone is deadpan. The institution never notices the absurdity of its mission, and neither do the cones, who are sincerely trying to help. The game is played in portrait, in English or French. It is currently in closed beta; no release date has been announced.',
      ],
      supportText: 'A question, a bug, a cone behaving without authorization? Write to',
      privacyText: 'The official privacy policy of Conepocalypse is published, in English and French, at',
    },
    fr: {
      metaTitle: 'Conepocalypse — jeu mobile incrémental, satire administrative',
      metaDescription:
        'Conepocalypse, jeu mobile incrémental (idle) pour iOS et Android. Dirigez le Bureau des Travaux Définitivement Provisoires et fermez les routes, cône après cône.',
      genreLine: 'Jeu mobile incrémental · iOS et Android',
      kicker: 'Dossier n° 001 · Visa C.O.N.E. · Norme NE-01',
      promise: ['Un cône. Une place de parking.', 'Puis plus personne ne passe.'],
      pitch:
        'Un jeu mobile incrémental, satire administrative d’un sérieux absolu. Vous dirigez le Bureau des Travaux Définitivement Provisoires, mobilisez une armée de cônes de chantier très consciencieux, et étendez votre juridiction, une route fermée après l’autre.',
      cardPitch:
        'Vous dirigez le Bureau des Travaux Définitivement Provisoires. Tout commence par un seul cône de chantier, sur la place de parking n° 4. Cela ne s’arrête pas là.',
      statusNote: 'iPhone et Android. Bêta fermée en cours. Pas encore sur les stores.',
      quote: {
        source: 'C.O.N.E. — Commission Officielle de Normalisation des Entraves · Devise officielle',
        text: '« Une route fermée est une route conforme. »',
      },
      portrait: {
        title: 'Cône 01 · « Le Président »',
        label: 'Portrait officiel',
        alt: 'Portrait officiel de Cône 01 : un cône de chantier aux sourcils froncés, la main sur le cœur, devant un panneau STOP monumental.',
      },
      stepsTitle: 'Ce que vous faites, concrètement',
      steps: [
        {
          title: 'Mobiliser',
          text: 'Touchez ou maintenez MOBILISER. Les cônes quittent l’atelier et rejoignent les chantiers à pied, où ils se tiennent avec une grande conviction.',
        },
        {
          title: 'Décider',
          text: 'Chaque chantier attend votre décision : Ouvert, Déviation ou Fermé. Ce sont les détours qui financent le Bureau, et un usager sans chemin ne rapporte rien.',
        },
        {
          title: 'S’étendre',
          text: 'Livrez les chantiers et la juridiction suivante s’ouvre : la place de parking, la ville, le département, le pays, le continent. Il y en a huit. Les dernières ne sont pas raisonnables.',
        },
      ],
      featuresTitle: 'L’administration au travail',
      features: [
        {
          title: 'Améliorations et recherches',
          text: 'Fabrication, équipes de pose, facturation. Des études dont les effets se composent. L’atelier continue de fabriquer des cônes sans vous.',
        },
        {
          title: 'Marchés publics',
          text: 'Chaque marché remporté multiplie les subventions d’un territoire, puis remet ses comptes locaux à zéro, comme le veut la procédure.',
        },
        {
          title: 'Le Fil',
          text: 'Le fil d’actualités du Bureau rapporte événements, décrets et bulletins météo certifiés avec le plus grand sérieux.',
        },
        {
          title: 'Le Bureau des Permanences',
          text: 'Il couvre votre absence, puis vous remet un rapport à votre retour : cônes posés, chantiers livrés, temps perdu.',
        },
        {
          title: 'Une carrière au Bureau',
          text: 'Quinze grades, d’Agent stagiaire de balisage à Directeur des entraves, avec un ordre du jour quotidien et une Convention chaque semaine.',
        },
        {
          title: 'Réorganisation générale',
          text: 'Toujours volontaire. Le Bureau recommence, en plus grand, et conserve ses Dérogations.',
        },
      ],
      galleryNote: 'Captures réelles du jeu, novembre 2026. Le jeu se joue en français et en anglais.',
      facts: [
        { label: 'Développeur', value: 'Oddly Official Games' },
        { label: 'Genre', value: 'Incrémental (idle), en portrait' },
        { label: 'Plateformes', value: 'iOS (iPhone), Android' },
        { label: 'Langues', value: 'Français, anglais' },
        { label: 'Moteur', value: 'Unity' },
        { label: 'Statut', value: 'En développement · bêta fermée' },
        { label: 'Date de sortie', value: 'Non annoncée' },
      ],
      pressShort:
        'Conepocalypse est un jeu mobile incrémental, satire administrative d’un sérieux absolu, en développement pour iOS et Android. Le joueur dirige le Bureau des Travaux Définitivement Provisoires et ferme les routes de huit juridictions imbriquées, à partir d’un seul cône de chantier posé sur une place de parking.',
      pressLong: [
        'Dans Conepocalypse, le joueur dirige le Bureau des Travaux Définitivement Provisoires, sous l’autorité de la C.O.N.E., la Commission Officielle de Normalisation des Entraves, dont la devise est « Une route fermée est une route conforme. » Tout commence avec Cône 01 et la place de parking n° 4.',
        'Le joueur mobilise des cônes, ouvre des chantiers et statue sur chaque rue : ouverte, déviée ou fermée. Ce sont les détours qui financent le Bureau ; un réseau où plus personne ne passe ne rapporte donc rien. La blague est aussi la règle. Améliorations, recherches, marchés publics et Réorganisation générale, toujours volontaire, étendent l’administration à huit juridictions, chacune contenant la précédente.',
        'Le ton est pince-sans-rire. L’institution ne voit jamais l’absurdité de sa mission, pas plus que les cônes, sincèrement persuadés de rendre service. Le jeu se joue en portrait, en français ou en anglais. Il est actuellement en bêta fermée ; aucune date de sortie n’est annoncée.',
      ],
      supportText: 'Une question, un bug, un cône qui agit sans autorisation ? Écrivez à',
      privacyText: 'La politique de confidentialité officielle de Conepocalypse est publiée, en français et en anglais, à l’adresse',
    },
  },
};
