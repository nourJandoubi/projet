import { EntrepriseService } from 'src/app/services/entreprise.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HistoriquePortefeuilleService } from 'src/app/services/historique-portefeuille.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {
  idPortefeuille=this.activatedRoute.snapshot.params['id'];
  historique:any[]=[];
  listeHistorique:any[]=[];

  first: number = 0;
  rows: number = 5;
  pageSlice:any[]=[];
  loading:boolean=true;

  @ViewChild('content') content: ElementRef;
 
  makePdf() {
   const element = this.content.nativeElement;
   const opt = {
     margin:       1,
     filename:     'rapport_Visiteurs.pdf',
     image:        { type: 'jpeg', quality: 0.98 },
     html2canvas:  { scale: 0.5 },
     jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' },
     page_size: 'A3'
   };
 
   html2pdf().set(opt).from(element).save();
 }
  constructor(
    private historiqueService:HistoriquePortefeuilleService,
    private activatedRoute:ActivatedRoute,
    private entrepriseService:EntrepriseService
  )
  {}


  ngOnInit():void
  { 
    this.historiqueService.getActionsPortfeuilles(this.idPortefeuille).toPromise().
    then((res)=>{
      console.log('res historique',res)
        this.historique=res 
        for(let i=0;i<this.historique.length;i++)
        { let newHistorique = {};
          newHistorique['dateOperation']=this.historique[i].dateOperation;
          newHistorique['nombreAction']=this.historique[i].nombreAction;
          newHistorique['typeInvestissement']=this.historique[i].typeInvestissement;
          newHistorique['prixInvestissement']=this.historique[i].prixInvestissement;
          newHistorique['idEntreprise']=this.historique[i].idEntreprise._id;
           this.entrepriseService.getoneEntreprise(this.historique[i].idEntreprise.nom).subscribe(
            (res)=>{
              newHistorique['nomEntreprise']=res.nom;
              this.listeHistorique.push(newHistorique);   
              this.listeHistorique.sort((a, b) => {
                const dateA = new Date(a.dateOperation);
                const dateB = new Date(b.dateOperation);
                return dateB.getTime() - dateA.getTime();
              });
              this.pageSlice = this.listeHistorique.slice(0, 5);
              this.loading=false;
            }
           )
        }
       });  
  }
//Pagination
onPageChangeHistorique(event) 
 {
      this.first = event.first;
      this.rows = event.rows;
      const startIndex = event.first ;
      let endIndex = startIndex + event.rows;
      if (endIndex > this.historique.length) {
        endIndex = this.historique.length;
      }
      this.pageSlice = this.historique.slice(startIndex, endIndex);
  }
}
