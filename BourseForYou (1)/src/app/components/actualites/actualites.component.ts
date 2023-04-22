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
  faSignOut=faSignOut;
  faClockRotateLeft=faClockRotateLeft;
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

  rows: number = 4;
  
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
          this.pageSliceNews = this.filteredItemsNews.slice(0, 3);
          return item.title.toLowerCase().includes(term);
        }
        return false;
      });
    }
    this.pageSliceNews = this.filteredItemsNews;
    this.pageSliceNews = this.pageSliceNews.slice(0, 4);
  }

  //Pagination
  onPageChangeNews(event) {
    this.first = event.first;
    this.rows = event.rows;
    const startIndex = event.first * event.rows;
    let endIndex = startIndex + event.rows;
    if (endIndex > this.filteredItemsNews.length) {
      endIndex = this.filteredItemsNews.length;
    }
    this.pageSliceNews = this.filteredItemsNews.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    // setTimeout(() => {
    this.actualiteService.getActualites().subscribe(data => {
      this.actualites = data;
      this.filteredItemsNews = data;
      this.pageSliceNews = data.slice(0, 4);

     
    });

    // }, 9000);
  }
}
