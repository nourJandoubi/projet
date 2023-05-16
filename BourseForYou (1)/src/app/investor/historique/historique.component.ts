import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { HistoriquePortefeuilleService } from 'src/app/services/historique-portefeuille.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {
  idPortefeuille=this.activatedRoute.snapshot.params['id'];
  historique:any[]=[]
  first: number = 0;
  rows: number = 5;
  pageSlice:any[]=[];
  constructor(
    private historiqueService:HistoriquePortefeuilleService,
    private activatedRoute:ActivatedRoute
  )
  {}


  ngOnInit():void
  { 
    this.historiqueService.getActionsPortfeuilles(this.idPortefeuille).toPromise().
    then((res)=>{
        this.historique=res 
        this.historique.sort((a, b) => {
          const dateA = new Date(a.dateOperation);
          const dateB = new Date(b.dateOperation);
          return dateA.getTime() - dateB.getTime();
        });  
        this.pageSlice = this.historique.slice(0, 5);

       });

    
  }
    //Pagination
    onPageChangeHistorique(event) {
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
