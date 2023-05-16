import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PortefeuilleService } from 'src/app/services/portefeuille.service';
import { ActivatedRoute } from '@angular/router';
import { HistoriquePortefeuilleService } from 'src/app/services/historique-portefeuille.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

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

  )
  {}
  @ViewChild('myChart1') myChart1: ElementRef<HTMLCanvasElement>;

  actions:any[]=[];
  idPortefeuille=this.activatedRoute.snapshot.params['id'];
  portefeuille:any;
  actions2:any[]=[];
  gainPerte:FormGroup;
  venteForm:FormGroup;
  visible: boolean;
  prixVente:any=0;
  totalVente:any=0;
  quantityFilled: boolean = false;
  idActionVendre:any;
  quantiteVente:any=0;
  actionsDistinct:any[]=[];
  sommePourcentageAction:any=0;
  pourcentageLiquidite=100;
  pourcentageAction:any[]=[];
  pourcentageActionForm:FormGroup;
  indice:string;
  yValues:any[]=[100];
  xValues:any[]=['liquidites'];

  showDialog(prixActuel:any,idAction:any) {
      this.prixVente=prixActuel;
      this.visible = true;
      this.idActionVendre=idAction;
     
  }

  calculerTotalVente()
  { if(this.venteForm.get('nombreAction').value)
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
    idAction:[this.idActionVendre]
  })
  console.log('vente',this.venteForm.value)
  this.historiqueService.vendreAction(this.venteForm.value).subscribe((res)=>{
    console.log('vente')
    window.location.reload();

  })
  }


  ngOnInit():void
  { 
    this.venteForm=new FormGroup({
    nombreAction:new FormControl(),
    prixInvestissement:new FormControl(),
    idPortefeuille:new FormControl(),
    idAction:new FormControl(),
  });
  this.pourcentageActionForm=new FormGroup({
    nombreAction:new FormControl(),
    prixInvestissement:new FormControl(),
    idPortefeuille:new FormControl(),
    liquidites:new FormControl(),
  });

  
   
  this.portefeuilleService.getPortefeuilleById(this.idPortefeuille).toPromise().
  then(
    (res)=>
    {
    this.portefeuille=res;
    this.indice=res.indice;
    }
  )
  .then(
    ()=>{
      this.historiqueService.getActionsPortfeuilles(this.idPortefeuille).toPromise().
      then((res)=>
      {
        this.actions=res;
        const actionsGrouped = this.actions.reduce((groups, action) => {
          const symbol = action.idAction._id;
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
          newAction['idAction']=this.actionsDistinct[i].idAction._id;
          newAction['nombreAction'] = this.actionsDistinct[i].nombreAction;
          newAction['prixInvestissement'] = this.actionsDistinct[i].prixInvestissement;
          newAction['capital'] = this.actionsDistinct[i].nombreAction*this.actionsDistinct[i].prixInvestissement; 
          newAction['prixActuel']=this.actionsDistinct[i].idAction.cours;
          this.gainPerte=new FormGroup({
            prixAchat:new FormControl(this.actionsDistinct[i].prixInvestissement),
            prixActuel:new FormControl(this.actionsDistinct[i].idAction.cours),
            nombreActions:new FormControl(this.actionsDistinct[i].nombreAction)
          });
          this.historiqueService.calculerGainPerte(this.gainPerte.value).toPromise().
          then((gain)=>
          {
            newAction['gain']=gain.gainPrix;
            newAction['gainP']=gain.gainPourcentage;
          })
          this.actions2.push(newAction); // ajoutez l'action nouvellement créée au tableau actions2


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
              newAction['idAction']=this.actionsDistinct[i].idAction._id;
              newAction['pourcentage']=res;
              this.pourcentageAction.push(newAction);

          })
          .then(()=>
          {
            this.pourcentageLiquidite=100-this.sommePourcentageAction;
            if(this.pourcentageAction.find(f=>f['idAction']=='liquidites'))
            {
          
            this.pourcentageAction.forEach((pourcentage, index) => {

              if (pourcentage['idAction'] === 'liquidites') {
                pourcentage['pourcentage']=this.pourcentageLiquidite;
              }
            });
            }
            else
            {
              let newAction={};
              newAction['idAction']='liquidites';
              newAction['pourcentage']=this.pourcentageLiquidite;
              this.pourcentageAction.push(newAction);
          }})
          .then(()=>
          {
            this.yValues=[];
            this.xValues=[];
            for (let i = 0; i < this.pourcentageAction.length; i++) {
    
              const pourcentage = this.pourcentageAction[i];
                if(!(this.yValues.find(f=>f==pourcentage['pourcentage'])||this.xValues.find(f=>f==pourcentage['idAction'])))
                {
                  if(pourcentage['pourcentage'].pourcentage)
                  {                  
                    this.yValues.push(parseFloat(pourcentage['pourcentage'].pourcentage));
                  }
                  else
                  {
                    this.yValues.push(pourcentage['pourcentage']);
                  }                 
                  this.xValues.push(pourcentage['idAction']);
                }
              
            }
        
          })
        }
       
        
       
     
      })
      .then(()=>{
     



      })
    }
      )
      
        
    
      

      

    
  }
  ngAfterViewInit() {
    
   //chart
   setTimeout(() => {  
    console.log('xValues',this.xValues)
    console.log('yValue',this.yValues)
     const barColors = [
       "#b91d47",
       "#00aba9",
       "#2b5797",
       "#e8c3b9",
       "#1e7145"
     ];
     
     new Chart("myChart1", {
       type: "pie",
       data: {
         labels: this.xValues,
         datasets: [{
           backgroundColor: barColors,
           data: this.yValues
         }]
       }
     });
     }, 5000); 
  }

 
}
