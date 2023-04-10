import { Component, OnInit } from '@angular/core';

import { ActionService } from 'src/app/services/action.service';
import { ActualiteService } from 'src/app/services/actualite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public actualiteService: ActualiteService,public actionService: ActionService) {}
  

  ngOnInit(): void {
   
}
}
