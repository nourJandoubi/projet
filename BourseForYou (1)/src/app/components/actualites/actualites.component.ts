import { Component } from '@angular/core';
import { Actualite } from 'src/app/models/actualite';
import { ActualiteService } from 'src/app/services/actualite.service';
import { faSignOut,faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css'],
})
export class ActualitesComponent {
  
  constructor(public actualiteService: ActualiteService) {}
  alpha = Array(26)
    .fill(0)
    .map((x, i) => String.fromCharCode(i + 65));
  actualites: Actualite[] = [];
  pageSliceNews: Actualite[] = []; //pageSliceNews des actualites
  searchTermNews = ''; //search term des actualites
  filteredItemsNews: Actualite[] = []; //filtred items des actualites apres utiliser le search term
  searchTermAction = ''; //search term des actualites
  first: number = 0;
  rows: number = 5;
  faSignOut=faSignOut;
  faClockRotateLeft=faClockRotateLeft;
//-----------------------------
selectedActualite:any={};
lienActualite:string;
titre:string;
description:string;
resume:string;
detailsExists:boolean=false;
loading:boolean=true;

selecterActualite(actualite:any)
  { 
    this.titre="";
    this.resume=""
    this.description="";
    this.selectedActualite={};
    this.lienActualite="";
    this.loading=true;
    this.selectedActualite=actualite
    this.lienActualite=actualite.link;
    this.actualiteService.postScrapedData(this.lienActualite).subscribe(data=>
      {
        this.titre=data.titre;
        this.description=data.description;
        this.resume=data.resume;
        this.detailsExists=true;
        this.loading=false;   
     })
}
  onPageChange(event) {
      this.first = event.first;
      this.rows = event.rows;
  }
  //filtrage
  onsearchTermNewsChange(event: any) {
    this.searchTermNews = (event.target as HTMLInputElement).value;
    let term = this.searchTermNews ? this.searchTermNews.toLowerCase() : '';
    if (term.trim() !== '') {
      this.filteredItemsNews = this.actualites.filter(item => {
        if (typeof item.title === 'string') {
          this.pageSliceNews = this.filteredItemsNews.slice(0, 5);
          return item.title.toLowerCase().includes(term);
        }
        return false;
      });
    }
    this.pageSliceNews = this.filteredItemsNews;
    this.pageSliceNews = this.pageSliceNews.slice(0, 5);
  }
  //Pagination
  onPageChangeNews(event) {
    this.first = event.first;
    this.rows = event.rows;
    const startIndex = event.first ;
    let endIndex = startIndex + event.rows;
    if (endIndex > this.filteredItemsNews.length) {
      endIndex = this.filteredItemsNews.length;
    }
    this.pageSliceNews = this.filteredItemsNews.slice(startIndex, endIndex);
  }
  ngOnInit(): void {
    this.actualiteService.getActualites().subscribe(data => {
      this.actualites = data;
      this.loading=false;
      this.filteredItemsNews = data;
      this.pageSliceNews = data.slice(0, 5);     
    });
  }
}
