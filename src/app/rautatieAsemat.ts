export class RautatieAsemat {
  // konstruktorimetodi joka rakentaa rautatieasemat-olion
  constructor(  
    public _id: string,
    public assengerTraffic: boolean,
    public type: string,
    public stationName: string,
    public stationShortCode: string,
    public stationUICCode: number,
    public countryCode: string,
    public longitude: string,
    public latitude: string) { }
}