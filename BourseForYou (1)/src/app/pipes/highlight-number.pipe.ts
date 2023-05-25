import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'highlightNumber'})
export class HighlightNumberPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const regex = /([+-]?\d+(\.\d+)?%?)/g;
    const htmlString = value.replace(regex, '<span style="color:green; font-weight:bold;">$&</span>');
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
}
