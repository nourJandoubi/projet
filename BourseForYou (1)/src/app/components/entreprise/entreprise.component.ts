import { HistoriquePortefeuilleService } from './../../services/historique-portefeuille.service';
import { PortefeuilleService } from './../../services/portefeuille.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActionService } from 'src/app/services/action.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent {
constructor(
  private activatedroute: ActivatedRoute,
  private entrepriseService: EntrepriseService,
  private portefeuilleService:PortefeuilleService,
  private historiqueService:HistoriquePortefeuilleService,
  private formBuilder:FormBuilder,
  private router: Router,

  private actionService:ActionService
  ){}
  idEntreprise=this.activatedroute.snapshot.params['id'];
entreprise:any={};
loading:boolean=true;
action:any;

achatForm:FormGroup;
  totalAchat:any;
  soldeDispo:any;
  quantityFilled: boolean = false;
  quantiteAchat:any;
  prixAchat:any;
  variation:any;
  haut:any;
  bas:any;
  visible: boolean;
  visible2:boolean;
  idPortefeuille:any;
  listePortfeuille:any[]=[];
  listeVide:boolean=false;
  isLogedIn:boolean;
  investisseur: any;
  idInvestisseur: any;
  nom:any;


ngOnInit(): void {
   console.log('nom',this.idEntreprise)
  this.entrepriseService.getoneEntrepriseById(this.idEntreprise).toPromise().
  then((data)=>
    { console.log('dataaa',data)
      this.entreprise=data;
      this.nom=data.nom;
    })
    .then(
      ()=>{
        this.actionService.getActionByEntreprise(this.idEntreprise).toPromise()
          .then(
            (res)=>{
              this.loading=false;

              this.action=res;
            }
          )

      }
    );
    this.isLogedIn =
    localStorage.getItem('TOKEN') != null &&
    localStorage.getItem('TOKEN') != 'undefined';
    if(this.isLogedIn)
{          
       this.investisseur = JSON.parse(localStorage.getItem('currentUser'));
       this.idInvestisseur=this.investisseur._id;     
       this.portefeuilleService.getPortefuilleByInvestor(this.idInvestisseur).toPromise()
      .then((res)=>
      {
        this.listePortfeuille=res;
        console.log('liste portefeuille',this.listePortfeuille)
      })
     .then(()=>
      {
        if (this.listePortfeuille.length==0)
         {this.listeVide=true;}
        else
         {this.listeVide=false;}
      })


      this.achatForm=new FormGroup({
        nombreAction:new FormControl(),
        prixInvestissement:new FormControl(),
        idPortefeuille:new FormControl(),
        idEntreprise:new FormControl(),
      })
    }
    
}

modal1(action:any)
  { this.visible2=true; 
    this.action=action;
    
     this.prixAchat=action.cours;
     this.variation=action.variation;
     this.haut=action.haut;
     this.bas=action.bas;
    
  }
modal2(idP:any)
  {          
    this.visible = true;
    this.idPortefeuille=idP;
    this.portefeuilleService.getPortefeuilleById(this.idPortefeuille).subscribe(
      (res)=>{
        this.soldeDispo=res.liquidites;
      }
    )
  }
calculerTotalAchat()
{
  if(this.achatForm.get('nombreAction').value)
  {    
    this.quantityFilled = true;
    this.quantiteAchat=this.achatForm.get('nombreAction').value;
    this.totalAchat=(this.prixAchat*this.quantiteAchat).toFixed(2);
  }
  else
  {
    this.quantityFilled=false;
    this.totalAchat=0;
  }
}
acheterAction()
{
  this.achatForm=this.formBuilder.group({ 
    nombreAction:[this.quantiteAchat],
    prixInvestissement:[this.prixAchat],
    idPortefeuille:[this.idPortefeuille],
    idEntreprise:[this.idEntreprise]
  })
  this.historiqueService.acheterAction(this.achatForm.value).subscribe(
    (res)=>{
      console.log('achat',res)
      this.router.navigate(['/portefeuille',this.idPortefeuille]);

    }
  )
}
}
