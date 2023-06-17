import { AuthentificationService } from './../../services/authentification.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { faSignOut,faDirections } from '@fortawesome/free-solid-svg-icons';
import { VisitorsService } from 'src/app/services/visitors.service';
import { AdminService } from 'src/app/services/admin.service';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent {
  @ViewChild('myCanvas1') myCanvas1: ElementRef<HTMLCanvasElement>;
  @ViewChild('myCanvas2') myCanvas2: ElementRef<HTMLCanvasElement>;
  @ViewChild('myCanvas3') myCanvas3: ElementRef<HTMLCanvasElement>;
  @ViewChild('content1') content1: ElementRef;
  @ViewChild('content2') content2: ElementRef;
  @ViewChild('content3') content3: ElementRef;

  makePdf(i:any) {
   const element1 = this.content1.nativeElement;
   const element2 = this.content2.nativeElement;
   const element3 = this.content3.nativeElement;
   const opt = {
     margin:       1,
     filename:     'rapport_Visiteurs.pdf',
     image:        { type: 'jpeg', quality: 0.98 },
     html2canvas:  { scale: 0.5 },
     jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' },
     page_size: 'A3'
   };
 if(i==1)
   html2pdf().set(opt).from(element1).save();
   if(i==2)
   html2pdf().set(opt).from(element2).save();
   if(i==3)
   html2pdf().set(opt).from(element3).save();
 }
    loading:boolean=true; 
    today: string;
    day:string="";
    typeSelect=[
        {name:'jour'},
        {name:'mois'},
        {name:'annee'},
    ];

    todaydate = new Date();
    months: any[] = [
        {name: 'Janvier', value: 1},
        {name: 'Février', value: 2},
        {name: 'Mars', value: 3},
        {name: 'Avril', value: 4},
        {name: 'Mai', value: 5},
        {name: 'Juin', value: 6},
        {name: 'Juillet', value: 7},
        {name: 'Août', value: 8},
        {name: 'Septembre', value: 9},
        {name: 'Octobre', value: 10},
        {name: 'Novembre', value: 11},
        {name: 'Décembre', value: 12}
      ];
      years: number[] = [];
  

//Visitors
  totalVisitors:number;
  tabVisitorsByMonth:any[]=[];
  tabVisitorsByYear:any[]=[];
  tabVisitorsLastWeek:any[]=[];
  totalLastWeekV:any;
  totalDayV:any; 
  totalMonthV:any;
  totalYearV:any;
  selectedYearVM = this.todaydate.getFullYear();
  selectedYearVY:number = this.todaydate.getFullYear();
  selectedMonthVM = this.todaydate.getMonth() + 1;
  labelVisitorsByMonth:any[]=[]
  dataVisitorsByMonth:any[]=[]
  labelVisitorLastWeek:any[]=[]
  dataVisitorsLastWeek:any[]=[]
  labelVisitorByYear:any[]=[]
  dataVisitorsByYear:any[]=[]
  
  constructor(
    private authentificationService:AuthentificationService,
    public visitorService:VisitorsService,
    public adminService:AdminService)
    {     }
 visitorsYear(year: any) 
{
  for (let i = 1; i < 13; i++) 
  {
    this.adminService.getVisitorsByMonth(year,i).subscribe((response)=>
    {
        this.tabVisitorsByYear[i]=response.visiteurs;
    });
  }    
}
visitorsMonth(year:any,month:any)
{
    let d = 30;
    if (month in [1, 3, 5, 7, 8, 10, 12]) {
    d = 31;
    } else if (month == 2) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        d = 28;
    } 
    else {
        d = 29;
    }
    } 
    const promises = [];
    for (let i = 0; i < d; i++) {
      const day = year + '-' + month + '-' + (i+1);
      promises.push(
        this.adminService.getVisitorsByDay(day).toPromise()
          .then((response: any) => {
            if (response.total == undefined) {
              this.tabVisitorsByMonth[day] = 0;
            } 
            else {
              this.tabVisitorsByMonth[day] = response.total;
              this.labelVisitorsByMonth.push(day);
              this.labelVisitorsByMonth.sort((a: Date, b: Date) => Date.parse(a.toString()) - Date.parse(b.toString()));
              this.dataVisitorsByMonth.push(response.total);
            }
          }) 
      );   
    }     
    this.adminService.getVisitorsByMonth(year,month).subscribe((response)=>
    {
        this.totalMonthV=response.total;
    });   
}

ngOnInit() {
  const now = new Date();
  this.today = now.toISOString().substring(0, 10);
  const year = new Date().getFullYear();
  for (let i = year - 40; i <= year; i++) {
    this.years.push(i);
  }
this.visitorsYear(this.selectedYearVY)
this.visitorsMonth(this.selectedYearVM,this.selectedMonthVM)
//---------------Visitors---------------------------------//  
     this.adminService.getTotalVisitors().subscribe((response: any) => {
      this.totalVisitors=response;
    });
    this.adminService.getVisitorsByYear(this.selectedYearVY).subscribe((response)=>
    { 
        this.totalYearV=response.total;
    });
    this.adminService.getVisitorsByMonth(this.selectedYearVM,this.selectedMonthVM).subscribe((response)=>
    {
        this.totalMonthV=response.total;
    });
    this.adminService.getVisitorsByLastWeek().toPromise().then((response)=>{
      this.totalLastWeekV=response.total;
      this.tabVisitorsLastWeek=response.visites;
      for(let i=0;i<this.tabVisitorsLastWeek.length;i++)
      {
        this.dataVisitorsLastWeek.push(this.tabVisitorsLastWeek[i].count)
        this.labelVisitorLastWeek.push((this.tabVisitorsLastWeek[i].date).split("T")[0])
      }
    })
    const requests = [];
    for (let i = 1; i < 13; i++) {
      requests.push(this.adminService.getVisitorsByMonth(year, i));
    } 
    forkJoin(requests).toPromise()
    .then((responses) => {
      for (let i = 0; i < responses.length; i++) {
        this.dataVisitorsByYear.push(responses[i].total);
        this.labelVisitorByYear.push(this.months.find(month => month.value === (i+1)).name);
      }

    })
    .then(
      ()=>{
        setTimeout(() => {
          const ctx = this.myCanvas1.nativeElement.getContext('2d');
          const ctx2 = this.myCanvas2.nativeElement.getContext('2d');
          const ctx3 = this.myCanvas3.nativeElement.getContext('2d');
        const chartData = {
            labels: this.labelVisitorLastWeek,
            datasets: [
              {
                label: `Nombre Visteurs Pour La Semaine Dernière`,
                data: this.dataVisitorsLastWeek,
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
                  text: 'Date',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: `Nombre Visiteurs`,
                },
              },
            },
          };
          //chart 2
          const monthObject = this.months.find(month => month.value === this.selectedMonthVM).name;
          const chartData2 = {
            labels: this.labelVisitorsByMonth,
            datasets: [
              {
                label: `Nombre Visteurs Pour Mois ${monthObject} `,
                data: this.dataVisitorsByMonth,
                backgroundColor: '#3F51B5',
                borderColor: '#3F51B5',
                borderWidth: 1,
                fill: true,
              },
            ],
          };  
          const chartOptions2 = {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: `Nombre Visiteurs`,
                },
              },
            },
          };
          //chart 3
          const chartData3 = {
            labels: this.labelVisitorByYear,
            datasets: [
              {
                label: `Nombre Visiteurs Pour ${this.selectedYearVY}`,
                data: this.dataVisitorsByYear,
                backgroundColor: '#3F51B5',
                borderColor: '#3F51B5',
                borderWidth: 1,
                fill: true,
              },
            ],
          };
          const chartOptions3 = {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Mois',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: `Nombre Visiteurs`,
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
                const myChart2 = new Chart(ctx2, {
                  type: 'bar',
                  data: chartData2,
                  options: chartOptions2,
                });
                const myChart3 = new Chart(ctx3, {
                  type: 'bar',
                  data: chartData3,
                  options: chartOptions3,
                });
              }, 500); 
      }
    )
    .then(
      ()=>{
          this.loading=false;
      }
    )
}

}
