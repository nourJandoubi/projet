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
  pageSlice: Actualite[] = [];
  showText = false;
  searchTerm="";
  filteredItems: Actualite[] = [];



  
  onSearchTermChange(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;     
      let term = this.searchTerm ? this.searchTerm.toLowerCase() : '';
    
      if (term.trim() !== '') {
        this.filteredItems = this.actualites.filter(item => {
          if (typeof item.title === 'string') {
            this.pageSlice= this.filteredItems.slice(0,3);
            return item.title.toLowerCase().includes(term);
           
          }
          return false;
        });
      }
    
    
  }

  onPageChange(event) {
  
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredItems.length) {
      endIndex = this.filteredItems.length;
    }
    this.pageSlice = this.filteredItems.slice(startIndex, endIndex);
  }





  ngOnInit(): void {
    setTimeout(() => {
      this.actualiteService.getActualites().subscribe(data => {
        this.actualites = data;
        this.filteredItems=data;
        this.pageSlice= data.slice(0,3);

   
        for(let i=0; i<this.actualites.length; i++) {
      
          this.actualites[i].showText = false;
        }
        
      });
      
    }, 2000);
    setTimeout(() => {
      this.actionService.getActualites().subscribe(data => {
        this.actions = data;
        console.log(data);
      });
    }, 2000);
  }
}
