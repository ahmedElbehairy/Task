import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrl: './alert-popup.component.scss'
})
export class AlertPopupComponent {
@Input() id!:string
@Output() yes = new EventEmitter<string>

}
