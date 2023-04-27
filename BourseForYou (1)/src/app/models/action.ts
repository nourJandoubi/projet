export class Action {
    [x: string]: any;
    constructor(
      public nomBourse: string,
      public pubDate: Date,
      public nomEntreprise: String,
      public cours: string,
      public variation:string,
      public ouv:string,
      public haut:string,
      public bas:string,      
      public volume:string,
      public _id?: string
    ) {}
  }
  