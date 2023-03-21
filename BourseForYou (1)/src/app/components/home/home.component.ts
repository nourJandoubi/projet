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
  acualites: Actualite[] = [];
  actions: Action[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.actualiteService.getActualites().subscribe(data => {
        this.acualites = data;
        console.log(data);
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
