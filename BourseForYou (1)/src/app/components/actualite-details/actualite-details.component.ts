import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actualite } from 'src/app/models/actualite';
import { ActualiteService } from 'src/app/services/actualite.service';





@Component({
  selector: 'app-actualite-details',
  templateUrl: './actualite-details.component.html',
  styleUrls: ['./actualite-details.component.css'],
 
})
export class ActualiteDetailsComponent {
  actualiteId:string;
  actualites:Actualite;
  lienActualite:string;
  titre:string;
  description:string;
  resume:string


  constructor(private route: ActivatedRoute,public actualiteService: ActualiteService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actualiteId = params['id'];
     
    });
    this.actualiteService.getoneActualite(this.actualiteId).subscribe(data => {
      this.actualites = data;
      this.lienActualite=this.actualites.link;
      console.log(this.lienActualite);
      
      this.actualiteService.postScrapedData(this.lienActualite).subscribe(data=>{
        console.log(data)
       this.titre=data.titre;

       this.description=data.description;
       this.resume=data.resume;
       
      }
        )
      
  });
 
 
}
}
