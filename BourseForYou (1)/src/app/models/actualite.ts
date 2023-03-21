export class Actualite {
  constructor(
    public title: string,
    public pubDate: Date,
    public content: String,
    public link: string,
    public categories: Array<String>,
    public showText:boolean,
    public _id?: string
  ) {}
}
