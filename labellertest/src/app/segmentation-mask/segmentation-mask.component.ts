import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-segmentation-mask',
  standalone: true, // Important!
  templateUrl: './segmentation-mask.component.html',
  styleUrls: ['./segmentation-mask.component.css']
})
export class SegmentationMaskComponent implements AfterViewInit {
  @ViewChild('konvaContainer') konvaContainer!: ElementRef;

  private stage!: Konva.Stage;
  private layer!: Konva.Layer;
  private imageObj!: Konva.Image;
  private currentPolygon: Konva.Line | null = null;
  private polygons: Konva.Line[] = [];
  private points: number[] = [];
  private imageSrc = 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600'; 

  ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: this.konvaContainer.nativeElement,
      width: 800,
      height: 600
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    const image = new Image();
    image.onload = () => {
      this.imageObj = new Konva.Image({
        image: image,
        x: 0,
        y: 0,
        width: 800,
        height: 600
      });
      this.layer.add(this.imageObj);
      this.layer.draw();
    };
    image.src = this.imageSrc;

    this.stage.on('click', (e) => this.handleClick(e));
  }

  handleClick(e: Konva.KonvaEventObject<MouseEvent>): void {
    if (!this.imageObj) return;

    const pointer = this.stage.getPointerPosition();
    if (!pointer) return;

    const x = pointer.x;
    const y = pointer.y;

    if (this.currentPolygon) {
      if (this.points.length > 2 && Math.abs(this.points[0] - x) < 5 && Math.abs(this.points[1] - y) < 5) {
        this.closePolygon();
        return;
      }
      this.points.push(x, y);
      this.currentPolygon.points(this.points);
      this.layer.draw();
    } else {
      this.points = [x, y];
      this.currentPolygon = new Konva.Line({
        points: this.points,
        stroke: 'red',
        strokeWidth: 2,
        closed: false
      });
      this.polygons.push(this.currentPolygon);
      this.layer.add(this.currentPolygon);
      this.layer.draw();
    }
  }

  closePolygon(): void {
    if (!this.currentPolygon) return;

    this.currentPolygon.closed(true);
    this.currentPolygon = null;
    this.points = [];
    this.layer.draw();
  }

  clearPolygons(): void {
    this.polygons.forEach(polygon => polygon.destroy());
    this.polygons = [];
    this.currentPolygon = null;
    this.points = [];
    this.layer.draw();
  }

  exportMask(): void {
    const maskData = this.polygons.map(polygon => polygon.points());
    const maskJson = JSON.stringify(maskData);
    console.log(maskJson); // You can download or further process the JSON here
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'n' || event.key === 'N') {
      this.closePolygon();
    }
  }
}