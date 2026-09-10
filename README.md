# ZeroFiascko

**Zero setup. Zero account. Zero database. Zero cloud. Zero dependencies.**

ZeroFiascko is a lightweight, local-first project management tool built with vanilla HTML, CSS and JavaScript.

Open `index.html` and start working.

No installation. No server. No internet connection required.


## The Zero Philosophy

ZeroFiascko is built around two ideas: **keep project management simple and keep your data in your hands.**

- Zero accounts
- Zero databases
- Zero cloud storage
- Zero servers
- Zero frameworks
- Zero external dependencies
- Zero installation
- Zero internet required
- Zero tracking

Your projects are stored locally as simple JSON files.

ZeroFiascko does not require sending your project data to a remote server or third-party service.

**Your project. Your data. Your machine.**


## Features

- Kanban-style project board
- Backlog, Analyse, In Progress, QA and Done lanes
- Create, edit, move and delete cards
- Archive and unarchive cards
- Project information and description
- Project notes
- Project statistics and completion tracking
- Local autosave
- JSON project files
- Import and export projects
- Fully offline


## Privacy by Design

ZeroFiascko is designed to work entirely on your computer.

There is no account to create, no remote database to connect to and no cloud service required to manage your projects.

Your project data stays local unless you choose to move or share your JSON project files yourself.

This keeps the application simple while reducing unnecessary exposure of your project data to external services.


## Technologies

ZeroFiascko intentionally keeps its technology stack small:

- HTML
- CSS
- JavaScript

That's it.

No frameworks.  
No packages.  
No build tools.  
No external dependencies.


## Usage

1. Download or clone the repository.
2. Open `index.html` in your browser.
3. Create a new project or open an existing ZeroFiascko JSON project.
4. Start working.

No setup required.


## Project Structure

```text
ZeroFiascko/
├── css/
│   └── style.css
│
├── js/
│   ├── core/
│   │   ├── constants.js
│   │   ├── project.js
│   │   ├── utils.js
│   │   └── validations.js
│   │
│   ├── features/
│   │   ├── archive.js
│   │   ├── notes.js
│   │   ├── project-info.js
│   │   └── statistics.js
│   │
│   ├── dashboard.js
│   └── index.js
│
├── saves/
│   └── .gitkeep
│
├── .gitattributes
├── .gitignore
├── dashboard.html
├── index.html
├── LICENSE
└── README.md
```


## Project Files

ZeroFiascko projects are stored using simple JSON files.

This makes your projects portable, easy to back up and independent from ZeroFiascko itself.

You control where your project files are stored and when they are exported or shared.

For better organization, it is recommended to store your project files in the included `saves/` folder, but you are free to save them anywhere on your computer.


## License

ZeroFiascko is source-available under the MIT License with the Commons Clause.

You are free to use ZeroFiascko for personal or professional purposes, modify it, and redistribute it under the terms of the license.

You may not sell ZeroFiascko itself, or offer a product or service whose value derives substantially from ZeroFiascko.

See the `LICENSE` file for the complete license terms.
