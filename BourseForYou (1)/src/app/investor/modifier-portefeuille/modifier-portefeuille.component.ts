import { IndiceService } from 'src/app/services/indice.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PortefeuilleService } from './../../services/portefeuille.service';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-modifier-portefeuille',
  templateUrl: './modifier-portefeuille.component.html',
  styleUrls: ['./modifier-portefeuille.component.css']
})
export class ModifierPortefeuilleComponent {
  portefeuilleForm:FormGroup;
  idPortefeuille=this.activatedRoute.snapshot.params['id'];
  nomportefeuille:any;
  solde:any;
  errorModif:boolean;
  indices:any=[];
  selectedIndice:string="Nasdaq"
  item:any;
@Input()idP :any;
  constructor
  (
    private portefeuilleService:PortefeuilleService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private indiceService:IndiceService,
    private router: Router,


  )
  {}
  ngOnInit():void
   { 
     this.portefeuilleForm=new FormGroup(
      {
        nomPortefeuille:new FormControl(Validators.required),
        indice:new FormControl(),
        idUser:new FormControl(),
        prixTitres:new FormControl(),
        soldeTotal:new FormControl(),
        liquidites:new FormControl(),
        dateCreation:new FormControl(),
        selected:new FormControl()
     });
     this.indiceService.getAllIndice().subscribe(data => {
      this.indices = data;
      this.indices.sort((a, b) => {
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
     this.portefeuilleService.getPortefeuilleById(this.idPortefeuille).toPromise()
       .then((res)=>
         {
            this.nomportefeuille=res.nomPortefeuille;
            this.solde=res.liquidites;
            this.portefeuilleForm=this.formBuilder.group(
            {
              nomPortefeuille:[res.nomPortefeuille,Validators.required],
              indice:[res.indice],
              idUser:[res.idUser],
              prixTitres:[res.prixTitres],
              soldeTotal:[''],
              liquidites:[res.liquidites],
              dateCreation:[res.dateCreation],
              selected: []
           })
          })
     }
 
  modifierPortefeuille() 
    {
      const selected = this.portefeuilleForm.get('selected').value;
      const soldeTotal=this.portefeuilleForm.get('soldeTotal').value
      
      if (selected) 
      {
         this.portefeuilleForm.get('soldeTotal').setValue(Math.abs(soldeTotal));
      } 
      else
      {
         this.portefeuilleForm.get('soldeTotal').setValue(-Math.abs(soldeTotal));
      }
      this.portefeuilleService.modifierPortefeuille(this.idPortefeuille,this.portefeuilleForm.value).subscribe(
        (res)=>
        { 
          if(res.success)
          {
            this.errorModif=false;
            this.router.navigate(['/listePortefeuille']);
          }
          else
          {
            this.errorModif=true;
          }
        })
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
  get selected()
  {
    return this.portefeuilleForm.get('selected')
  }
}
