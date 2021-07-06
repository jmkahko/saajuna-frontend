export class SaaNyt {
  // konstruktorimetodi joka rakentaa säänyt-olion
  constructor(
    public _id: string,
    public time: String, // Kellonaika
    public t2m: Number, // Lämpötila
    public ws_10min: Number, // Tuuli
    public wg_10min: Number, //  Tuulen puuska
    public wd_10min: Number, // Tuulen suunta
    public rh: Number, // Kosteus
    public td: Number, // Kastepiste
    public r_1h: Number, // Sademäärä tunnissa
    public ri_10min: Number, // Sateen rankkuus
    public snow_aws: Number, // Lumensyvyys
    public p_sea: Number, // Paine
    public vis: Number, // Näkyvyys
    public n_man: Number, // Pilvisyys
    public wawa: Number, // Säätila
    public fmisid: Number, // esim. Kajaani Petäisenniska 126736
    public place: String //paikkakunta
  ) {}
}
