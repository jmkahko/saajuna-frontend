export class RautatieAsemaAikataulu {
  // konstruktorimetodi joka rakentaa rautatieasemanaikataulu-olion
  constructor(  
    public trainNumber: number,
    public trainType: string,
    public trainCategory: string,
    public startStation: string,
    public startStationLongName: string,
    public endStation: string,
    public endStationLongName: string,
    public stationStop: string,
    public arrivalScheduledTime: string,
    public arrivalLiveEstimateTime: string,
    public arrivalDifferenceInMinutes: number,
    public departureScheduledTime: string,
    public departureLiveEstimateTime: string,
    public departureDifferenceInMinutes: number) { }
}