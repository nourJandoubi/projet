import { Component, createNgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clearConfigCache } from 'prettier';
import { Action } from 'src/app/models/action';
import { Actualite } from 'src/app/models/actualite';
import { ActionService } from 'src/app/services/action.service';
import { ActualiteService } from 'src/app/services/actualite.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
})
export class ActionsComponent {
  constructor(public actionService: ActionService, private route: ActivatedRoute, private router: Router) {}
  //a->z
  alpha = Array(26)
    .fill(0)
    .map((x, i) => String.fromCharCode(i + 65));

  actions: Action[] = [];
  location: string;
  pageNumber: any;
  pagination: any;
  pageSliceAction: Action[] = []; //pageSliceNews des action
  searchTermAction = ''; //search term des actions
  filteredItemsAction: Action[] = [];
  actionsFiltreParBousre: Action[] = [];

  //recherche par  nom entreprise
  onsearchTermActionChange(event: any) {
    this.searchTermAction = (event.target as HTMLInputElement).value;
    let term = this.searchTermAction ? this.searchTermAction.toLowerCase() : '';

    if (term.trim() !== '') {
      this.filteredItemsAction = this.actions.filter(item => {
        if (typeof item.nomEntreprise === 'string') {
          this.pageSliceAction = this.filteredItemsAction.slice(0, 8);
          return item.nomEntreprise.toLowerCase().includes(term);
        }
        return false;
      });
    }
    this.pageSliceAction = this.filteredItemsAction;
    this.pageSliceAction = this.pageSliceAction.slice(0, 10);
  }

  selectBourse(location: string, pageNumber: any): void {
    
    this.actionService.getActions(location, pageNumber).subscribe(data => {
      this.actionsFiltreParBousre = data.products;
      this.pagination = data.pages;
      console.log(this.actionsFiltreParBousre);

      // Filtrer et paginer les données ici
    });
  }

  // Pagination

  onPageChangeAction(event) {
    const startIndex = event.pageIndex * event.pageSize;

    let endIndex = startIndex + event.pageSize;
    if (this.location == undefined) {
      const route = '/home/paris/' + (event.pageIndex + 1);
      this.router.navigate([route]);
      this.ngOnInit();
    } else {
      const route = '/home/' + this.location + '/' + (event.pageIndex + 1);
      this.router.navigate([route]);
      this.ngOnInit();
    }

    if (endIndex > this.filteredItemsAction.length) {
      endIndex = this.filteredItemsAction.length;
    }
  }
  navigateToPlace(location: string) {
    const route = '/home/' + location + '/' + 1;
    this.router.navigate([route]);
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.location = params['location'];

      this.pageNumber = params['pageNumber'];
    });
    if (this.pageNumber == undefined && this.location == undefined) {
      this.selectBourse('paris', 1);
    } else {
      this.selectBourse(this.location, this.pageNumber);
    }
  }
}
