import { Component, OnInit } from '@angular/core';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';
import { JunaService } from '../juna.service';

@Component({
  selector: 'app-junantiedot',
  templateUrl: './junantiedot.component.html',
  styleUrls: ['./junantiedot.component.css']
})
export class JunantiedotComponent implements OnInit {
  // Esitellään tarvittavat komponentit junan aikataulutieto ja paikkatieto
  public junaaikataulu;
  public junanpaikka;
  public aika;

  constructor(
    private route: ActivatedRoute,
    private junaService: JunaService
  ) { }

  ngOnInit(): void {
    this.haeAikataulu();
    this.haeJunaPaikkatieto();
  }

  // Haetaan junan aikataulu tiedot
  haeAikataulu(): void {
    const aika = this.route.snapshot.paramMap.get('aika'); // aika tieto on string, josta johtuen ei muuteta numeroksi
    console.log(aika);
    const junanumero = Number(this.route.snapshot.paramMap.get('junanumero')); // junanumero tieto on numero, josta johtuen muutetaan numeroksi tieto

    this.junaService.haeAikataulu(aika, junanumero)
      .subscribe(junaaikataulu => this.junaaikataulu = junaaikataulu)
  }

  // Haetaan junan viimeisin paikkatieto
  haeJunaPaikkatieto(): void {
    const aika = this.route.snapshot.paramMap.get('aika'); // aika tieto on string, josta johtuen ei muuteta numeroksi
    console.log(aika);

    const junanumero = Number(this.route.snapshot.paramMap.get('junanumero')); // junanumero tieto on numero, josta johtuen muutetaan numeroksi tieto
    
    this.junaService.haePaikkatieto(aika, junanumero)
      .subscribe(junanpaikka => this.junanpaikka = junanpaikka)
  }


  haeAika() {
    let aika1 = new Date();
    aika1.setSeconds(0, 0); // Määritellään ajasta sekunnit ja millisekunnit nolliksi

    // Ajan muunnoksia (vuosi, kuukausi, päivä). 
    let vuosi = aika1.getFullYear();
    let kuukausi = aika1.getMonth() + 1;
    let paiva = aika1.getDate();

    // Muodostetaan aika hakua varten määrämuotoisena
    this.aika =
      vuosi + '-' + kuukausi + '-' + paiva;


    console.log('Aika muutoksen jälkeen ' + this.aika);
  }


}
