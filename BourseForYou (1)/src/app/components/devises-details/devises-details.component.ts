
import { ActivatedRoute } from '@angular/router';
import { Devise } from 'src/app/models/devise';
import { DeviseService } from 'src/app/services/devise.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-devises-details',
  templateUrl: './devises-details.component.html',
  styleUrls: ['./devises-details.component.css']
})
export class DevisesDetailsComponent {
  devises: Devise[];
  description: string[];
  montant = 0;
  resultat = 0;
  values=[];
 
  deviseList={"EUR":[],"USD":[],"JPY":[],"TRY":[],"CAD":[]};
  selectedDevise:any;
  selectedDeviseTo="EUR";
  selectedDeviseFrom="EUR";
  valueRecherche=0
  dates = [];
  valuess = [];

@ViewChild('myChart', { static: true }) myCanvas: ElementRef<HTMLCanvasElement>;

  
  deviseId:any
  deviseChoisi:any
  constructor(private route: ActivatedRoute,public deviseService: DeviseService ){}

  ngOnInit(): void {
   
      this.route.params.subscribe(params => {
        this.deviseId = params['id'];
        this.deviseChoisi=params['devise'];
        this.selectedDevise =params['selectedDevise'];
       
        
       
      });
      this.deviseService.getDevises().subscribe((data) => {
        this.devises = data;
        
        
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
            
            this.deviseList["EUR"].push({devise:value.devise,valeur:value.valeur,date:value.date})
            
          } 
          
         
         
        }
        this.values.push({valeur :1,devise : "EUR",un :1,euro : "EUR"})
        this.deviseList["EUR"].push({devise:"EUR",valeur:1})
       
    
        for (let i = 0; i < this.values.length; i++) {
          const dollar = 1 / this.values[0].valeur;
          const resDollar = dollar * this.values[i].valeur;
          const nomDevise=this.values[i].devise
          if(this.values[i].devise!=="USD")
          {this.deviseList["USD"].push({devise:nomDevise,valeur:resDollar,date:this.values[i].date});}
    
          //jpy
          const jpy = 1 / this.values[1].valeur;
          const resjpy = jpy * this.values[i].valeur;
          if(this.values[i].devise!=="JPY")
          {this.deviseList["JPY"].push({devise:nomDevise,valeur:resjpy,date:this.values[i].date});}
    
          //try
          const trye = 1 / this.values[3].valeur;
          const restry = trye * this.values[i].valeur;
          if(this.values[i].devise!=="TRY")
          {this.deviseList["TRY"].push({devise:nomDevise,valeur:restry,date:this.values[i].date});}
    
          //cad
          const cad = 1 / this.values[2].valeur;
          const rescad = cad * this.values[i].valeur;
          if(this.values[i].devise!=="CAD")
         { this.deviseList["CAD"].push({devise:nomDevise,valeur:rescad,date:this.values[i].date});}
         
        };
       
    
        let DevisesFiltres = this.deviseList[this.selectedDevise].filter(objet => objet.devise === this.deviseChoisi);
      
    
        // afficher les objets filtrés
        
      
        for (let i = 0; i < DevisesFiltres.length; i++) {
          
          if (DevisesFiltres[i]) {
            this.dates.push(DevisesFiltres[i].date);
            this.dates.sort((a: Date, b: Date) => Date.parse(a.toString()) - Date.parse(b.toString()));
            this.valuess.push(DevisesFiltres[i].valeur);
          }
        }
        console.log(this.valuess)
        
      });
      
    
   
  }

ngAfterViewInit() {

  setTimeout(() => {   
    const ctx = this.myCanvas.nativeElement.getContext('2d');
    const chartData = {
      labels: this.dates,
      datasets: [
        {
          label: `${this.selectedDevise} to ${this.deviseChoisi}`,
          data: this.valuess,
          backgroundColor: '#3F51B5',
          borderColor: '#3F51B5',
          borderWidth: 1,
          fill: true,
        },
      ],
    };
    
    const chartOptions = {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: `Exchange rate (${this.selectedDevise} to ${this.deviseChoisi})`,
          },
        },
      },
    };
    
  
    
    
    // Create chart
    const myChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  },2000);

  }

  }    







 
  
 