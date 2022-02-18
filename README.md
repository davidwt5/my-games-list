# MyGamesList
[mygameslist.net](#)<br/>
Your own personal list of the games in your backlog.<br/>
Wrote this because I have way too many games that I've been meaning to play but never actually do.<br/>
Made with react, bootstrap, and mongodb

## APIs used
- [igdb](https://www.igdb.com/api) Used to query database of video games

## Features
- Is an SPA; doesn't hit a server on URL change. Uses react-router to handle URL change.
- Uses React-Bootstrap for responsive desktop and mobile styling
- Google account authorisation used alongside traditional signups (with some security precautions e.g. salt and pepper, hashing)

## Core Features
- ~~Basic Search by Title~~
- From search page: add game (on hold by default, have option to change), remove game
- User profile
- Set up games status (on hold, playing, dropped, completed)
- Access detailed game page

## Extra Features
- Icons for the game's platforms
- Equal card length for search page
- Option to view search result as lists
- Search by category in games page
- Advanced Search
- Search sort options (newest, alphabetical, relevance)
- Page system / Load more when user reaches bottom
- Review system
- If game card longer than 5 lines, do a ... click to expand

## Side Note
- Requires a cors proxy server to work. This is because cors origin header is (rightfully) disabled by the API provider.
