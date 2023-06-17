import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconeDevise'
})
export class IconeDevisePipe implements PipeTransform {

  
  transform(devise: string): string {
      switch (devise) {
        case 'USD':
          return 'fas fa-dollar-sign';
        case 'EUR':
          return 'fas fa-euro-sign';
          case 'JPY':
            return 'fas fa-yen-sign';
            case 'CAD':
            return 'fab fa-canadian-maple-leaf';
            case 'TRY':
              return 'fas fa-lira-sign';
            default:
              return '';
         
       
      }

    }
  }