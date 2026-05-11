import {
  AlertCircle,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle,
  Code2,
  Download,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  Menu,
  Palette,
  Rocket,
  Send,
  Smartphone,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile, projects, skills } from './data/portfolio';

const navItems = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'Projets', href: '#projets' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Processus', href: '#processus' },
  { label: 'Contact', href: '#contact' },
];

const processSteps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Idée',
    text: 'Je clarifie le besoin, l’objectif du projet et les fonctionnalités vraiment utiles.',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design',
    text: 'Je prépare une interface claire, moderne et cohérente avec l’image du projet.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Développement',
    text: 'Je construis le site ou l’application avec un code propre, maintenable et responsive.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Déploiement',
    text: 'Je vérifie, optimise et prépare la mise en ligne sur Vercel, Netlify ou mobile.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  const closeMenu = () => setMenuOpen(false);

  useScrollReveal();

  return (
    <div className="page-shell min-h-screen text-ink">
      <ScrollDecor progress={scrollProgress} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
}

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function ScrollDecor({ progress }) {
  const y = (start, end) => start + (end - start) * progress;
  const rotate = (start, end) => start + (end - start) * progress;

  return (
    <div className="scroll-decor" aria-hidden="true">
      <div
        className="decor-code-panel decor-code-left"
        style={{
          transform: `translate3d(0, ${y(-35, 80)}px, 0) rotate(${rotate(-5, 4)}deg)`,
        }}
      >
        <span>portfolio.jsx</span>
        <code>const stack = ['React', 'Flutter'];</code>
        <code>deploy.to('vercel');</code>
        <code>ui.motion.scroll();</code>
      </div>

      <div
        className="decor-notebook"
        style={{
          transform: `translate3d(0, ${y(65, -85)}px, 0) rotate(${rotate(8, -7)}deg)`,
        }}
      >
        <div className="decor-notebook-rings">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="decor-notebook-lines">
          <span />
          <span />
          <span />
          <strong>Build. Ship. Iterate.</strong>
        </div>
      </div>

      <div
        className="decor-code-panel decor-code-right"
        style={{
          transform: `translate3d(0, ${y(90, -45)}px, 0) rotate(${rotate(6, -5)}deg)`,
        }}
      >
        <span>app.ts</span>
        <code>await supabase.auth.signIn();</code>
        <code>query.invalidate();</code>
        <code>mobile.publishSoon();</code>
      </div>
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, closeMenu }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#accueil" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-sm font-bold text-ink shadow-lg shadow-cyan-500/10">
            {profile.name.slice(0, 1)}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">{profile.name}</span>
            <span className="block text-xs text-slate-400">{profile.role}</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="icon-button md:hidden"
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-5 py-3 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-1">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="mobile-nav-link" onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="accueil" className="section pt-32 sm:pt-36">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="animate-rise">
          <p className="eyebrow">Portfolio personnel</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Je transforme des idées en produits web et mobiles prêts à convaincre.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{profile.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="proof-pill">
              <BadgeCheck size={16} />
              React, Flutter, Supabase
            </span>
            <span className="proof-pill">
              <BadgeCheck size={16} />
              Web, mobile et déploiement
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projets" className="primary-button">
              Voir mes projets
              <ArrowUpRight size={18} />
            </a>
            <a href={profile.cvUrl} className="secondary-button" download>
              Télécharger mon CV
              <Download size={18} />
            </a>
          </div>
        </div>

        <div className="hero-panel animate-rise delay-150">
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <div>
              <p className="text-sm text-white/60">Disponible pour</p>
              <p className="mt-1 font-semibold text-white">Sites web, apps et interfaces</p>
            </div>
            <span className="status-dot" aria-hidden="true" />
          </div>
          <div className="grid gap-4 pt-6">
            <Metric value="3" label="Projets concrets" />
            <Metric value="Mobile" label="React Native et Flutter" />
            <Metric value="Cloud" label="Supabase et Vercel" />
          </div>
          <FloatingNotebook />
        </div>
      </div>
    </section>
  );
}

function FloatingNotebook() {
  const codeLines = [
    'const product = build("premium");',
    'await deploy({ web: true, mobile: true });',
    'return experience.clean();',
  ];

  return (
    <div className="notebook-card" aria-hidden="true">
      <div className="notebook-topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="code-stream">
        {codeLines.map((line) => (
          <code key={line}>{line}</code>
        ))}
      </div>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="metric-card">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function About() {
  return (
    <section id="a-propos" className="section scroll-mt-24">
      <div className="section-heading reveal">
        <p className="eyebrow">À propos</p>
        <h2>Un profil orienté produit, interface et résultat.</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="feature-card reveal lg:col-span-2">
          <h3>Qui suis-je ?</h3>
          <p>
            Remplacez ce texte par une présentation courte : votre parcours, votre manière de
            travailler, les types de projets que vous aimez construire et ce que vous apportez à un
            client ou à une équipe.
          </p>
        </div>
        <div className="feature-card reveal">
          <h3>Approche</h3>
          <p>
            Interfaces claires, code structuré, attention au détail et priorité donnée à
            l’expérience utilisateur sur mobile comme sur desktop.
          </p>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projets" className="section scroll-mt-24">
      <div className="section-heading reveal">
        <p className="eyebrow">Projets</p>
        <h2>Des réalisations concrètes, entre web et mobile.</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article className="project-card reveal" key={project.title}>
            <div className={`project-visual visual-${index}`}>
              <span>{project.category}</span>
              {index === 0 ? <Code2 size={46} /> : <Smartphone size={46} />}
              <div className="code-rain" aria-hidden="true">
                <small>{index === 0 ? '<Booking />' : 'useMobileApp()'}</small>
                <small>{index === 2 ? 'balance.split()' : 'supabase.auth()'}</small>
                <small>{index === 0 ? 'deploy.vercel()' : 'notify.push()'}</small>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <span className="project-status">{project.status}</span>
              <h3>{project.title}</h3>
              <strong className="project-highlight">{project.highlight}</strong>
              <div className="project-utility">
                <span>Utilité</span>
                <p>{project.utility}</p>
              </div>
              <p>{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span className="tech-pill" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a href={project.liveUrl} className="primary-button small" target="_blank" rel="noreferrer">
                    Voir le site
                    <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <span className="disabled-button">Démo disponible sur demande</span>
                )}
                {project.codeUrl ? (
                  <a href={project.codeUrl} className="secondary-button small" target="_blank" rel="noreferrer">
                    Voir le code
                    <Github size={17} />
                  </a>
                ) : (
                  <span className="secondary-button small muted-button">
                    Voir le code
                    <Github size={17} />
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="competences" className="section scroll-mt-24">
      <div className="section-heading reveal">
        <p className="eyebrow">Compétences</p>
        <h2>Les outils principaux pour construire des produits web modernes.</h2>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <span className="skill-item reveal" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="processus" className="section scroll-mt-24">
      <div className="section-heading reveal">
        <p className="eyebrow">Processus</p>
        <h2>Une méthode simple pour passer de l’idée au produit.</h2>
      </div>
      <div className="process-grid">
        {processSteps.map(({ number, icon: Icon, title, text }, index) => (
          <article className={`process-card process-card-${index} reveal`} key={title}>
            <strong>{number}</strong>
            <span>
              <Icon size={22} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      marketingConsent: formData.get('marketing_consent') === 'on',
    };

    setSubmitState('sending');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const error = new Error('Le message n’a pas pu être envoyé.');
        error.code = errorPayload.code;
        throw error;
      }

      form.reset();
      setSubmitState('success');
      setSubmitMessage('Votre demande a bien été envoyée. Je vous répondrai rapidement.');
    } catch (error) {
      console.warn(error);
      setSubmitState('error');
      if (error.code === 'missing_resend_key') {
        setSubmitMessage('La clé Resend n’est pas encore configurée dans Vercel.');
      } else if (error.code === 'resend_failed') {
        setSubmitMessage('L’envoi email est bloqué côté Resend. Vérifiez la clé API ou l’adresse expéditeur.');
      } else {
        setSubmitMessage('Une erreur est survenue. Vous pouvez aussi me contacter directement par email.');
      }
    }
  };

  return (
    <section id="contact" className="section scroll-mt-24 pb-24">
      <div className="contact-panel reveal">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Parlons de votre prochain projet.</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Une idée de site, d’application ou d’interface à concrétiser ? Vous pouvez me contacter
            directement par email ou via mes profils professionnels.
          </p>
        </div>
        <div className="contact-layout">
          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <label>
              Nom
              <input type="text" name="name" placeholder="Votre nom" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="votre@email.com" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" placeholder="Décrivez votre projet..." required />
            </label>
            <label className="consent-row">
              <input type="checkbox" name="marketing_consent" />
              <span>J’accepte d’être recontacté par email pour ce projet ou de futures opportunités.</span>
            </label>
            <button className="primary-button" type="submit" disabled={submitState === 'sending'}>
              <Send size={17} />
              {submitState === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
            {submitMessage && (
              <p className={`form-feedback ${submitState === 'success' ? 'success' : 'error'}`}>
                {submitState === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {submitMessage}
              </p>
            )}
          </form>

          <div className="contact-links">
            <a href={`mailto:${profile.email}`} className="contact-link">
              <Mail size={19} />
              {profile.email}
            </a>
            <a href={profile.linkedin} className="contact-link" target="_blank" rel="noreferrer">
              <Linkedin size={19} />
              LinkedIn
            </a>
            <a href={profile.github} className="contact-link" target="_blank" rel="noreferrer">
              <Github size={19} />
              GitHub
            </a>
            <a href={profile.cvUrl} className="contact-link" download>
              <Download size={19} />
              Télécharger mon CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950 px-5 py-7">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. Tous droits réservés.</p>
        <p>Construit avec React, Tailwind CSS et Vite.</p>
      </div>
    </footer>
  );
}

export default App;
