# Jyväskylän ammattikorkeakoulun Web-kehittäjä kurssin lopputyön Sää Juna frontend

Backend löytyy projektista https://github.com/jmkahko/saajuna-backend

## Yleisesittely

### Sovelluksen idea ja sen toiminnallisuus lyhyesti.

Sovelluksessa haetaan tiedot sekä VR:n että Ilmatieteenlaitoksen avoimesta datasta ja tuodaan ne käyttäjälle näkyviin sovellukseen. Käyttäjä voi luoda sovellukseen oman käyttäjätunnuksen, jolla siihen voi tallentaa 3 kpl suosikkeja (esim. suosikkipaikkakuntia tai asemia). Käyttäjä voi poistaa käyttäjätunnuksen ja vaihtaa sen salasanan. Admin-käyttäjä voi tehdä muutoksia tietokantaan. Admin-käyttäjiä ei voi luoda nettisivun kautta.

## Kuvaus teknologioista

Lyhyehkö kuvaus eri teknologioiden käyttämisestä työssä.
Komennot, joilla kehitysversion saa Githubista omalle koneelle toimimaan.

Lopputyö on tietokanta-pohjainen full-stack-sovellus, jossa on frontend ja backend, jonka taustalla on tietokanta.
Backend on luotu Nodejs:llä ja Expressillä ja sen tietokantana on Mongodb (Atlas). Työ on julkaistu Heroku:hun.

Frontend on luotu Angularilla. CRUD-toiminnot sijaitsevat frontendissä (käyttäjätunnusten luonti, muokkaus ja poisto sekä suosikkien lisäys, muokkaus ja poistaminen).

Työn ovat tehneet yhdessä Janne ja Leena Kähkönen. Molemmat ovat osallistuneet sekä backendin että frontendin kehittämiseen.

### Komennot

xxx

## Reflektio ja ajankäyttö

Miten työ onnistui? Mikä oli helppoa, mikä vaikeaa? Kuinka paljon käytit aikaa loppuharjoitustyön tekemiseen? Mitä tietoja/taitoja sinun tulee vielä kehittää?

Toistaiseksi työ on onnistunut hyvin. Vaikeinta on ollut aikatietojen muokkaaminen ja parserointi (UTC-aika). Myös Ilmantieteen laitoksen säätietojen XML-sanoman parserointi ja muuttaminen JSON muotoon vei paljon aikaa.
Aikaa on käytetty backendiin ainakin 30-40 h ja frontendiin xxx h.

## Työssä hyödynnetyt tutoriaalit

Kustakin tutoriaalista ilmoitetaan sen nimi ja osoite.
Kunkin tutorialain osalta kirjataan tieto kuinka paljon kyseistä tutoriaalia on hyödynnetty ja kuinka paljon omaa koodia on tuotettu tutoriaalin lisäksi.

Tour of Heroes https://angular.io/tutorial frontendissä.

Koulutuksen Frondend -sovelluskehitys ja Nodejs -sovelluskehitys kurssien materiaalia käytetty hyödyksi backendin ja frontendin puolella käyttäjätunnuksien luontiin, kirjautumiseen ja token tiedon hyödyntämiseen.

Backendissä on käytetty lähinnä Web-kehittäjä koulutuksen materiaaleja sekä ajan parseroimiseen ja muotoiluun on käytetty joitakin ohjeita StackOverFlow:sta.

### Sekalaiset

Lisätty sääsymbolien kuvakkeet /symbols kansioon.

## Linkit

http://snowfence.umn.edu/Components/winddirectionanddegrees.htm Tuulen suunnat asteikko
https://www.ilmatieteenlaitos.fi/latauspalvelun-pikaohje Sääsymbolien selitykset FMI
