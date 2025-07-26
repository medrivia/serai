<h1 align="center">SERAI ／ セライ</h1>

<p align="center">
    <img src="res/logo.svg" width="180" height="180" /><br/>
</p>

<p align="center">
    <a href="https://bun.sh/">
        <img alt="Bun-powered" src="https://img.shields.io/badge/Powered_by_Bun-black?logo=bun&logoColor=fbf0df&style=for-the-badge"/>
    </a>
    <br/>
    <a href="https://github.com/medrivia/serai/actions/workflows/release.yml">
        <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/medrivia/serai/release.yml?event=release"/>
    </a>
    <a href="https://jsr.io/@serai">
        <img alt="Visit the JSR page" src="https://jsr.io/badges/@serai" />
    </a>
    <a href="https://www.npmjs.com/package/serai">
        <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/serai"/>
    </a>
    <a href="https://github.com/medrivia/serai/blob/master/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/github/license/medrivia/serai">
    </a>
</p>

<p align="center">
    <b><i>(WIP) Markdown-powered framework that focuses on freedom and interactivity.</i></b>
</p>

> [!CAUTION]
> This project is still a **proof of concept** and not yet intended for production.

## 🌠 Motivation

> Many documentation frameworks centered around filename convention and/or directory structure. For most people, this is preferrable or logical. However, there is also a case where we have our own naming convention or desire the convenience of having comprehensive knowledgebase with as few files as possible.

## 🎁 Architecture

For now, this project handles only one thing (very carefully): **the freedom of writing however and anywhere we like**. This is achieved by implementing line-based metadata as unique identification of our notes and extend from it. Rather than depending on file names, we can deliberately assign multiple unique IDs even in just one Markdown file.

This module will analyze your Markdown content (based on argument), check every explicitly stated ID (in case of conflict) and break them into easily digestible notes that you can enhance further to be rendered as web pages.

To achieve nested/multi-level documentation, IDs gathered by Serai can be mapped into tree-structure as you desire.

This module will work on both Node.js (server) and browser (DOM).

## 🧭 Example

An example of a Markdown file:

```md
# Get Started

<!-- id=get-started -->

This is how you do it. Let’s go to [the advanced section](advanced).

# Advanced

<!-- id=advanced -->

Before reading this, you should finish [_Get Started_](get-started).
```

As you can see, there can be multiple top-level headings in one file with ID embedded in each comment.

When parsed by the main `Serai` class, the result will be:

```ts
const S = new Serai(md)
assert(S.x).toEqual({
	'get-started': [
		'# Get Started',
		'<!-- id=get-started -->',
		'',
		'This is how you do it. Let’s go to [the advanced section](advanced).',
		'',
		'# Advanced',
	],
	advanced: [
		'# Advanced',
		'<!-- id=advanced -->',
		'',
		'Before reading this, you should finish [_Get Started_](get-started).',
		'',
	],
})
```

> [!NOTE]
> The lines are separated for easier control/manipulation. They can be joined back when it’s time to render on the web page.

## 🔔 Release Info

This package implements **Gregorian YYM-based** semver notation.

- 📅 `v257.x.x`: Released around/on July 2025. **(current)**
- 🚀 `v260.x.x`: Released from October to December 2025.

For every major release, the preceding version will need to be imported with subpath:

```ts
/* Example: v260.x.x */
import { Serai as SeraiV260 } from 'serai' // v260 (current)
import { Serai } from 'serai/v257' // v257 (previous)
```

See [CHANGELOG](https://github.com/medrivia/serai/wiki/changelog) for breaking changes, updates and fixes.

<p align="center"><sub><strong>© 2025 MEDRIVIA ／ Umar Alfarouk</strong></sub></p>
