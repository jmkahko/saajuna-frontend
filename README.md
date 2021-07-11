# JAMK Web-kehittäjä-kurssin lopputyön SääJuna frontend

Backend löytyy tästä [projektista](https://github.com/jmkahko/saajuna-backend).

Työn ovat tehneet yhdessä Janne ja Leena Kähkönen. Molemmat ovat osallistuneet sekä backendin että frontendin kehittämiseen.

## Yleisesittely

[SääJuna-frontend](https://saajuna.herokuapp.com/) tarjoaa sivuston kautta frontend-palveluita [SääJuna-backend](https://saajuna.herokuapp.com/) sivustolle.
Tarjottavia frontend-palveluita ovat mm. sovellukseen kirjautuminen, suosikkien tallentaminen, junien ja säätietojen hakeminen.

### Sovelluksen idea ja sen toiminnallisuus lyhyesti.

SääJuna-sovelluksessa haetaan tiedot sekä VR:n että Ilmatieteen laitoksen avoimesta datasta ja tuodaan ne käyttäjälle näkyviin sovellukseen. Sovelluksessa käyttäjä voi hakea esimerkiksi haluamansa rautatieaseman, jolloin hän näkee aseman tietoja, sinne tällä hetkellä tulevat ja lähtevät junat sekä aseman sääennusteen. Klikkaamalla junaa hän näkee junan aikataulun ja missä kohti se on kartalla tällä hetkellä.

Käyttäjä voi myös hakea haluamaansa paikkakuntaa ja sen säähavaintoasemaa, jolloin hänelle haetaan kyseisen säähavaintoaseman tiedot, tämänhetkinen sää joko sovelluksen tietokannasta (mikäli se on haettu viimeisen 10 minuutin aikana) tai jos hausta on pidempi aika, niin sitten se haetaan Ilmatieteen laitoksen avoimesta tietokannasta. Samalla haetaan myös kyseiselle asemalle myös tuleva sääennuste.

Karttojen kuvakkeita klikkaamalla käyttäjä pääsee myös rautatieasemien, säähavaintoasemien ja kulussa olevien junien tietoihin suoraan.

Käyttäjä voi luoda sovellukseen oman käyttäjätunnuksen, jolla siihen voi tallentaa 2 kpl suosikkeja eli 4 yhteensä (esim. suosikkipaikkakuntia tai junia). Käyttäjä voi poistaa käyttäjätunnuksen ja vaihtaa sen salasanan. Admin-käyttäjä voi tehdä muutoksia tietokantaan, poistaa käyttäjätunnuksia ja näkee kuinka paljon tietoja on tallennettu tietokantaan. Admin-käyttäjiä ei voi luoda nettisivun kautta.

## Kuvaus teknologioista

SääJuna-lopputyö on tietokanta-pohjainen full-stack-sovellus, jossa on sekä frontend että backend ja sen taustalla on tietokanta.
Backend on luotu Nodejs:llä ja Expressillä ja sen tietokantana on Mongodb (Atlas). Molemmat sekä frontend että backend on julkaistu Heroku:hun.

Frontend on luotu Angularilla. CRUD-toiminnot sijaitsevat frontendissä (käyttäjätunnusten luonti, muokkaus ja poisto sekä suosikkien lisäys, muokkaus ja poistaminen).

### Komennot

Alla on komennot, joilla SääJunan kehitysversion saa Githubista toimimaan omalle koneelle.

Heroku-palveluun sovelluksen lisääminen vaatii muutoksen package.json -tiedostoon

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

Työ on onnistunut hyvin ja yllättävän sujuvasti. Vaikeimpia asioita ovat olleet aikatietojen muokkaaminen ja parserointi (UTC-aika), tietojen vieminen eri komponenttien välillä (emme saaneet sitä onnistumaan kaikissa kohteissa). Myös Ilmatieteen laitoksen säätietojen XML-sanoman parserointi ja muuttaminen JSON-muotoon vei paljon aikaa.

Junien ja rautatieasemien parserointiin JSON-sanomasta meni aikaa.Varsinkin alussa ennen kuin huomattiin, että ajan muutoksia voi tehdä helpostikin.

Käyttäjän poistaminen epäonnistuu, jos on kirjautuneena pitkään toisella sivulla. Tähän ei löytynyt ratkaisua.

Frontendin tekemiseen on käytetty aikaa 60-80 h.

## Työssä hyödynnetyt tutoriaalit

[Tour of Heroes](https://angular.io/tutorial) tutoriaalia on käytetty paljon apuna frontendissä.

Web-kehittäjä koulutuksen Frontend -sovelluskehitys ja Nodejs -sovelluskehitys kurssien materiaalia käytetty hyödyksi backendin ja frontendin puolella esimerkiksi käyttäjätunnuksien luontiin, kirjautumiseen ja token-tiedon hyödyntämiseen.

Lisäksi on käytetty myös Rautatieliikenteen ja Ilmatieteen laitoksen omia avoimen datan ohjeita ja heidän GitHub-sivustojaan esimerkiksi tiedon määritystä varten.

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
