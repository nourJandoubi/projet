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
  actualites: any[] = [];
  pageSliceNews:any[] = []; //pageSliceNews des actualites
  searchTermNews = ''; //search term des actualites
  filteredItemsNews: any[] = []; //filtred items des actualites apres utiliser le search term
  searchTermAction = ''; //search term des actualites
  first: number = 0;
  rows: number = 5;
  faSignOut=faSignOut;
  faClockRotateLeft=faClockRotateLeft;
//-----------------------------
selectedActualite:any={};

detailsExists:boolean=false;
loading:boolean=true;

selecterActualite(actualite:any)
  {

    this.selectedActualite={};
    this.selectedActualite=actualite
  
     this.detailsExists=true;

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
        if (typeof item.newsTitle === 'string') {
         
          this.pageSliceNews = this.filteredItemsNews.slice(0, 5);
          return item.newsTitle.toLowerCase().includes(term);
        }
        return false;
      });
    }
    else
    {
      this.filteredItemsNews=this.actualites;
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
      console.log(this.actualites)
      this.loading=false;
      this.filteredItemsNews = data;
      this.pageSliceNews = data.slice(0, 5);     
    });
  }
}
