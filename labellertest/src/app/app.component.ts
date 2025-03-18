import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SegmentationMaskComponent } from './segmentation-mask/segmentation-mask.component'; 

@Component({
  selector: 'app-root',
  imports: [SegmentationMaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'labellertest';
}
