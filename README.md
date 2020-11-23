# MARVEL comics search engine using Vue

This project was made for [EOI-Garantía Juvenil: Programa de Especialización en Programación FullStack (2019)](https://www.spegc.org/formacion-y-eventos/programacion-fullstack-4/) in order to practice:

- Interaction with the front through url params.
- Pagination.
- Basic knowledge about Vue framework & good practices such as componentization.
- API REST requests.

The project itself is a MARVEL comic search engine that relies on the [MARVEL API](https://developer.marvel.com/) to allows the user to search for a comic by its name, and also filter the result by alphabetical order or date of sale. A cool thing about the project is that the user can link a specific page (of the pagination) that he found interesting via url.

<img align="center" src="readme assets/marvel.gif" alt="Demo gif"></img>

<div align="center"><b>Marvel Demo</b></div>

## Before start

To use the web the user will need a public and a private API keys and to obtain them it is required to create a [MARVEL Account](https://www.marvel.com/signin?referer=https%3A%2F%2Fdeveloper.marvel.com%2Faccount).

## Project setup

1. Install all the dependencies.
```
npm install
```

2. Create the file `marvel/src/keys.js` and follow the structure of `marvel/src/keys.js.example` to place the public and private API keys required ([MARVEL Account](https://www.marvel.com/signin?referer=https%3A%2F%2Fdeveloper.marvel.com%2Faccount)).


### Execute instructions
```
npm run serve
```

