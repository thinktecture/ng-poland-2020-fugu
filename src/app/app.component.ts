import { Component, ViewChild } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CanvasComponent) canvas?: CanvasComponent;

  onOpen() {

  }
}
