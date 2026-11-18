# Where in the world?

This is my REST Countries project for Per Scholas. It shows all the countries in the world.
You can search a country, filter by region and change to dark mode.

Live site: Live site: https://shri-rest-countries.netlify.app


GitHub: https://github.com/shri62/rest-countries

![screenshot](./screenshot.png)

## Features

- See all countries with flag, population, region and capital
- Search by country name
- Filter by region
- Click a country to see more info
- Click border countries to go to them
- Light and dark mode (it remembers what you picked)
- Loading spinner and error message
- Works on phone, tablet and laptop

## What I used

- React
- TypeScript
- Vite
- React Router
- CSS
- REST Countries API

## How to run it

1. Clone the repo and install

```bash
git clone https://github.com/shri62/rest-countries.git
cd rest-countries
npm install
```

2. Get a free API key from https://restcountries.com and put `localhost` in CORS Allowed Origins

3. Make a `.env` file in the main folder and add your key

```
VITE_RESTCOUNTRIES_KEY=your_key_here
```

4. Start it

```bash
npm run dev
```

## Folders

- `components` - small parts like cards, buttons, search bar
- `pages` - Home page, Country page, Not Found page
- `hooks` - my custom hooks (useFetch, useLocalStorage, useDebounce, useDocumentTitle)
- `context` - theme for light and dark mode
- `api.ts` - gets the data from the API

## Accessibility

- Labels on search and dropdown
- Alt text on flags
- Skip to content link
- You can use the keyboard

## API problem

The old API (v3.1) stopped working while I was making this project. So I changed to v5.
It needs an API key and only gives 100 countries at a time, so I load them in parts.

## Deployment

I deployed it on Netlify.
Build command is `npm run build` and publish folder is `dist`.
I added my API key in Netlify environment variables.