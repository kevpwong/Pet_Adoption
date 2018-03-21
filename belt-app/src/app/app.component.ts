import { Component } from '@angular/core';
import { BeltService } from './belt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private _beltService: BeltService){}

}
