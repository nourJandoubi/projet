import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/models/action';
import { ActionService } from 'src/app/services/action.service';
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

  alpha = Array(26).fill(0).map((x, i) => String.fromCharCode(i + 65));
  actions:any[]=[];
  nomBourse: string;
  actionsFiltreParBourse: any[] = [];

  pageSize = 10;
  pageIndex = 0;
  length = 0;
  listeAction:any[]=[];


  //filtrage
  /*All()
  {
    this.filteredItemsAction=this.actionsFiltreParBourse=this.actions;
    this.pagination=this.dataPageTotal;

      this.actionsFiltreParBourse= this.actionsFiltreParBourse.slice(0,10);


  }*/
  All()
  {
    this.listeAction=this.actions;
    this.actionsFiltreParBourse=this.listeAction.slice(0,10);
    this.length=this.listeAction.length;
  }
 filterActionByLetter(letter:string)
 {

  //this.actionsFiltreParBourse;
  this.listeAction= this.actions.filter((item)=>
  
    {
      if (typeof item.entreprise === 'string' && item.entreprise.startsWith(letter))
       { 
        return item
        } 
        else
        {   
              return false;
        }
    
  });

  this.actionsFiltreParBourse= this.listeAction.slice(0,10);
  this.length = this.listeAction.length;
 }


 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nomBourse = params['nomBourse'];
      if (!this.nomBourse ) 
      {
        this.nomBourse = 'paris';
      }
      this.selectBourse(this.nomBourse);
      });

    }
  
  selectBourse(nomBourse: string): void {
    this.actionService.getActionsParBourse(nomBourse).subscribe(data => {
      this.actions = data;
      this.listeAction=this.actions;
      this.actionsFiltreParBourse = this.listeAction.slice(0, this.pageSize);
      this.length = this.listeAction.length;
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
      this.actionsFiltreParBourse = this.listeAction.slice(startIndex, endIndex);
    }
    
    
    }
