import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/models/action';
import { Actualite } from 'src/app/models/actualite';
import { ActionService } from 'src/app/services/action.service';
import { ActualiteService } from 'src/app/services/actualite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public actualiteService: ActualiteService,public actionService: ActionService) {}
  alpha = Array(26)
    .fill(0)
    .map((x, i) => String.fromCharCode(i + 65));
  actualites: Actualite[] = [];
  actions: Action[] = [];
  pageSliceNews: Actualite[] = [];//pageSliceNews des actualites
  searchTermNews="";//search term des actualites
  filteredItemsNews: Actualite[] = []; //filtred items des actualites apres utiliser le search term

  pageSliceAction: Action[] = [];//pageSliceNews des actualites
  searchTermAction="";//search term des actualites
  filteredItemsAction: Action[] = [];

  //filtrage
  onsearchTermNewsChange(event: any) {
    this.searchTermNews = (event.target as HTMLInputElement).value;     
      let term = this.searchTermNews ? this.searchTermNews.toLowerCase() : '';
    
      if (term.trim() !== '') {
        this.filteredItemsNews = this.actualites.filter(item => {
          if (typeof item.title === 'string') {
            this.pageSliceNews= this.filteredItemsNews.slice(0,3);
            return item.title.toLowerCase().includes(term);
           
          }
          return false;
        });
      }
      this.pageSliceNews=this.filteredItemsNews;
      this.pageSliceNews= this.pageSliceNews.slice(0,4);

    
    
  }
  onsearchTermActionChange(event: any) {
    this.searchTermAction = (event.target as HTMLInputElement).value;     
      let term = this.searchTermAction ? this.searchTermAction.toLowerCase() : '';
    console.log("term",term)
      if (term.trim() !== '') {
        this.filteredItemsAction = this.actions.filter(item => {
          if (typeof item.nomEntreprise === 'string') {
            this.pageSliceAction= this.filteredItemsAction.slice(0,8);
            return item.nomEntreprise.toLowerCase().includes(term);
           
          }
          return false;
        });
      }
      this.pageSliceAction=this.filteredItemsAction;
      this.pageSliceAction= this.pageSliceAction.slice(0,8);
    
  }



  //Pagination
  onPageChangeNews(event) {
  
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredItemsNews.length) {
      endIndex = this.filteredItemsNews.length;
    }
    this.pageSliceNews = this.filteredItemsNews.slice(startIndex, endIndex);
  }
  onPageChangeAction(event) {
  
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredItemsAction.length) 
    {
      endIndex = this.filteredItemsAction.length;
    }
    this.pageSliceAction= this.filteredItemsAction.slice(startIndex, endIndex);
  }





  ngOnInit(): void {
    setTimeout(() => {
      this.actualiteService.getActualites().subscribe(data => {
        this.actualites = data;
        this.filteredItemsNews=data;
        this.pageSliceNews= data.slice(0,4);

   
        for(let i=0; i<this.actualites.length; i++) {
      
          this.actualites[i].showText = false;
        }
        
      });
      
    }, 2000);
    setTimeout(() => {
      this.actionService.getActualites().subscribe(data => {
        this.actions = data;
        this.filteredItemsAction=data;
        this.pageSliceAction= data.slice(0,8);
        console.log(data);
      });
    }, 2000);
  }
}
