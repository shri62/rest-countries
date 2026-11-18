# Reflection

I built this app with React, TypeScript and Vite. First, I planned the folders: pages, small
components, custom hooks, and one file for all the API calls. Then I built the pages one by one.

## Challenges

My biggest problem was the API. Halfway through the project, my app stopped showing countries.
I opened the API link in the browser and saw that the old version (v3.1) had been shut down.
The new version (v5) needs an API key and sends the data in a different format.

To fix it, I made a free account and saved the key in a `.env` file. Then I changed only
`api.ts`, so it turns the new data into the format my components already used. After that, I got
a 403 error. I found out the API only sends 100 countries at a time, so I loaded them in pages.
I also had to allow `localhost` in the key settings because of CORS.

I had smaller problems too, like wrong file names, missing exports, and a build error that the
dev server did not show. Now I always run `npm run build` before I push.

## What I learned

I learned how to use the Context API for the theme, how to write custom hooks, and how to use
the browser DevTools to find the real cause of an error.

## Improvements

In the future, I would add sorting by population, write tests, and add a small backend so the
API key is not visible in the browser.
