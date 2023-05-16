import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent {
constructor(private route: ActivatedRoute,public entrepriseService: EntrepriseService){}
nom:any
entreprise:any={}
ngOnInit(): void {
   
  this.route.params.subscribe(params => {
    this.nom = params['nom'];
    console.log(this.nom)
    
   
    
   
  });
  this.entrepriseService.getoneEntreprise(this.nom).subscribe(data=>
    {
      this.entreprise=data
     console.log(this.entreprise)
    })
}
}
