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
  selectedOption: string = "NASDAQ";
  secteurOption:string="Financial Services"
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
  console.log('entreprise',this.idEntreprise.nom)
  this.achatForm=this.formBuilder.group({ 
    nombreAction:[this.quantiteAchat],
    prixInvestissement:[this.prixAchat],
    idPortefeuille:[this.idPortefeuille],
    idEntreprise:[this.idEntreprise]
  })
  this.historiqueService.acheterAction(this.achatForm.value).subscribe(
    (res)=>{
      this.router.navigate(['/portefeuille',this.idPortefeuille]);
    }
  )
}
All()
  {
    this.listeAction=this.bourse;
    this.actionsFiltreParBourse=this.listeAction.slice(0,10);
    this.length=this.listeAction.length;
  }
 filterActionByLetter(letter:string)
 {
    this.listeAction= this.bourse.filter((item)=>
    {
      if (typeof item.nomEntreprise.nom === 'string' && item.nomEntreprise.nom.startsWith(letter))
       {return item} 
        else
        {return false;}
  });
  this.actionsFiltreParBourse= this.listeAction.slice(0,10);
  this.length = this.listeAction.length;
 }
  ngOnInit(): void {
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
    this.entrepriseService.getAllSecteur().subscribe(
      (res)=>{
        this.listeSecteurs=res;
      }
    )
    this.bourseService.getBourses().subscribe(data => {
      this.bourseOptions = data;
      this.onSelectedOptionChange();
    });
    }
  onSelectedOptionChange(): void {
    this.loading=true;
    this.bourse=[];
    this.rechercheForm=new FormGroup({
      bourse:new FormControl(this.selectedOption),
      secteur:new FormControl(this.secteurOption)
    })
    this.entrepriseService.getActionByBourseAndSecteur(this.rechercheForm.value).subscribe(
      (res)=>{
        this.bourse=res;
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
          }
          if(res.length>=8)
          {
            this.actionsFiltreParBourse = res.slice(0, this.pageSize);
          }
          this.loading=false;
  
        }
        this.length =res.length;
      }
    )





    /*this.bourseService.getBourseByName(this.selectedOption).toPromise().
    then(data => {
      if(data.length==0)
      {
        this.actionsFiltreParBourse=[]
        this.loading=false;
      }
      else
      {
        for (let i = 0; i < data.length; i++) {
          const action = data[i];
          this.entrepriseService.getoneEntrepriseById(action.nomEntreprise._id).toPromise().then(
            (res) => {
              if (res.secteur === this.secteurOption) {
                this.bourse.push(action);
              }
        
            }
          ).then(
              ()=>{
                if(i==data.length-1)  
                {       
                   if(this.bourse.length>=8)
                   {
                      this.actionsFiltreParBourse = this.bourse.slice(0, this.pageSize);
  
                   }
                   else 
                     if(this.bourse.length<8)
                      {
                        if(this.bourse.length==0)
                        {
                          this.actionsFiltreParBourse=[]
                          this.loading=false;
                        }
                        this.actionsFiltreParBourse=this.bourse
  
                      }
  
  
                  this.loading=false;
  
                  this.length = this.bourse.length;
                }  
            
  
              }
          )
           
  
        }
      }
     
   
     
    })*/
   
  }

  onPageChange(event): void {
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.actionsFiltreParBourse = this.bourse.slice(startIndex, endIndex);
  }
}
