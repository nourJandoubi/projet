import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'highlightSign'})
export class HighlightSignPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    let color: string = '';
    if (value.startsWith('-')) {
      color = 'red';
    } else if (value.startsWith('+')) {
      color = 'green';
    }
    return this.sanitizer.bypassSecurityTrustHtml(`<span style="color:${color}; font-weight:bold">${value}</span>`);
  }
  
  
}
