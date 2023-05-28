import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PortefeuilleService } from 'src/app/services/portefeuille.service';
import { Component } from '@angular/core';
import { IndiceService } from 'src/app/services/indice.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent {
  alpha = Array(26).fill(0).map((x, i) => String.fromCharCode(i + 65));
  listeIndice:any=[];
  indices:any[]=[];
  pageSize = 8;
  pageIndex = 0;
  length = 0;
  indicesFiltred:any[]=[];
  loading:boolean=true;
  idPortefeuille:any;
  indiceForm:FormGroup;
  visible=false;
  investisseur: any;

  idInvestisseur: any;
  isLogedIn:boolean;
  listePortfeuille:any[]=[];
  listeVide:boolean=false;
  constructor( 
    private indiceService:IndiceService,
    private portefeuilleService:PortefeuilleService,
    private router:Router,

  ){}
  ngOnInit(): void {
    

    this.indiceService.getAllIndice().subscribe(data=>{
      this.indices = data;
      this.indicesFiltred = this.indices.slice(0, this.pageSize);
      this.length=this.indices.length;
      this.loading=false;
    
    })
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

    
  }
}
  modal(indice:any)
  {
    this.visible=true;
    this.indiceForm= new FormGroup({
      indice:new FormControl(indice)
    })

  }
  selectionnerIndice(id:any)
  {
    this.idPortefeuille=id;
   
    this.portefeuilleService.ajouterIndice(this.idPortefeuille,this.indiceForm.value).subscribe(
      ()=>{
        this.router.navigate(['/portefeuille',this.idPortefeuille]);

      }
    )
  }
  All()
  {
    this.listeIndice=this.indices;
    this.indicesFiltred=this.listeIndice.slice(0,8);
    this.length=this.listeIndice.length;
  }
 filterIndiceByLetter(letter:string)
 { 
    this.listeIndice= this.indices.filter((item)=>
    {
      const itemName = item.name.toUpperCase();
      if (typeof item.name === 'string' && itemName.startsWith(letter))
       {return item} 
        else
        {return false;}
  });
  this.indicesFiltred= this.listeIndice.slice(0,8);
  this.length = this.listeIndice.length;

 }
  onPageChange(event): void {
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.indicesFiltred = this.indices.slice(startIndex, endIndex);
  }
}



