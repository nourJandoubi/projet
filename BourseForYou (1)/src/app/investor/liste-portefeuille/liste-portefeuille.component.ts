import { PortefeuilleService } from './../../services/portefeuille.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-portefeuille',
  templateUrl: './liste-portefeuille.component.html',
  styleUrls: ['./liste-portefeuille.component.css']
})
export class ListePortefeuilleComponent {
  investisseur: any;
  idInvestisseur: any;
  idPortfeuille:any;
  //nomP:any
  visible: boolean;
  listePortfeuille:any[]=[]
  listeVide:boolean=false;
  idP:any;
  isLogedIn:boolean;
  loading:boolean=true;
  
    showDialog(id:any) {

        this.visible = true;
        this.idP=id;
    }
  constructor
    (
      private portefeuilleService:PortefeuilleService,
    )
    {}
   
    ngOnInit():void
    { 

     
    this.isLogedIn =
    localStorage.getItem('TOKEN') != null &&
    localStorage.getItem('TOKEN') != 'undefined';
     console.log('login liste',this.isLogedIn)

if(this.isLogedIn)
      {
        this.investisseur = JSON.parse(localStorage.getItem('currentUser'));
      this.idInvestisseur=this.investisseur._id;
      this.portefeuilleService.getPortefuilleByInvestor(this.idInvestisseur).toPromise()
      .then((res)=>
      { console.log('liste',res)
      
        this.loading=false;
        this.listePortfeuille=res;
        
      })
     .then(()=>
      {
        if (this.listePortfeuille.length==0)
         {this.listeVide=true;}
        else
         {this.listeVide=false;}
      })
    }
    }


    supprimerPortefeuille(id:any)
    {
      this.portefeuilleService.supprimerPortefeuille(id).subscribe((res)=>{
        window.location.reload();
      })

    }
}
