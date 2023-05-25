import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'highlightSign'})
export class HighlightSignPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }
    let color: string = '';
    if (value.startsWith('-')) {
      color = 'red';
    } 
    else if(value=='0' || value=='0.00')
    {
        color='black'
    }
    else {
      color = 'green';
    }

    return this.sanitizer.bypassSecurityTrustHtml(`<span style="color:${color}; font-weight:bold">${value}</span>`);
  }
}
