import { EntrepriseService } from './../../services/entreprise.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PortefeuilleService } from 'src/app/services/portefeuille.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/models/action';
import { ActionService } from 'src/app/services/action.service';
import { BourseService } from 'src/app/services/bourse.service';
import { HistoriquePortefeuilleService } from 'src/app/services/historique-portefeuille.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  searchTermActions: string;
  allActions: any[]=[];
  allactionsFiltred: any;
  actionf: any[]=[];
  constructor(
    public actionService: ActionService,
    public bourseService: BourseService,
    private router: Router,
    private formBuilder:FormBuilder,
    private historiqueService:HistoriquePortefeuilleService,
    private portefeuilleService:PortefeuilleService,
    private entrepriseService:EntrepriseService

  ) {}

  alpha = Array(26).fill(0).map((x, i) => String.fromCharCode(i + 65));
  actions:any[]=[];
  bourse: any[] = [];
  nomBourse: string;
  bourseOptions: any[] = [];
  selectedOption: string="" 
  secteurOption:string=""
  actionsFiltreParBourse: any[] = [];

  pageSize = 8;
  pageIndex = 0;
  length = 0;
  listeAction:any[]=[];
  investisseur: any;
  idInvestisseur: any;
  listePortfeuille:any[]=[];
  listeVide:boolean=false;
  isLogedIn:boolean;
  idEntreprise:any={};
  idPortefeuille:any;
  nomEntreprise:any;
  achatForm:FormGroup;
  rechercheForm:FormGroup;

  totalAchat:any;
  soldeDispo:any;
  quantityFilled: boolean = false;
  quantiteAchat:any;
  prixAchat:any;
  action:any;
  variation:any;
  haut:any;
  bas:any;
  visible: boolean;
  visible2:boolean;
  idAction:any;
  loading:boolean=true;
  listeSecteurs:any[]=[];
  liquiditeInsuffisante:boolean=false;
  formInvalid:boolean=true;
  chercherInvalid:boolean=true;


modal1(action:any)
  { this.visible2=true; 
    this.action=action;
     this.idAction=action._id;
     this.nomEntreprise=action.nomEntreprise.nom;
     this.prixAchat=action.cours;
     this.variation=action.variation;
     this.haut=action.haut;
     this.bas=action.bas;
     this.idEntreprise=action.nomEntreprise._id;
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
  {    this.liquiditeInsuffisante=false;
    
    this.formInvalid=false;
    this.quantityFilled = true;
    this.quantiteAchat=this.achatForm.get('nombreAction').value;
    this.totalAchat=(this.prixAchat*this.quantiteAchat).toFixed(2);
    if(this.totalAchat>this.soldeDispo)
    {
     this.liquiditeInsuffisante=true;
     this.formInvalid=true;
    }
    
    
  }
  else
  {
    this.quantityFilled=false;
    this.totalAchat=0;
  }
}
acheterAction()
{
  console.log('entreprise',this.idEntreprise.nom)
  this.achatForm=this.formBuilder.group({ 
    nombreAction:[this.quantiteAchat],
    prixInvestissement:[this.prixAchat],
    idPortefeuille:[this.idPortefeuille],
    idEntreprise:[this.idEntreprise]
  })
  this.actionService.acheterAction(this.achatForm.value).subscribe(
    (res)=>{
      this.router.navigate(['/portefeuille',this.idPortefeuille]);
    }
  )
}
All()
  {
    this.allactionsFiltred=this.allActions;
    this.actionf=this.allActions
    this.actionsFiltreParBourse=this.allActions.slice(0,8);
    this.length=this.allActions.length;
    this.secteurOption=""
    this.selectedOption=""
    this.searchTermActions=""
    this.pageIndex=0
  }
 filterActionByLetter(letter:string)
 { this.pageIndex=0
    this.allactionsFiltred= this.actionf.filter((item)=>
    {const itemName = item.nomEntreprise.nom.toUpperCase();
      if (typeof item.nomEntreprise.nom=== 'string' && itemName.startsWith(letter))
       {return item} 
        else
        {return false;}
  });
  this.actionsFiltreParBourse= this.allactionsFiltred.slice(0,8);
  this.length = this.allactionsFiltred.length;
 }

 onsearchTermActionChange(event: any) {

  this.searchTermActions = (event.target as HTMLInputElement).value;
  console.log('recherceee',this.searchTermActions)

  let term = this.searchTermActions ? this.searchTermActions.toLowerCase() : '';
  if (term.trim() !== '') {
    this.pageIndex=0
    this.allactionsFiltred = this.actionf.filter(item => {
      if (typeof item.nomEntreprise.nom === 'string') {

       
        return item.nomEntreprise.nom.toLowerCase().includes(term);
      }
      return false;
    });

    this.length =this.allactionsFiltred.length;

    this.actionsFiltreParBourse = this.allactionsFiltred.slice(0, 8);

  }
  else
  {
    this.onSelectedOptionChange()
  }

}
  ngOnInit(): void {
    this.isLogedIn =
    localStorage.getItem('TOKEN') != null &&
    localStorage.getItem('TOKEN') != 'undefined';
    this.achatForm=new FormGroup({
      nombreAction:new FormControl(),
      prixInvestissement:new FormControl(),
      idPortefeuille:new FormControl(),
      idEntreprise:new FormControl(),
    })
    if(this.isLogedIn)
      {          
       this.investisseur = JSON.parse(localStorage.getItem('currentUser'));
       this.idInvestisseur=this.investisseur._id;     
       this.portefeuilleService.getPortefuilleByInvestor(this.idInvestisseur).toPromise()
      .then((res)=>
      {
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
    this.entrepriseService.getAllSecteur().subscribe(
      (res)=>{
        this.listeSecteurs=res;
      }
    )
    this.bourseService.getBourses().subscribe(data => {
      this.bourseOptions = data;
    });
    this.actionService.getActions().subscribe(
      (res)=>{
        this.allActions=res
        this.allactionsFiltred=res
        this.actionf=res
        this.actionsFiltreParBourse = res.slice(0, this.pageSize);
        this.loading=false;
        this.length =res.length;

    })
    }
  onSelectedOptionChange(): void {
  
    
      this.pageIndex=0
      this.loading=true;
      this.rechercheForm=new FormGroup({
        bourse:new FormControl(this.selectedOption),
        secteur:new FormControl(this.secteurOption)
      })
      this.entrepriseService.getActionByBourseAndSecteur(this.rechercheForm.value).subscribe(
        (res)=>{
          if(res.length==0)
          {
            this.actionsFiltreParBourse=[]
            this.loading=false;
          }
          else
          {
            if(res.length<8)
            {
              this.actionsFiltreParBourse=res
              this.allactionsFiltred=res

            }
            if(res.length>=8)
            {
              this.actionsFiltreParBourse = res.slice(0, this.pageSize);
              this.allactionsFiltred=res
              this.actionf=res

            }

            this.loading=false;
          }
          this.length =res.length;
        }
      )
    
  
    
  }

  onPageChange(event): void {
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.actionsFiltreParBourse = this.allactionsFiltred.slice(startIndex, endIndex);
  }

  get nombreAction()
{
  return this.achatForm.get('nombreAction')

}

}
