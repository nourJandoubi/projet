export class Action {
    [x: string]: any;
    constructor(
      public nomBourse: string,
      public nomEntreprise: String,
      public cours: string,
      public variation:string,
      public ouverture:string,
      public haut:string,
      public bas:string,      
      public cloture:string,
      public _id?: string
    ) {}
  }
  