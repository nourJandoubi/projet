import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Devise } from 'src/app/models/devise';
import { DeviseService } from 'src/app/services/devise.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.css']
})
export class DeviseComponent {
  devises: Devise[];
  description: string[];
  montant = 0;
  resultat = 0;
  values=[];
  nomDevises=["EUR","USD","JPY","TRY","CAD"]
  deviseList={"EUR":[],"USD":[],"JPY":[],"TRY":[],"CAD":[]};
  selectedDevise="EUR";
  selectedDeviseTo="EUR";
  selectedDeviseFrom="EUR";
  valueRecherche=0
  
  

  

  constructor(private route: ActivatedRoute, public deviseService: DeviseService) {}
  convertDevise(devise: string) {
   
      return this.deviseList[devise] ;
     
    }
  
    convertFromTo() {

      for (let i = 0; i < this.deviseList[this.selectedDeviseFrom].length; i++) {
        if (this.deviseList[this.selectedDeviseFrom][i].devise === this.selectedDeviseTo) {
          this.valueRecherche=this.deviseList[this.selectedDeviseFrom][i].valeur ; // affiche l'objet dont la devise est 'EUR'
          break;
        }
      

     
    }
    this.resultat = this.valueRecherche * this.montant;
    
  }


  ngOnInit(): void {
    this.deviseService.getDevisesParDate().subscribe((data) => {
      this.devises = data;
      console.log('devise 1',this.devises);
     
      
      for (let i = 0; i < this.devises.length; i++) {
        const match = this.devises[i].title.match(/([\d.]+) ([A-Z]+) = ([\d.]+) ([A-Z]+) (\d{4}-\d{2}-\d{2})/);

        if (match) {
          const value = {
            valeur : parseFloat(match[1]),
            devise : match[2],
            un :parseFloat (match[3]),
            euro : match[4],
            date : match[5],
          };
        
          this.values.push(value);
          
          this.deviseList["EUR"].push({id:uuidv4(),devise:value.devise,valeur:value.valeur})
          console.log("eur",this.deviseList["EUR"])
        } 
       
       
      }
      this.values.push({valeur :1,devise : "EUR",un :1,euro : "EUR"})
      this.deviseList["EUR"].push({id:uuidv4(),devise:"EUR",valeur:1})
     console.log("values",this.values)

      for (let i = 0; i < this.values.length; i++) {
        const dollar = 1 / this.values[0].valeur;
        const resDollar = dollar * this.values[i].valeur;
        const nomDevise=this.values[i].devise
        this.deviseList["USD"].push({id:uuidv4(),devise:nomDevise,valeur:resDollar});

        //jpy
        const jpy = 1 / this.values[1].valeur;
        const resjpy = jpy * this.values[i].valeur;
        this.deviseList["JPY"].push({id:uuidv4(),devise:nomDevise,valeur:resjpy});

        //try
        const trye = 1 / this.values[3].valeur;
        const restry = trye * this.values[i].valeur;
        this.deviseList["TRY"].push({id:uuidv4(),devise:nomDevise,valeur:restry});

        //cad
        const cad = 1 / this.values[2].valeur;
        const rescad = cad * this.values[i].valeur;
        this.deviseList["CAD"].push({id:uuidv4(),devise:nomDevise,valeur:rescad});
        console.log(this.deviseList["CAD"])
      };
      console.log("usd",this.deviseList["USD"])
     
      
    });
  }
}

