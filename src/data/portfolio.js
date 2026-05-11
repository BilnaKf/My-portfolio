// Modifie ce fichier pour personnaliser rapidement ton portfolio.
export const profile = {
  name: 'Nabil Belkharraf',
  role: 'Développeur Web & Application',
  intro:
    'Je conçois des interfaces modernes, performantes et faciles à utiliser, du site vitrine à l’application complète.',
  location: 'France',
  email: 'contact.devnabil@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nabil-belkharraf/',
  github: 'https://github.com/BilnaKf',
  cvUrl: '/cv.pdf',
};

export const projects = [
  {
    title: 'WCB Coiffure',
    description:
      'Site vitrine premium pour un salon de coiffure masculin à Reims, avec identité visuelle moderne, parcours de réservation et espace d’administration.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel'],
    status: 'Projet en ligne',
    category: 'Site web',
    highlight: 'Réservation, administration et identité premium',
    utility:
      'Permet au salon de présenter ses prestations, rassurer les clients et centraliser les demandes de rendez-vous.',
    liveUrl: 'https://wcbcoiffure.vercel.app/',
    codeUrl: '',
  },
  {
    title: 'Skillink',
    description:
      'Application mobile production-ready construite autour d’une architecture Expo, avec authentification, profils, notifications, stockage et backend Supabase.',
    technologies: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'Zustand'],
    status: 'Application en cours de publication',
    category: 'Application mobile',
    highlight: 'Architecture mobile complète avec backend Supabase',
    utility:
      'Aide les utilisateurs à créer des connexions professionnelles ou de service via une application mobile structurée, sécurisée et évolutive.',
    liveUrl: '',
    codeUrl: '',
  },
  {
    title: 'Splitly',
    description:
      'Application mobile pour gérer les dépenses partagées, calculer les soldes instantanément et simplifier les remboursements dans un groupe.',
    technologies: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'RLS'],
    status: 'Démo disponible sur demande',
    category: 'Application mobile',
    highlight: 'Calcul des soldes, groupes et remboursements simplifiés',
    utility:
      'Simplifie les dépenses de groupe en indiquant automatiquement qui doit combien, à qui, et comment rembourser avec le moins de transactions possible.',
    liveUrl: '',
    codeUrl: '',
  },
];

export const skills = [
  'React',
  'JavaScript',
  'TypeScript',
  'React Native',
  'Flutter',
  'Dart',
  'Tailwind CSS',
  'Responsive Design',
  'Supabase',
  'Git / GitHub',
  'Vercel',
  'Netlify',
];
