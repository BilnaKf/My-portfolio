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

Le formulaire envoie les messages sans redirection via la route Vercel `api/contact.js`.

Pour recevoir les emails, ajoute dans Vercel :

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Pour conserver les demandes dans Supabase, crée la table avec `supabase/contact_messages.sql`, puis ajoute aussi :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

`SUPABASE_SERVICE_ROLE_KEY` doit rester uniquement côté Vercel, jamais dans le code public.
