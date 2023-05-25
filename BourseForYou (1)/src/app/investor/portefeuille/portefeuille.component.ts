import { ActionService } from 'src/app/services/action.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PortefeuilleService } from 'src/app/services/portefeuille.service';
import { ActivatedRoute } from '@angular/router';
import { HistoriquePortefeuilleService } from 'src/app/services/historique-portefeuille.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ConvertisseurService } from 'src/app/services/convertisseur.service';

@Component({
  selector: 'app-portefeuille',
  templateUrl: './portefeuille.component.html',
  styleUrls: ['./portefeuille.component.css']
})
export class PortefeuilleComponent {
  constructor(
   private historiqueService:HistoriquePortefeuilleService,
   private activatedRoute:ActivatedRoute,
   private portefeuilleService:PortefeuilleService,
   private formBuilder:FormBuilder,
   private entrepriseService:EntrepriseService,
   private actionService:ActionService,
   private convertisseurService:ConvertisseurService
  )
  {}
  @ViewChild('myChart1') myChart1: ElementRef<HTMLCanvasElement>;

  actions:any[]=[];
  actions2:any[]=[];
  actionsDistinct:any[]=[];
  pourcentageAction:any[]=[];
  currencies:any[] = [];
  yValues:any[]=[100];
  xValues:any[]=['liquidites'];

  idPortefeuille=this.activatedRoute.snapshot.params['id'];
  portefeuille:any;

  gainPerte:FormGroup;
  venteForm:FormGroup;
  convertForm:FormGroup;
  pourcentageActionForm:FormGroup;

  visible: boolean;
  loading:boolean=true;
  quantityFilled: boolean = false;
  portefeuilleVide:boolean=false;

  prixVente:any=0;
  totalVente:any=0;
  quantiteVente:any=0;
  sommePourcentageAction:any=0;
  pourcentageLiquidite:any=100;

  idEntrepriseVendre:any;
  variation:any;
  haut:any;
  bas:any;

  indice:string;
  selectedOption:string='EUR';


showDialog(action:any)
{
      this.prixVente=action.prixActuel;
      this.visible = true;
      this.idEntrepriseVendre=action.idEntreprise;
      this.actionService.getActionByEntreprise(this.idEntrepriseVendre).subscribe(
        (res)=>{
          this.variation=res.variation;
          this.haut=res.haut;
          this.bas=res.bas;
        }
      )
  }

calculerTotalVente()
{ 
  if(this.venteForm.get('nombreAction').value)
    {    
      this.quantityFilled = true;
      this.quantiteVente=this.venteForm.get('nombreAction').value;
      this.totalVente=(this.prixVente*this.quantiteVente).toFixed(2);
    }
    else
    {
      this.quantityFilled=false;
      this.totalVente=0;
    }
}

  vendreAction()
  { 
    this.venteForm=this.formBuilder.group({ 
      nombreAction:[this.quantiteVente],
      prixInvestissement:[this.prixVente],
      idPortefeuille:[this.idPortefeuille],
      idEntreprise:[this.idEntrepriseVendre]
    })
    this.historiqueService.vendreAction(this.venteForm.value).subscribe((res)=>{
      window.location.reload();
    })
  }
  
convertir(from:string,to:string)
{ 
  this.loading=true;
  this.actions=[]
  this.actions2=[]
  this.portefeuille=[]
  
    /**Initialisation des FormGroup */
    this.convertForm=new FormGroup({
      amout:new FormControl(),
      from:new FormControl(),
      to:new FormControl()
    })
    this.venteForm=new FormGroup({
      nombreAction:new FormControl(),
      prixInvestissement:new FormControl(),
      idPortefeuille:new FormControl(),
      idEntreprise:new FormControl(),
    });
    this.pourcentageActionForm=new FormGroup({
      nombreAction:new FormControl(),
      prixInvestissement:new FormControl(),
      idPortefeuille:new FormControl(),
      liquidites:new FormControl(),
    });
    /**Fin initiaslisation du FormGroup */




    this.portefeuilleService.getPortefeuilleById(this.idPortefeuille).toPromise().
    then(
      (res)=>
          {
            this.portefeuille=res;
            console.log('portefeuille',this.portefeuille)
            this.indice=res.indice;
            /**liqudites */
            this.convertForm=this.formBuilder.group
            ({ 
              amount:[this.portefeuille.liquidites],
              from:[from],
              to:[to]
            });
            this.convertisseurService.convert(this.convertForm.value).toPromise()
              .then(
                (res)=>
                  {
                    this.portefeuille.liquidites=res.convertedAmount;
                  }
                )
            /**fin liquidites */
            /**prix Titres */
            this.convertForm=this.formBuilder.group
            ({ 
              amount:[this.portefeuille.prixTitres],
              from:[from],
              to:[to]
            });
            this.convertisseurService.convert(this.convertForm.value).toPromise()
             .then(
                (res)=>
                  {
                  this.portefeuille.prixTitres=res.convertedAmount;
                  }
                )
            /**fin prix Titres */
            /**solde Total */
            this.convertForm=this.formBuilder.group
            ({ 
              amount:[this.portefeuille.soldeTotal],
              from:[from],
              to:[to]
            });
            this.convertisseurService.convert(this.convertForm.value).toPromise()
              .then(
                (res)=>
                  {
                   this.portefeuille.soldeTotal=res.convertedAmount;
                  }
                )
            /**fin solde total */
          }
      //fin then getPortefeuilleById
       )
    .then(
        ()=>
          {
            this.historiqueService.getActionsPortfeuilles(this.idPortefeuille).toPromise().
            then((res)=>
            {
              this.actions=res;
              if(this.actions.length==0)
              {
                this.portefeuilleVide=true;
                this.loading=false;
              }

              console.log('action1',this.actions)
              const actionsGrouped = this.actions.reduce((groups, action) => {
                const symbol = action.idEntreprise._id;
                if (!groups[symbol]) {
                  groups[symbol] = { ...action, nombreAction: 0 };
                }
                if(action.typeInvestissement=='achat')
                groups[symbol].nombreAction += action.nombreAction;
                if(action.typeInvestissement=='vente')
                groups[symbol].nombreAction -= action.nombreAction;

                return groups;
              }, {}); 
              this.actionsDistinct = Object.values(actionsGrouped);

              for (let i = 0; i < this.actionsDistinct.length; i++) {
                let newAction = {}; // créez un nouvel objet pour chaque action
                newAction['idPortefeuille']=this.actionsDistinct[i].idPortefeuille;
                newAction['idEntreprise']=this.actionsDistinct[i].idEntreprise._id;
                newAction['nombreAction'] = this.actionsDistinct[i].nombreAction;
                  /**prix investissement */
                  this.convertForm=this.formBuilder.group
                  ({ 
                    amount:[this.actionsDistinct[i].prixInvestissement],
                    from:[from],
                    to:[to]
                  });
                  this.convertisseurService.convert(this.convertForm.value).toPromise()
                  .then(
                    (result)=>
                    {
                      newAction['prixInvestissement'] = result.convertedAmount;
                      newAction['capital'] = (this.actionsDistinct[i].nombreAction*result.convertedAmount).toFixed(2); 
                    }
                  )
                  .then(
                    ()=>{
                      this.actionService.getActionByEntreprise(this.actionsDistinct[i].idEntreprise._id).toPromise().
                      then(
                        (res)=>
                        {
                          console.log('action portefeuilleee',this.actionsDistinct[i].idEntreprise.nom,'==>',res);
                            /**prix actuel */
                            this.convertForm=this.formBuilder.group
                            ({ 
                              amount:[res.cours],
                              from:[from],
                              to:[to]
                            });
                            this.convertisseurService.convert(this.convertForm.value).toPromise()
                            .then(
                              (result)=>
                              {
                                newAction['prixActuel']=result.convertedAmount;
                                this.gainPerte=new FormGroup({
                                  prixAchat:new FormControl(newAction['prixInvestissement']),
                                  prixActuel:new FormControl(newAction['prixActuel']),
                                  nombreActions:new FormControl(newAction['nombreAction'])
                                });
                                this.historiqueService.calculerGainPerte(this.gainPerte.value).toPromise()
                                .then((gain)=>
                                  { 
                                    newAction['gain']=gain.gainPrix;
                                    newAction['gainP']=gain.gainPourcentage;
                                  })
                              }
                            )
                         }
                       )
                     }
                   )
                this.entrepriseService.getoneEntreprise(this.actionsDistinct[i].idEntreprise.nom).toPromise()
                .then(
                  (res)=>{
                    newAction['nomEntreprise']=res.nom;
                  }
                )                
                this.actions2.push(newAction);
              //calculer pourcentage par action
              this.pourcentageActionForm=this.formBuilder.group({
                nombreAction:[this.actionsDistinct[i].nombreAction],
                prixInvestissement:[this.actionsDistinct[i].prixInvestissement],
                idPortefeuille:[this.idPortefeuille],
                liquidites:[this.portefeuille.liquidites],
              });
              this.historiqueService.pourcentageAction(this.pourcentageActionForm.value).toPromise().
                then((res)=>
                { 
                  this.sommePourcentageAction+=parseFloat(res.pourcentage);
                  let newAction={};
                  this.entrepriseService.getoneEntrepriseById(this.actionsDistinct[i].idEntreprise._id).toPromise()
                  .then(
                    (result)=>{
                      newAction['idEntreprise']=result.nom;
                      newAction['pourcentage']=res;
                      this.pourcentageAction.push(newAction);
                    }
                  )
                  .then(()=>
                  {
                    this.pourcentageLiquidite=100-this.sommePourcentageAction;
                    if(this.pourcentageAction.find(f=>f['idEntreprise']=='liquidites'))
                    {
                    this.pourcentageAction.forEach((pourcentage) => {
                      if (pourcentage['idEntreprise'] === 'liquidites') {
                        pourcentage['pourcentage']=this.pourcentageLiquidite;
                      }
                    });
                    }
                    else
                    {
                      let newAction={};
                      newAction['idEntreprise']='liquidites';
                      newAction['pourcentage']=this.pourcentageLiquidite;
                      this.pourcentageAction.push(newAction);
                  }})
                  .then(()=>
                  {
                    this.yValues=[];
                    this.xValues=[];
                    for (let i = 0; i < this.pourcentageAction.length; i++) {
                      const pourcentage = this.pourcentageAction[i];
                        if(!(this.yValues.find(f=>f==pourcentage['pourcentage'])||this.xValues.find(f=>f==pourcentage['idEntreprise'])))
                        {
                          if(pourcentage['pourcentage'].pourcentage)
                          {                  
                            this.yValues.push(parseFloat(pourcentage['pourcentage'].pourcentage));
                          }
                          else
                          {
                            this.yValues.push(pourcentage['pourcentage']);
                          }                 
                          this.xValues.push(pourcentage['idEntreprise']);
                        }
                    }
                    this.loading=false;
                  })
                })
              }
            })
          }
      )


      setTimeout(() => {  
        console.log('xValues',this.xValues)
        console.log('yValue',this.yValues)
        if(this.xValues.length!=1)
        {
          const barColors = [
            "#b91d47","#00aba9","#2b5797","#e8c3b9","#1e7145","#F1948A","#F18AE5","#8AE0F1","#8AF1BC","#A9F18A","#F1CD8A","#A16E6E"
          ];
          new Chart("myChart1", {
            type: "pie",
            data: {
              labels: this.xValues.map((label, index) => `${label} ${this.yValues[index]}%`),
              datasets: [{
                backgroundColor: barColors,
                data: this.yValues, 
              }]
            },
            options: {
             layout: {
               padding: {
                 top: 20 // Modifier la valeur du margin-top ici
               }
             },
             plugins: {
               legend: {
                 position: "right" // Modifier la position de la légende ici (peut être "top", "left", "right" ou "bottom")
               }
             },
             responsive: true,
             maintainAspectRatio: false, // Modifier cette valeur à false pour permettre le redimensionnement du chart
           }
          });
        }
        
         }, 5000); 
}
  ngOnInit():void
  {    
    this.convertisseurService.getCurrencies().toPromise()
    .then((res) => {
      this.currencies = JSON.parse(res).map((currency) => {
        return {
          symbol: currency.symbol,
          name: currency.name
        };
      });  
      this.currencies.sort((a, b) => {
        const nameA = a.symbol.toUpperCase();
        const nameB = b.symbol.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
    });
    this.convertir('EUR','EUR')
  }

}
