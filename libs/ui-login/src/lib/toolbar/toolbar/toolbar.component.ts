import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'pokemon-angular-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() title: string;
  @Output() toggleSidenav = new EventEmitter();
}
