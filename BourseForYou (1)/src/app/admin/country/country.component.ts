import { AuthentificationService } from './../../services/authentification.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { faSignOut,faDirections } from '@fortawesome/free-solid-svg-icons';
import { VisitorsService } from 'src/app/services/visitors.service';
import { AdminService } from 'src/app/services/admin.service';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';


import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
   @ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement>;



   @ViewChild('content') content: ElementRef;
 
   makePdf() {
    const element = this.content.nativeElement;
    const opt = {
      margin:       1,
      filename:     'obrz.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
  
    html2pdf().set(opt).from(element).save();
  }
   visibleC:boolean;
  totalCountries:number;
  tabCountry:any[]=[];
  labelCountry:any[]=[];
  dataCountry:any[]=[];
 constructor(
    private authentificationService:AuthentificationService,
    public visitorService:VisitorsService,
    public adminService:AdminService)
    {     }
    ngOnInit()
    {
      this.adminService.getCountry().toPromise().then((response: any) => {
        this.tabCountry = response.usersByCountry;
        for(let i=0; i<this.tabCountry.length; i++) {
          this.labelCountry.push(this.tabCountry[i].country);
          this.dataCountry.push(this.tabCountry[i].count);
        }
      }).then(() => {
        console.log('ttt',this.labelCountry);
        console.log('dd',this.dataCountry);
      });
      this.adminService.getTotalCountries().subscribe((response:any)=>{
          this.totalCountries=response;
      });

/**--------------------------------------------------------------------------- */

/**---------------------------------------------------------------------------------- */

    }
    

ngAfterViewInit() {
  setTimeout(() => {   
    const ctx = this.myCanvas.nativeElement.getContext('2d');
    
  const chartData = {
      labels: this.labelCountry,
      datasets: [
        {
          label: `Nombre Investisseurs Par Pays`,
          data: this.dataCountry,
          backgroundColor: '#3F51B5',
          borderColor: '#3F51B5',
          borderWidth: 1,
          fill: true,
        },
      ],
    }; 
    const chartOptions = {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Pays',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: `Nombre Investisseurs`,
          },
        },
      },
    };
  
   
        // Create chart
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
          });
         
        }, 500); 
      }
    }