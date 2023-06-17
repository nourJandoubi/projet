import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  /*constructor(private messageService: MessageService) {}

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
 }

 showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
 }

 showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
 }

 showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
 }*/
}

