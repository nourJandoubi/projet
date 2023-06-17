import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConseilService } from 'src/app/services/conseil.service';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.css'],
})
export class ConseilComponent {
  @ViewChild('myChart', { static: true }) myCanvas: ElementRef<HTMLCanvasElement>;
  myChart: Chart;
  showCard: boolean = false;
  symbol: any;
  comparisonResult:any;
  historicalPrix: any[] = [];
  result1: any[] = [];
  dates: any[] = [];
  start_date: Date | undefined;
  end_date: Date | undefined;
  yesterday: Date;
  today: Date;
  todayISOString: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private conseilService: ConseilService,
    private messageService: MessageService
  ) {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.today = new Date();
    this.todayISOString = this.today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.symbol = this.activatedroute.snapshot.params['symbol'];
    this.afficher();
  }

  afficher(): void {
    if (!this.start_date || !this.end_date) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez sélectionner une date de début et une date de fin'
      });
      this.showCard = false;
      setTimeout(() => {
        this.messageService.clear();
      }, 1000); // Délai de 1 seconde (1000 millisecondes)

      return;
    }
    this.showCard = true;
    if (this.start_date && this.end_date) {
      const myObject = {
        symbol: this.symbol,
        start_date: this.start_date.toISOString().split('T')[0],
        end_date: this.end_date.toISOString().split('T')[0],
      };

      this.conseilService.predict(myObject).subscribe((data) => {
        console.log(data);
        this.result1 = data.predicted_price.map((value: string) => parseFloat(value));
        console.log(this.result1);
        this.dates = data.historical_data
          .map((date: any) => new Date(date['Date']))
          .filter((date: Date) => !isNaN(date.getTime()))
          .map((date: Date) => date.toISOString().split('T')[0]);
        this.historicalPrix = data.historical_data.map((date: any) => date['Close']);

        this.addTodayData(); // Ajouter la valeur prédite d'aujourd'hui
        this.createChart();

        const lastHistoricalPrice = this.historicalPrix[this.historicalPrix.length - 1];

        if (this.result1[0] > lastHistoricalPrice) {
          this.comparisonResult='les prédictions indiquent une hausse des prix ,Nous vous conseillons d'+'acheter et de maintenir vos positions sur cette valeur' 
          
        } else if (this.result1[0] < lastHistoricalPrice) {
          this.comparisonResult='les prédictions indiquent une baisse des prix ,Nous vous conseillons de vendre et de réduire vos positions sur cette valeur' 
          
        } else {
       
          this.comparisonResult='les prédictions ne montrent pas de tendance claire, Nous vous conseillons de surveiller de près la situation avant de prendre une décision.'
        }
      });
    }
  }

  addTodayData(): void {
    if (this.today && this.result1.length > 0) {
      const todayIndex = this.dates.findIndex((date) => date === this.todayISOString);

      const combinedData = this.dates.map((date, index) => ({ date, result1: this.result1[index] }));

      if (todayIndex !== -1) {
        combinedData[todayIndex].result1 = this.result1[0]; // Mettre à jour la valeur prédite à l'index d'aujourd'hui
      } else {
        const todayDate = new Date(this.todayISOString);
        const insertIndex = combinedData.findIndex(({ date }) => {
          const currentDate = new Date(date);
          return todayDate < currentDate;
        });

        if (insertIndex !== -1) {
          combinedData.splice(insertIndex, 0, { date: this.todayISOString, result1: this.result1[0] });
        } else {
          combinedData.push({ date: this.todayISOString, result1: this.result1[0] });
        }
      }

      const sortedData = combinedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      this.dates = sortedData.map(({ date }) => date);
      this.result1 = sortedData.map(({ result1 }) => result1);
    }
  }

  createChart(): void {
    const ctx = this.myCanvas.nativeElement.getContext('2d');

    // Détruire l'instance du graphique précédent, s'il existe
    if (this.myChart) {
      this.myChart.destroy();
    }

    // Combinez les prix historiques et les prix prédits en un seul jeu de données
    const chartData: ChartData<'line', (number | null)[], string> = {
      labels: this.dates,
      datasets: [
        {
          label: 'Données historiques et prédites',
          data: [...this.historicalPrix, ...this.result1],
          backgroundColor: ['#FF5722', ...Array(this.result1.length).fill('#FF5722')],
          borderColor: ['#3F51B5', ...Array(this.result1.length).fill('#3F51B5')],
          borderWidth: 1,
          fill: false,
          cubicInterpolationMode: 'monotone',
        },
      ],
    };

    const chartOptions: ChartOptions<'line'> = {
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
            text: 'Taux de change',
          },
        },
      },
      plugins: {
        tooltip: {
          intersect: false,
        },
      },
    };

    // Créer le graphique
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  }
}
