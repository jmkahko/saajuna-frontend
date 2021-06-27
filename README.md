# JAMK Web-kehittäjä-kurssin lopputyön SääJuna frontend

Backend löytyy projektista https://github.com/jmkahko/saajuna-backend

Työn ovat tehneet yhdessä Janne ja Leena Kähkönen. Molemmat ovat osallistuneet sekä backendin että frontendin kehittämiseen.

## Yleisesittely

### Sovelluksen idea ja sen toiminnallisuus lyhyesti.

Sovelluksessa haetaan tiedot sekä VR:n että Ilmatieteenlaitoksen avoimesta datasta ja tuodaan ne käyttäjälle näkyviin sovellukseen. Käyttäjä voi luoda sovellukseen oman käyttäjätunnuksen, jolla siihen voi tallentaa 2 kpl suosikkeja (esim. suosikkipaikkakuntia tai junia). Käyttäjä voi poistaa käyttäjätunnuksen ja vaihtaa sen salasanan. Admin-käyttäjä voi tehdä muutoksia tietokantaan. Admin-käyttäjiä ei voi luoda nettisivun kautta.

## Kuvaus teknologioista

Lyhyehkö kuvaus eri teknologioiden käyttämisestä työssä.
Komennot, joilla kehitysversion saa Githubista omalle koneelle toimimaan.

Lopputyö on tietokanta-pohjainen full-stack-sovellus, jossa on frontend ja backend ja sen taustalla on tietokanta.
Backend on luotu Nodejs:llä ja Expressillä ja sen tietokantana on Mongodb (Atlas). Työ on julkaistu Heroku:hun.

Frontend on luotu Angularilla. CRUD-toiminnot sijaitsevat frontendissä (käyttäjätunnusten luonti, muokkaus ja poisto sekä suosikkien lisäys, muokkaus ja poistaminen).

### Komennot

xxx

## Reflektio ja ajankäyttö

Miten työ onnistui? Mikä oli helppoa, mikä vaikeaa? Kuinka paljon käytit aikaa loppuharjoitustyön tekemiseen? Mitä tietoja/taitoja sinun tulee vielä kehittää?

Toistaiseksi työ on onnistunut hyvin. Vaikeinta on ollut aikatietojen muokkaaminen ja parserointi (UTC-aika). Myös Ilmatieteen laitoksen säätietojen XML-sanoman parserointi ja muuttaminen JSON muotoon vei paljon aikaa.

Käyttäjätunnuksen poistaminen ja suosikki sää- ja rautatieasemien muuttaminen ei onnistu, jos käyttäjä on rekisteröitynyt ja yrittää heti tehdä muutosta. Käyttäjätunnuksen poistaminen ja suosikki sää- ja rautatieasemien muuttaminen onnistuu, kun käyttäjä on kirjautunut ulos ja kirjautunut takaisin sisälle. Tähän meni useampi rupeama aikaa, muutettu, että Admin käyttäjällä on oikeus poistaa käyttäjiä.

Junien ja rautatieasemien parserointi JSON sanomasta meni aikaa, myös ajan muutokseen, ennen kuin huomasi, että aika muuttuu helposti...

Aikaa on käytetty backendiin ainakin 50-60 h ja frontendiin 40-50 h.

## Työssä hyödynnetyt tutoriaalit

Kustakin tutoriaalista ilmoitetaan sen nimi ja osoite.
Kunkin tutorialain osalta kirjataan tieto kuinka paljon kyseistä tutoriaalia on hyödynnetty ja kuinka paljon omaa koodia on tuotettu tutoriaalin lisäksi.

Tour of Heroes https://angular.io/tutorial frontendissä.

Koulutuksen Frondend -sovelluskehitys ja Nodejs -sovelluskehitys kurssien materiaalia käytetty hyödyksi backendin ja frontendin puolella käyttäjätunnuksien luontiin, kirjautumiseen ja token tiedon hyödyntämiseen.

Backendissä on käytetty lähinnä Web-kehittäjä koulutuksen materiaaleja sekä ajan parseroimiseen ja muotoiluun on käytetty joitakin yksittäisiä ohjeita StackOverFlow:sta.

Junakartan tekemiseen käytetty tätä tutoriaalia https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet ja Node.js-kurssilla käytyä esimerkkiä

## Linkit

http://snowfence.umn.edu/Components/winddirectionanddegrees.htm Tuulen suunnat asteikko
https://www.ilmatieteenlaitos.fi/latauspalvelun-pikaohje Sääsymbolien selitykset FMI
https://pixabay.com/fi/photos/junan-hylky-katastrofi-myrsky-3719422/ Pääsivun junan kuva
