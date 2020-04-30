# notes-app

Notes taking app with sublevels using next.js and node

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## TODOs

1. refactor the save method to be accessible from page New and Save button inside Note.js
2. make New page
3. add tests
4. what happen when you remove all notes by default?
5. autosave with debounce, and add a saving/saved label or nprogress
6. add dynamic menus to remvoe/add folder notes
7. export as pdf or text
8. add date at top of note
9. add number of notes with folders name
10. add sort for notes in current folder

•• Done

- fix the save error
- fix currentFolder
- get only the first words and fix the date in CurretnFolder
- make addnote full page and with nav
