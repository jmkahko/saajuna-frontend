export class Favorite {
  // konstruktorimetodi joka rakentaa suosikit-olion
  constructor(
    public _id: string,  
    public username: string,
    public favoritesSaa1: number,
    public favoritesSaa2: number,
    public favoritesJuna1: string,
    public favoritesJuna2: string) { }
}