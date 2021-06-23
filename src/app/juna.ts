export class Juna {
  // konstruktorimetodi joka rakentaa junan aikataulu-olion
  constructor(  
    public trainNumber: number,
    public trainType: string,
    public trainCategory: string,
    public startStationLongName: string,
    public endStationLongName: string,
    public startStationShortCode: string,
    public endStationShortCode: string,
    public timeTableRows: []) { }
}