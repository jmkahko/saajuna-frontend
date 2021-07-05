# JAMK Web-kehittäjä-kurssin lopputyön SääJuna frontend

Backend löytyy [projektista](https://github.com/jmkahko/saajuna-backend).

Työn ovat tehneet yhdessä Janne ja Leena Kähkönen. Molemmat ovat osallistuneet sekä backendin että frontendin kehittämiseen.

## Yleisesittely

[Sääjuna-frontend](https://saajuna-frontend.herokuapp.com/) tarjoaa sivuston kautta frontend-palveluita [Sääjuna-backend](https://saajuna-backend.herokuapp.com/) sivustolle.
Tarjottavia frontend-palveluita ovat mm. sovellukseen kirjautuminen, suosikkien tallentaminen, junien ja säätietojen hakeminen.

### Sovelluksen idea ja sen toiminnallisuus lyhyesti.

SääJuna-sovelluksessa haetaan tiedot sekä VR:n että Ilmatieteen laitoksen avoimesta datasta ja tuodaan ne käyttäjälle näkyviin sovellukseen. Käyttäjä voi luoda sovellukseen oman käyttäjätunnuksen, jolla siihen voi tallentaa 2 kpl suosikkeja eli 4 yhteensä (esim. suosikkipaikkakuntia tai junia). Käyttäjä voi poistaa käyttäjätunnuksen ja vaihtaa sen salasanan. Admin-käyttäjä voi tehdä muutoksia tietokantaan, poistaa käyttäjätunnuksia ja näkee kuinka paljon tietoja on tallennettu tietokantaan. Admin-käyttäjiä ei voi luoda nettisivun kautta.

## Kuvaus teknologioista

Lopputyö on tietokanta-pohjainen full-stack-sovellus, jossa on sekä frontend että backend ja sen taustalla on tietokanta.
Backend on luotu Nodejs:llä ja Expressillä ja sen tietokantana on Mongodb (Atlas). Sekä frontend että backend on julkaistu Heroku:hun.

Frontend on luotu Angularilla. CRUD-toiminnot sijaitsevat frontendissä (käyttäjätunnusten luonti, muokkaus ja poisto sekä suosikkien lisäys, muokkaus ja poistaminen).

### Komennot

Komennot, joilla SääJunan kehitysversion saa Githubista toimimaan omalle koneelle.

Heroku palveluun sovelluksen laitto vaatii muutos package.json tiedostoon

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

Toistaiseksi työ on onnistunut hyvin. Vaikeinta on ollut aikatietojen muokkaaminen ja parserointi (UTC-aika). Myös Ilmatieteen laitoksen säätietojen XML-sanoman parserointi ja muuttaminen JSON-muotoon vei paljon aikaa.

Käyttäjätunnuksen poistaminen ja suosikki sää- ja rautatieasemien muuttaminen ei onnistu, jos käyttäjä on rekisteröitynyt ja yrittää heti tehdä muutosta. Käyttäjätunnuksen poistaminen ja suosikkisää- ja rautatieasemien muuttaminen onnistuu, kun käyttäjä on kirjautunut ulos ja kirjautunut takaisin sisälle. Tähän meni paljon aikaa, mutta se on nyt muutettu niin, että Admin käyttäjällä on oikeus poistaa käyttäjiä.

Junien ja rautatieasemien parserointi JSON sanomasta meni aikaa.Varsinkin alussa ennen kuin huomasi, että ajan muutoksia voi tehdä helpostikin.

Aikaa on käytetty frontendiin 40-50 h.

## Työssä hyödynnetyt tutoriaalit

[Tour of Heroes](https://angular.io/tutorial) tutoriaalia on käytetty apuna frontendissä.

Web-kehittäjä koulutuksen Frondend -sovelluskehitys ja Nodejs -sovelluskehitys kurssien materiaalia käytetty hyödyksi backendin ja frontendin puolella käyttäjätunnuksien luontiin, kirjautumiseen ja token tiedon hyödyntämiseen.

Lisäksi on käytetty myös Rautatieliikenteen ja Ilmatieteen laitoksen omia ohjeita ja heidän GitHub-sivustojaan esimerkiksi tiedon määritystä varten.

Junakartan tekemiseen käytetty tätä [tutoriaalia](https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet) ja Node.js-kurssilla käytyä esimerkkiä.

## Linkit

- [Tuulen suunnat asteikko](http://snowfence.umn.edu/Components/winddirectionanddegrees.htm) \
- [Sääsymbolien selitykset FMI](https://www.ilmatieteenlaitos.fi/latauspalvelun-pikaohje) \
- [Bootstrap haku-kentän teko](https://ng-bootstrap.github.io/#/components/typeahead/examples)\
- [Sovellus Herokuhun](https://www.youtube.com/watch?v=HWBSSC7Vbg0)\
- [Etusivun junan kuva](https://pixabay.com/fi/photos/junan-hylky-katastrofi-myrsky-3719422/) \
- [Junatietojen kuva](https://pixabay.com/fi/illustrations/vintage-veturi-moguli-steampunk-4273606/)\
- [Säätietojen kuva](https://pixabay.com/fi/illustrations/maailmankartta-vanha-2241469/)\
- [Navbarin logo](https://www.freelogodesign.org)\
- [Footerin ulkoasu ja koodi](https://epicbootstrap.com/snippets/footer-dark)\
- [Ulkoasun CSS](https://bbbootstrap.com/snippets/bootstrap-weather-widget-card-temperature-44293170)\
