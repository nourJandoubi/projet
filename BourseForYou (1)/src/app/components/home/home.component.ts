import { Component, OnInit } from '@angular/core';
import { Actualite } from 'src/app/models/actualite';
import { ActualiteService } from 'src/app/services/actualite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public actualiteService: ActualiteService) {}
  alpha = Array(26)
    .fill(0)
    .map((x, i) => String.fromCharCode(i + 65));
  acualites: Actualite[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.actualiteService.getActualites().subscribe(data => {
        this.acualites = data;
        console.log(data);
      });
    }, 2000);
  }
}
