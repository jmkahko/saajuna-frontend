# JAMK Web-kehittäjä-kurssin lopputyön SääJuna frontend

Backend löytyy tästä [projektista](https://github.com/jmkahko/saajuna-backend).

Työn ovat tehneet yhdessä Janne ja Leena Kähkönen. Molemmat ovat osallistuneet sekä backendin että frontendin kehittämiseen.

## Yleisesittely

[SääJuna-frontend](https://saajuna.herokuapp.com/) sivuston backend toimii [SääJuna-backend](https://saajuna-backend.herokuapp.com/) osoitteessa.
Frontend-palveluita ovat mm. sovellukseen kirjautuminen, suosikkien tallentaminen, junien ja säätietojen hakeminen.

### Sovelluksen idea ja sen toiminnallisuus lyhyesti.

SääJuna-sovelluksessa haetaan tiedot sekä [Rautatieliikenteen](https://www.digitraffic.fi/rautatieliikenne/) että [Ilmatieteen laitoksen](https://www.ilmatieteenlaitos.fi/) avoimesta datasta ja tuodaan ne käyttäjälle näkyviin sovellukseen. Sovelluksessa käyttäjä voi hakea esimerkiksi haluamansa rautatieaseman, jolloin hän näkee aseman tietoja, sinne tällä hetkellä tulevat ja lähtevät junat sekä aseman sääennusteen. Klikkaamalla junaa hän näkee junan aikataulun ja missä kohti se on kartalla tällä hetkellä (sijanti saadaan vain, jos juna lähettää GPS-sijaintitietoa).

Käyttäjä voi myös hakea haluamaansa paikkakuntaa ja sen säähavaintoasemaa, jolloin hänelle haetaan kyseisen säähavaintoaseman tiedot, tämänhetkinen sää joko sovelluksen tietokannasta (mikäli se on haettu viimeisen 10 minuutin aikana) tai jos hausta on pidempi aika, niin sitten se haetaan Ilmatieteen laitoksen avoimesta tietokannasta. Samalla haetaan myös kyseiselle säähavaintoasemalle myös kuluvan tunnin sääennuste.

Karttojen kuvakkeita klikkaamalla käyttäjä pääsee myös suoraan rautatieasemien, säähavaintoasemien ja kulussa olevien junien tietoihin.

Käyttäjä voi luoda sovellukseen oman käyttäjätunnuksen, jolla siihen voi tallentaa 2 kpl säähavaihtoaseman ja rautatieaseman suosikkeja eli 4 yhteensä. Käyttäjä voi poistaa käyttäjätunnuksen ja vaihtaa sen salasanan. Admin-käyttäjä voi tehdä muutoksia tietokantaan, poistaa käyttäjätunnuksia ja näkee kuinka paljon tietoja on tallennettu tietokantaan. Admin-käyttäjiä ei voi luoda nettisivun kautta.

## Kuvaus teknologioista

SääJuna-frontend sovellus on luotu Angularilla. Sivustolta tehdään REST API-rajapinnan kautta MongoDB-tietokannan CRUD- ja junienhakutoimintoja [SääJuna-backend](https://saajuna-backend.herokuapp.com/) palveluun.

[SääJuna-frontend](https://saajuna.herokuapp.com/) -sivusto on julkaistu [Heroku](https://www.heroku.com/) palvelussa. Julkaisua varten Angular projektiin on lisätty myös [Node Express](https://expressjs.com/).

### Komennot

Alla on komennot, joilla SääJunan kehitysversion saa Githubista toimimaan omalle koneelle.

1. `git clone git@github.com:jmkahko/saajuna-frontend.git`
2. Tarkista, että [SääJuna-backend](https://github.com/jmkahko/saajuna-backend) on toiminnossa
3. Tarvittaessa SääJuna-backend palvelun osoitetta voi muokata ./environments/environment.ts tiedostoon
4. Sitten käynnistä projekti `npm start` komennolla.

Heroku-palveluun sovelluksen lisääminen vaatii muutoksen package.json -tiedostoon, komento jolla sivusto käynnistyy.

Heroku

```
  "scripts": {
    "ng": "ng",
    "start": "node server.js",
    "build": "ng build",
    "postinstall": "ng build --aot --prod",
    "heroku-postbuild": "ng build --prod --aot"
  },
```

Paikallinen

```
  "scripts": {
    "ng": "ng",
    "start": "ng serve -o",
    "build": "ng build",
    "postinstall": "ng build --aot --prod",
    "heroku-postbuild": "ng build --prod --aot"
  },
```

## Reflektio ja ajankäyttö

Työ on onnistunut hyvin ja yllättävän sujuvasti. Ongelmia jonkin verran aiheutti sivujen välillä tietojen siirto esimerkiksi siinä kun käyttäjä rekisteröityy ja siirrytään kirjaudu-sivustolle. Tämä ongelma saatiin kierrettyä siten, että luotiin uusi kirjaudu-sivusto, johon käyttäjä ohjataan rekisteröinnin jälkeen. Käyttäjätunnuksen poistaminen ja salasanan vaihtaminen aiheutti myös jonkin verran ongelmia, ennen kuin saatiin ongelma ratkaistua viemällä käyttäjän id-tieto sessionStorageen kirjautumisen yhteydessä.
Html sivulla elementtien sijainnin määrittely ja saaminen haluttuun kohtaan aiheutti myös välillä aikamoista päänvaivaa.

Frontendin tekemiseen on käytetty aikaa 60-80 h.

## Työssä hyödynnetyt tutoriaalit

[Tour of Heroes](https://angular.io/tutorial) tutoriaalia on käytetty paljon apuna frontendissä.

Web-kehittäjä koulutuksen Frontend -sovelluskehitys ja Nodejs -sovelluskehitys kurssien materiaalia käytetty hyödyksi backendin ja frontendin puolella esimerkiksi käyttäjätunnuksien luontiin, kirjautumiseen ja token-tiedon hyödyntämiseen.

Lisäksi on käytetty myös [Rautatieliikenteen](https://www.digitraffic.fi/rautatieliikenne/) ja [Ilmatieteen laitoksen](https://www.ilmatieteenlaitos.fi/) omia avoimen datan ohjeita ja heidän GitHub-sivustojaan esimerkiksi tiedon määrityksiä varten.

Junakartan tekemiseen käytetty tätä [tutoriaalia](https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet) ja Node.js-kurssilla käytyä esimerkkiä.

## Linkit

Alla on linkit muutamiin sivustoihin, joita on myös hyödynnetty lopputyössä.

- [Asteikko tuulen suunnille](http://snowfence.umn.edu/Components/winddirectionanddegrees.htm)
- [Sääsymbolien selitykset - Ilmatieteen laitos](https://www.ilmatieteenlaitos.fi/latauspalvelun-pikaohje)
- [Ohje Bootstrap haku-kentän tekemiseen](https://ng-bootstrap.github.io/#/components/typeahead/examples)
- [Ohje sovelluksen lisäämiseen Herokuhun](https://www.youtube.com/watch?v=HWBSSC7Vbg0)
- [Ohje kuinka käsitellä tietokantahaun undefined tai null-arvoja](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [Navbarin collapse-ohje](https://medium.com/@tiboprea/build-a-responsive-bootstrap-4-navbar-in-angular-5-without-jquery-c59ad35b007)
- [Navbarin logo](https://www.freelogodesign.org)
- [Footerin ulkoasu ja koodi, on lainattu täältä](https://epicbootstrap.com/snippets/footer-dark)
- [Ulkoasun CSS, on lainattu täältä](https://bbbootstrap.com/snippets/bootstrap-weather-widget-card-temperature-44293170)

Näiden linkkien lisäksi on paljon hyödynnetty vinkkejä ja vihjeitä [Stack Overflow](https://stackoverflow.com/) sivustolta.
