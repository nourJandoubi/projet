import { AuthentificationService } from './../../services/authentification.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { faSignOut,faDirections } from '@fortawesome/free-solid-svg-icons';
import { VisitorsService } from 'src/app/services/visitors.service';
import { AdminService } from 'src/app/services/admin.service';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import * as html2pdf from 'html2pdf.js';
import { InvestorService } from 'src/app/services/investor.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent {
 
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
  


//users
  
  totalUsers:number;

  tabUsersByMonth:any[]=[];
  tabUsersByYear:any[]=[];
  tabUsersLasstWeek:any[]=[];

  totalLastWeek:any;
  totalDayU:any; 
  totalMonthU:any;
  totalYearU:any;


  selectedYearUM = this.todaydate.getFullYear();
  selectedYearUY:number = this.todaydate.getFullYear();
  selectedMonthUM = this.todaydate.getMonth() + 1;

  labelUsersByMonth:any[]=[]
  dataUsersByMonth:any[]=[]
  labelUsersLastWeek:any[]=[]
  dataUsersLastWeek:any[]=[]
  labelUserByYear:any[]=[]
  dataUsersByYear:any[]=[]
   
  loading:boolean=true;
  constructor(
    private investorService:InvestorService,
    )
    {     }



usersLastWeek()
{
  this.investorService.getUsersByLastWeek().toPromise().
  then((response)=>{
     
     this.tabUsersLasstWeek=response.userss;

     const uniqueDates = new Set();

   for(let i=0; i<this.tabUsersLasstWeek.length; i++) {
     const date = (this.tabUsersLasstWeek[i].registeredAt).split("T")[0];
     uniqueDates.add(date);
   }

   this.labelUsersLastWeek = Array.from(uniqueDates);
     for(let i=0;i<this.labelUsersLastWeek.length;i++)
     {
       this.investorService.getUsersByDay(this.labelUsersLastWeek[i]).toPromise().then((response)=>{
         this.dataUsersLastWeek.push(response.total)
       })
     }
  
   }).then(() => {
     console.log('lasttt data',this.dataUsersLastWeek)
     console.log('last labeel',this.labelUsersLastWeek)
   });
   console.log('last labeel22',this.labelUsersLastWeek)
}

usersDay(day:any)
{
    this.investorService.getUsersByDay(day).subscribe((responses:any)=>
    {
        this.totalDayU= responses;
        if(this.totalDayU==undefined)
        {
          this.totalDayU=0;
        }
    })
}
usersMonth(year:any,month:any)
{
    
    let d = 30;
    if (month in [1, 3, 5, 7, 8, 10, 12]) {
    d = 31;
    } else if (month == 2) {
    // Vérifier si l'année est bissextile
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
        this.investorService.getUsersByDay(day).toPromise()
          .then((response: any) => {
            //idha n7eb nraj3ha tna7i les 0 badel el undefined eb 0
            if (response.total == undefined) {
              //hedhy zeyda 5ater manich nesta3mel fiha el tab hedhy 
              this.tabUsersByMonth[day] = 0;
            } else {
              this.tabUsersByMonth[day] = response.total;
              this.labelUsersByMonth.push(day);
              this.labelUsersByMonth.sort((a: Date, b: Date) => Date.parse(a.toString()) - Date.parse(b.toString()));
              this.dataUsersByMonth.push(response.total);
           
            }
          })
      );
      /*Promise.all(promises).then(() => {
        console.log('tabb', this.tabUsersByMonth[day]);
        
      });*/
      
    }

     
    this.investorService.getUsersByMonth(year,month).subscribe((response)=>
    {
        this.totalMonthU=response.total;
    });
    this.investorService.getUsersByLastWeek().subscribe((response)=>{
      this.totalLastWeek=response.total;
    })

}
usersYear(year:any)
{
    for (let i = 1; i < 13; i++) 
  {
    this.investorService.getUsersByMonth(year,i).subscribe((response)=>
    {
        this.tabUsersByYear[i]=response.investisseurs;
    });
  }
}

ngOnInit() {
  //hedhy bech ya3mel biha el max ta3 el calendrier
  const now = new Date();
  this.today = now.toISOString().substring(0, 10);
//pour remplir tableau years
  const year = new Date().getFullYear();
  for (let i = year - 40; i <= year; i++) {
    this.years.push(i);
  }
this.usersYear(this.selectedYearUY)
this.usersMonth(this.selectedYearUM,this.selectedMonthUM)
this.usersLastWeek()



//----------------Users-------------------------//  
  this.investorService.getTotalUsers().subscribe((response: any) => {
      this.totalUsers=response.count;
  });
  this.investorService.getUsersByYear(this.selectedYearUY).subscribe((response)=>{
    this.totalYearU=response.total;

  });
  this.investorService.getUsersByMonth(this.selectedYearUM,this.selectedMonthUM).subscribe((response)=>{
    this.totalMonthU=response.total;

  });
    const requests = [];
    for (let i = 1; i < 13; i++) {
      requests.push(this.investorService.getUsersByMonth(year, i));
    } 
    forkJoin(requests).toPromise()
    .then( (responses) => 
    {
      for (let i = 0; i < responses.length; i++) {
        this.dataUsersByYear.push(responses[i].total);
        //const monthObject = this.months.find(month => month.value === this.selectedMonthUM).name;

        this.labelUserByYear.push(this.months.find(month => month.value === (i+1)).name);
      }
    })
    .then(
      ()=>{
        setTimeout(() => {   
          const ctx = this.myCanvas1.nativeElement.getContext('2d');
          const ctx2 = this.myCanvas2.nativeElement.getContext('2d');
          const ctx3 = this.myCanvas3.nativeElement.getContext('2d');
        const chartData = {
            labels: this.labelUsersLastWeek,
            datasets: [
              {
                label: `Nombre Investisseurs Pour La Semaine Dernière`,
                data: this.dataUsersLastWeek,
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
                  text: `Nombre Investisseurs`,
                },
              },
            },
          };
         
          //chart 2
          const monthObject = this.months.find(month => month.value === this.selectedMonthUM).name;
          const chartData2 = {
            labels: this.labelUsersByMonth,
            datasets: [
              {
                label: `Nombre Investisseurs Pour Mois ${monthObject} `,
                data: this.dataUsersByMonth,
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
                  text: `Nombre Investisseurs`,
                },
              },
            },
          };
          //chart 3
          const chartData3 = {
            labels: this.labelUserByYear,
            datasets: [
              {
                label: `Nombre Investisseurs Pour ${this.selectedYearUY}`,
                data: this.dataUsersByYear,
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

ngAfterViewInit() {

      }
}
