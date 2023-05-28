import { IndiceService } from 'src/app/services/indice.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { PortefeuilleService } from 'src/app/services/portefeuille.service';

@Component({
  selector: 'app-ajouter-portefeuille',
  templateUrl: './ajouter-portefeuille.component.html',
  styleUrls: ['./ajouter-portefeuille.component.css']
})
export class AjouterPortefeuilleComponent {
  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private hhtp:HttpClient,
    private portefeuilleService:PortefeuilleService,
    private indiceService:IndiceService,

  )
  {}
  investisseur:any;
  portefeuilleForm:FormGroup;
  idInvestisseur:any;
  date = new Date();
  errorAjout:boolean;
  isLogedIn:boolean;
  listeIndices:any=[];
  selectedIndice:string="Nasdaq"

  ajouterPortefeuille()
  {
    // Mettre à jour l'attribut liquidites avec la valeur du soldeTotal
  const soldeTotal = this.portefeuilleForm.get('soldeTotal').value;
  this.portefeuilleForm.patchValue({ liquidites: soldeTotal });
  console.log('form',this.portefeuilleForm.value)
    this.portefeuilleService.ajouterPortefeuille(this.portefeuilleForm.value).subscribe(
      (res)=>
    {
      if(res.success)
    {
      this.errorAjout=false;
      this.router.navigate(['/listePortefeuille']);
    }
    else
    {
      this.errorAjout=true;
    }
    })
    
  }


  ngOnInit():void
  {
         
    this.isLogedIn =
    localStorage.getItem('TOKEN') != null &&
    localStorage.getItem('TOKEN') != 'undefined';
     console.log('login liste',this.isLogedIn)


    this.investisseur = JSON.parse(localStorage.getItem('currentUser'));
    this.idInvestisseur=this.investisseur._id;
    this.portefeuilleForm=this.formBuilder.group({
      nomPortefeuille:['',Validators.required],
      soldeTotal:['',Validators.required],
      prixTitres:new FormControl(0),
      liquidites:new FormControl(),
      dateCreation:new FormControl(this.date),
      indices:[this.selectedIndice,Validators.required],
      idUser:new FormControl(this.idInvestisseur),

    });
    this.indiceService.getAllIndice().subscribe(data => {
      this.listeIndices = data;
      this.listeIndices.sort((a, b) => {
        const nomA = a.name.toLowerCase();
        const nomB = b.name.toLowerCase();
        if (nomA < nomB) {
          return -1;
        }
        if (nomA > nomB) {
          return 1;
        }
        return 0;
      });
    });
    

  }

 

get nomPortefeuille()
{
  return this.portefeuilleForm.get('nomPortefeuille')
}

get soldeTotal()
{
  return this.portefeuilleForm.get('soldeTotal')
}

get indices()
{
  return this.portefeuilleForm.get('indices')
}

}
