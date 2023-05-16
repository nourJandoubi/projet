import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/models/action';
import { ActionService } from 'src/app/services/action.service';
import { BourseService } from 'src/app/services/bourse.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  constructor(
    public actionService: ActionService,
    public bourseService: BourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  alpha = Array(26).fill(0).map((x, i) => String.fromCharCode(i + 65));
  bourse: any[] = [];
  nomBourse: string;
  bourseOptions: any[] = [];
  selectedOption: string = "NYSE";
  actionsFiltreParBourse: any[] = [];
  pageSize = 10;
  pageIndex = 0;
  length = 0;

  ngOnInit(): void {
    
    this.bourseService.getBourses().subscribe(data => {
      this.bourseOptions = data;
      console.log(this.bourseOptions);
      this.onSelectedOptionChange();
    });
    

  }

  onSelectedOptionChange(): void {
    this.bourseService.getBourseByName(this.selectedOption).subscribe(data => {
      this.bourse = data;
      console.log(this.bourse);

      this.actionsFiltreParBourse = this.bourse.slice(0, this.pageSize);
      this.length = this.bourse.length;
    });
  }

  onPageChange(event): void {
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.actionsFiltreParBourse = this.bourse.slice(startIndex, endIndex);
  }
}
