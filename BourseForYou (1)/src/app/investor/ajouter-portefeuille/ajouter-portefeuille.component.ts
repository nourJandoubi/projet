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
    private profilleService:PortefeuilleService

  )
  {}
  investisseur:any;
  portefeuilleForm:FormGroup;
  idInvestisseur:any;
  date = new Date();
  errorAjout:boolean;
  isLogedIn:boolean;

  ajouterPortefeuille()
  {
    // Mettre à jour l'attribut liquidites avec la valeur du soldeTotal
  const soldeTotal = this.portefeuilleForm.get('soldeTotal').value;
  this.portefeuilleForm.patchValue({ liquidites: soldeTotal });
    this.profilleService.ajouterPortefeuille(this.portefeuilleForm.value).subscribe(
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
      indice:['',Validators.required],
      idUser:new FormControl(this.idInvestisseur),

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

get indice()
{
  return this.portefeuilleForm.get('indice')
}

}
