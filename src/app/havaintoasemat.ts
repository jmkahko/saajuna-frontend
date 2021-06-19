export class HavaintoAsemat {
  // konstruktorimetodi joka rakentaa havaintoasemat-olion
  constructor(
    public _id: string,
    public name: string,
    public fmisid: number,
    public lpnn: number,
    public wmo: number,
    public longitude: string,
    public latitude: string,
    public caltitude: number,
    public group: string,
    public start: string
  ) {}
}
