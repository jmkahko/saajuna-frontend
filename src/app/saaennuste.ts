export class SaaEnnuste {
  // konstruktorimetodi joka rakentaa sääennuste-olion
  constructor(
    public _id: string,
    public time: String, // Kellonaika
    public GeopHeight: Number,
    public Temperature: Number,
    public Pressure: Number,
    public Humidity: Number,
    public WindDirection: Number,
    public WindSpeedMS: Number,
    public WindUMS: Number,
    public WindVMS: Number,
    public MaximumWind: Number,
    public WindGust: Number,
    public DewPoint: Number,
    public TotalCloudCover: Number,
    public WeatherSymbol3: Number, // Säätyypin kuvan numero
    public LowCloudCover: Number,
    public MediumCloudCover: Number,
    public HighCloudCover: Number,
    public Precipitation1h: Number,
    public PrecipitationAmount: Number,
    public RadiationGlobalAccumulation: Number,
    public RadiationLWAccumulation: Number,
    public RadiationNetSurfaceLWAccumulation: Number,
    public RadiationNetSurfaceSWAccumulation: Number,
    public RadiationDiffuseAccumulation: Number,
    public LandSeaMask: Number,
    public place: String
  ) {}
}
