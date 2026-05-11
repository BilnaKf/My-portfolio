# Portfolio Moderne

Portfolio personnel responsive construit avec React, Vite et Tailwind CSS.

## Lancer le projet

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
```

Le dossier `dist` généré peut être déployé sur Vercel, Netlify ou tout hébergeur statique.

## Personnalisation

Les informations principales sont dans `src/data/portfolio.js` :

- nom, rôle, email et liens sociaux
- projets
- technologies utilisées
- lien du CV

Place ton vrai CV dans `public/cv.pdf` pour activer le bouton de téléchargement.

## Formulaire de contact

Le formulaire envoie les messages vers l’email configuré dans `src/data/portfolio.js` via FormSubmit.

Optionnel : pour conserver les demandes dans Supabase, crée la table avec `supabase/contact_messages.sql`, puis ajoute ces variables dans Vercel :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Le premier envoi FormSubmit peut demander une confirmation par email.
