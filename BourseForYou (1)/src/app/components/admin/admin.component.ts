import { AuthentificationService } from './../../services/authentification.service';
import { Component } from '@angular/core';
import { faSignOut,faDirections,faSitemap } from '@fortawesome/free-solid-svg-icons';
import { VisitorsService } from 'src/app/services/visitors.service';
import { AdminService } from 'src/app/services/admin.service';
import { forkJoin } from 'rxjs';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  faDirections=faDirections;
  faSignOut=faSignOut;

//visitors
  //visitorsByDay:number;
 // visitorsByLastWeek:number; 9bal matna7iha thabet behc testa3mel fonction ta3 lastweek wela
  //visitorsByMonth:number;
  //visitorsByYear:number;
  visibleV:boolean;

  totalVisitors:number;
  tabVisitorsByMonth:any[]=[];
  tabVisitorsByYear:any[]=[];
  totalDayV:any; 
  totalMonthV=0;
  totalYearV:any;
  totalTextDayV=false;
  totalTextMonthV=true;
  totalTextYearV=true;
  selectedOption='jour';
  showChartDay = true;
  showChartMonth = false;
  showChartYear = false;
//users
  //usersByDay:number;
  //usersByLastWeek:number;
  //usersByMonth:number;
  //usersByYear:number;
  visibleU:boolean;

  totalUsers:number;
  tabUsersByMonth:any[]=[];
  tabUsersByYear:any[]=[];
  totalDayU:any; 
  totalMonthU=0;
  totalYearU:any;
  totalTextDayU=false;
  totalTextMonthU=true;
  totalTextYearU=true;
  selectedOptionnU='jour';
  showChartDayU = true;
  showChartMonthU = false;
  showChartYearU = false;
//country
visibleC:boolean;

  totalCountries:number;
  tabCountry:any[]=[];


  

    today: string;
    day:string="";
    typeSelect=[
        {name:'jour'},
        {name:'mois'},
        {name:'annee'},
    ];

    basicData:any;
    basicOptions:any;
   

  //select month and year 
  todaydate = new Date();
  selectedYearVM = this.todaydate.getFullYear();
  selectedYearVY:number = this.todaydate.getFullYear();

  selectedMonthVM = this.todaydate.getMonth() + 1;

  selectedYearUM = this.todaydate.getFullYear();
  selectedYearUY:number = this.todaydate.getFullYear();

  selectedMonthUM = this.todaydate.getMonth() + 1;
    years: number[] = [];
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

  
  onOptionSelected()
   {
        if (this.selectedOption === 'jour')
        {
                this.showChartDay = true;
                this.showChartMonth = false;
                this.showChartYear = false;
        } 
        else 
            if (this.selectedOption === 'mois') 
            {
                    this.showChartDay = false;
                    this.showChartMonth = true;
                    this.showChartYear = false;
                } 
            else 
                    if (this.selectedOption === 'annee') 
                    {
                        this.showChartDay = false;
                        this.showChartMonth = false;
                        this.showChartYear = true;
                    } 
   }
  changeDate(type:any)
  {
    if(type=='visitor')
   { 
        this.visitorsDay(this.day)
        this.totalTextDayV=true;
   }
    if(type=='user')
    {
        this.usersDay(this.day)
        this.totalTextDayU=true;
    }
  }
  

  constructor(private authentificationService:AuthentificationService,public visitorService:VisitorsService,public adminService:AdminService){

  }
  deconnexion() {
    this.authentificationService.logOut();
    this.ngOnInit();
  }

  showDialog(type:any)
  { if(type=='visiteur')
    this.visibleV=true;
    if(type=='investisseur')
    this.visibleU=true;  
  }




visitorsYear(year: any) 
{
  for (let i = 0; i < 12; i++) 
  {
    this.visitorService.getVisitorsByMonth(year,i+1).subscribe((response)=>
    {
        this.tabVisitorsByYear[i+1]=response.visiteurs;
    });
  }
    this.visitorService.getVisitorsByYear(year).subscribe((response)=>
    { 
        this.totalYearV=response.total;
    });
}
visitorsMonth(year:any,month:any)
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
        this.visitorService.getVisitorsByDay(day).toPromise()
          .then((response: any) => {
            if (response.total == undefined) {
              this.tabVisitorsByMonth[day] = 0;
            } else {
              this.tabVisitorsByMonth[day] = response.total;
            }
          })
      );
      /*Promise.all(promises).then(() => {
        console.log('tabb', this.tabVisitorsByMonth[day]);
        
      });*/
      
    }
     
    this.visitorService.getVisitorsByMonth(year,month).subscribe((response)=>
    {
        this.totalMonthV=response.total;
    })

    
   
}
visitorsDay(day:any)
{
    this.visitorService.getVisitorsByDay(day).subscribe((responses: any) =>
    {
        this.totalDayV= responses.total;
        console.log('total day',this.totalDayV)
        if(this.totalDayV==undefined)
        {
          this.totalDayV=0;
        }
    });
}
usersDay(day:any)
{
    this.adminService.getUsersByDay(day).subscribe((responses:any)=>
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
        this.adminService.getUsersByDay(day).toPromise()
          .then((response: any) => {
            if (response.total == undefined) {
              this.tabUsersByMonth[day] = 0;
            } else {
              this.tabUsersByMonth[day] = response.total;
            }
          })
      );
      /*Promise.all(promises).then(() => {
        console.log('tabb', this.tabUsersByMonth[day]);
        
      });*/
      
    }
     
    this.adminService.getUsersByMonth(year,month).subscribe((response)=>
    {
        this.totalMonthU=response.total;
    })

}
usersYear(year:any)
{
    for (let i = 0; i < 12; i++) 
  {
    this.adminService.getUsersByMonth(year,i+1).subscribe((response)=>
    {
        this.tabUsersByYear[i+1]=response.investisseurs;
    });
  }
    this.adminService.getUsersByYear(year).subscribe((response)=>
    { console.log('res yy',response)
        this.totalYearU=response.total;
    });
}


/*visitorsLastweek()
{
    this.visitorService.getVisitorsByLastWeek().subscribe((response: any) => {
        this.visitorsByLastWeek=response;
        console.log('last weeeek',this.visitorsByLastWeek)
  
      });
}*/

updateDays(type:any)
{  if(type=='visitor')
    this.visitorsMonth(this.selectedYearVM,this.selectedMonthVM)
    if(type=='user')
    this.usersMonth(this.selectedYearUM,this.selectedMonthUM)
}

updateYear(type:any)
{   if(type=='visitor')
    this.visitorsYear(this.selectedYearVY)
    if(type=='user')
    this.usersYear(this.selectedYearUY)
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
    


//partie chart
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicData = {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
              {
                  label: 'Sales',
                  data: [540, 325, 702, 620],
                  backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                  borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                  borderWidth: 1
              }
          ]
      };

      this.basicOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
//end partie chart


this.visitorsYear(this.selectedYearVY)
this.visitorsMonth(this.selectedYearVM,this.selectedMonthVM)
this.usersYear(this.selectedYearUY)
this.usersMonth(this.selectedYearUM,this.selectedMonthUM)



//---------------Visitors---------------------------------//  
       this.visitorService.getTotalVisitors().subscribe((response: any) => {
        this.totalVisitors=response;
      });
//----------------Users-------------------------//  
    this.adminService.getTotalUsers().subscribe((response: any) => {
        this.totalUsers=response.count;
    });
//-----------Country-------------------
    this.adminService.getCountry().subscribe((response:any)=>{
        this.tabCountry=response;
      });


    

    this.adminService.getTotalCountries().subscribe((response:any)=>{
        this.totalCountries=response;
    });
  }
}

