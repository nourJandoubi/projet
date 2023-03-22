import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actualite } from 'src/app/models/actualite';
import { ActualiteService } from 'src/app/services/actualite.service';

@Component({
  selector: 'app-actualite-details',
  templateUrl: './actualite-details.component.html',
  styleUrls: ['./actualite-details.component.css']
})
export class ActualiteDetailsComponent {
  actualiteId:string;
  actualites:Actualite;

  constructor(private route: ActivatedRoute,public actualiteService: ActualiteService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actualiteId = params['id'];
     
    });
    this.actualiteService.getoneActualite(this.actualiteId).subscribe(data => {
      this.actualites = data;
      
  });
 
}
}
