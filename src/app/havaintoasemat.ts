export class HavaintoAsemat {
  // konstruktorimetodi joka rakentaa havaintoasemat-olion
  constructor(
    public _id: string,
    public name: string, // havaintoaseman nimi
    public fmisid: number,
    public lpnn: number,
    public wmo: number,
    public latitude: string,
    public longitude: string,
    public altitude: number,
    public group: string,
    public start: string
  ) {}
}
