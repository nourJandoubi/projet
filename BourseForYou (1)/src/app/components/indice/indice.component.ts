import { Component } from '@angular/core';
import { IndiceService } from 'src/app/services/indice.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent {
  indices:any[]=[];
  pageSize = 8;
  pageIndex = 0;
  length = 0;
  indicesFiltred:any[]=[];
  constructor( 
    private indiceService:IndiceService,
  ){}
  ngOnInit(): void {

    this.indiceService.getAllSecteur().subscribe(data=>{
      this.indices = data;
      this.indicesFiltred = this.indices.slice(0, this.pageSize);
      console.log('indicefiltre',this.indicesFiltred)
      console.log(this.indices)
    })


    
  }
  onPageChange(event): void {
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.indicesFiltred = this.indices.slice(startIndex, endIndex);
  }
}



