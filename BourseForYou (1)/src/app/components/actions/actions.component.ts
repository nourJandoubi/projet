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
  actions: Action[] = [];
  nomBourse: string;
  actionsFiltreParBourse: any[] = [];
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nomBourse = params['nomBourse'];
      if (!this.nomBourse ) {
        this.nomBourse = 'paris';
      }
      this.selectBourse(this.nomBourse);
    });
  }
  selectBourse(nomBourse: string): void {
    this.actionService.getActionsParBourse(nomBourse).subscribe(data => {
      this.actions = data;

      this.actionsFiltreParBourse = this.actions.slice(0, this.pageSize);

      this.length = this.actions.length;
    });
  }
  navigateToPlace(nomBourse: string): void {
    const route = `/home/${nomBourse}`;
    this.router.navigate([route]);}
    onPageChange(event): void {
      this.pageIndex = event.pageIndex;
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.actionsFiltreParBourse = this.actions.slice(startIndex, endIndex);
    }
    
    
    }