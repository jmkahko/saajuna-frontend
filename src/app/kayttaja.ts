export class Kayttaja {
  // konstruktorimetodi joka rakentaa käyttäjä-olion
  constructor(  
    public _id: string,
    public username: string,
    public password: string,
    public isadmin: boolean) { }
}