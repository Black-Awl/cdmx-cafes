# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## AI Notes
Create translation files in src/locales/ for each language. For example:

{
  "site": {
    "title": "CDMX Cafes",
    "description": "Discover the best coffee spots in Mexico City!"
  },
  "nav": {
    "home": "Home",
    "cafes": "Cafes",
    "about": "About"
  }
}

{
  "site": {
    "title": "Cafés CDMX",
    "description": "¡Descubre los mejores lugares de café en la Ciudad de México!"
  },
  "nav": {
    "home": "Inicio",
    "cafes": "Cafés",
    "about": "Acerca de"
  }
}

Update your components to use the translations. For example, in your Navigation component:

---
import { t } from "astro-i18n-aut";

const navItems = [
  { name: t("nav.home"), url: "/" },
  { name: t("nav.cafes"), url: "/cafes" },
  { name: t("nav.about"), url: "/about" },
];
---

<nav class="bg-base-200">
  <div class="container mx-auto px-4">
    <ul class="menu menu-horizontal">
      {navItems.map((item) => (
        <li><a href={item.url}>{item.name}</a></li>
      ))}
    </ul>
  </div>
</nav>

Add a language switcher component:
---
import { getLanguageFromURL, useTranslations } from "astro-i18n-aut";

const lang = getLanguageFromURL(Astro.url.pathname);
const t = useTranslations(lang);

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];
---

<div class="dropdown dropdown-end">
  <label tabindex="0" class="btn m-1">{lang.toUpperCase()}</label>
  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    {languages.map((language) => (
      <li>
        <a href={`/${language.code}${Astro.url.pathname.replace(/^\/[a-z]{2}/, '')}`}>
          {language.name}
        </a>
      </li>
    ))}
  </ul>
</div>

Add the LanguageSwitcher to your Header or Navigation component.
7. Update your MainLayout.astro to use the correct language:

---
import { getLanguageFromURL, useTranslations } from "astro-i18n-aut";
// ... other imports

const lang = getLanguageFromURL(Astro.url.pathname);
const t = useTranslations(lang);

const { title } = Astro.props;
---

<html lang={lang}>
  <head>
    <!-- ... other head elements ... -->
    <title>{title} | {t("site.title")}</title>
  </head>
  <body>
    <!-- ... your layout structure ... -->
  </body>
</html>

Create language-specific routes in your pages directory:

src/pages/index.astro
src/pages/es/index.astro
src/pages/cafes.astro
src/pages/es/cafes.astro
// ... and so on for each page and language

