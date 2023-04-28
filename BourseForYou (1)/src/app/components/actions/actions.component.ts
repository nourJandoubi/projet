import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ActionService } from 'src/app/services/action.service';
import { Action } from 'src/app/models/action';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  constructor(
    public actionService: ActionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //actions: Action[] = [];
  actions:any;
  location: string;
  pageNumber: any;
  pagination: any;
  pageSliceAction:any; //pageSliceNews des action
  searchTermAction = ''; //search term des actions
  filteredItemsAction: any;
  actionsFiltreParBousre:any;
  dataPageTotal:any;

  currentLink = 'paris';


  //filtrage
  All()
  {
    this.filteredItemsAction=this.actionsFiltreParBousre=this.actions;
    this.pagination=this.dataPageTotal;

      this.actionsFiltreParBousre= this.actionsFiltreParBousre.slice(0,10);


  }
 filterActionByLetter(letter:string)
 { console.log('letter',letter)
 console.log('action f',this.actionsFiltreParBourse)
 console.log('action',this.actions)

  //this.actionsFiltreParBousre;
  let a= this.actions.filter((item)=>
  
    {
      if (typeof item.entreprise === 'string' && item.entreprise.startsWith(letter))
       { console.log('item name',item.entreprise)
        return item
        } 
        else
        {   
              return false;
        }
    
  });
  console.log('action filter',a)
  //this.pagination=this.actionsFiltreParBousre.length;

  //this.actionsFiltreParBousre= this.actionsFiltreParBousre.slice(0,10);

 }


  alpha = Array(26).fill(0).map((x, i) => String.fromCharCode(i + 65));

  nomBourse: string;
  actionsFiltreParBourse: any[] = [];
  pageSize = 10;
  pageIndex = 0;
  length = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nomBourse = params['nomBourse'];
      }
    );
  
    
  /*selectBourse(location: string, pageNumber: any): void {
    
    this.actionService.getActions(location, pageNumber).subscribe(data => {
      this.actions=data.products;
      this.actionsFiltreParBousre = data.products;
      this.dataPageTotal=data.pages;
      this.pagination = data.pages;
      console.log("actionsFiltreParBourse",this.actionsFiltreParBousre);
      console.log("pagination",this.pagination)
      console.log('actions select',this.actions)*/
      if (!this.nomBourse ) {
        this.nomBourse = 'paris';
      }

      this.selectBourse(this.nomBourse);
    }
  

  selectBourse(nomBourse: string): void {
    this.actionService.getActionsParBourse(nomBourse).subscribe(data => {
      this.actions = data;
      console.log('nnnn',this.actions[0].entreprise);
      this.actionsFiltreParBourse = this.actions.slice(0, this.pageSize);
  
      this.length = this.actions.length;
    });
  }
  

  navigateToPlace(nomBourse: string): void {
    const route = `/home/${nomBourse}`;
    this.router.navigate([route]);
  }

  onPageChange(event): void {
  this.pageIndex = event.pageIndex;
  const startIndex = this.pageIndex * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.actionsFiltreParBourse = this.actions.slice(startIndex, endIndex);
}

  
}
