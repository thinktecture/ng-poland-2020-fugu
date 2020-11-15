import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BresenhamService } from '../bresenham.service';
import { ConversionService } from '../conversion.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | null = null;
  context: CanvasRenderingContext2D | null = null;
  previousPosition: {x: number, y: number} | null = null;

  constructor(readonly bresenham: BresenhamService, readonly conversion: ConversionService) {
  }

  ngAfterViewInit(): void {
    if (!this.canvas) {
      throw new Error('Canvas element not found.');
    }

    this.context = this.canvas.nativeElement.getContext('2d', {desynchronized: true});
    if (!this.context) {
      throw new Error('Unable to create context.');
    }

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.context.fillStyle = 'black';
  }

  onPointerDown(event: PointerEvent): void {
    this.previousPosition = {x: Math.floor(event.offsetX), y: Math.floor(event.offsetY)};
  }

  onPointerMove(event: PointerEvent): void {
    if (this.previousPosition && this.context) {
      const currentPosition = {x: Math.floor(event.offsetX), y: Math.floor(event.offsetY)};
      const points = this.bresenham.bresenhamLine(this.previousPosition.x, this.previousPosition.y, currentPosition.x, currentPosition.y);
      for (const {x, y} of points) {
        this.context.fillRect(x, y, 2, 2);
      }
      this.previousPosition = currentPosition;
    }
  }

  onPointerUp(): void {
    this.previousPosition = null;
  }

  async setBlob(blob: Blob): Promise<void> {
    if (!this.context) {
      throw new Error('Context not found.');
    }
    const image = await this.conversion.getImage(blob);
    this.context.drawImage(image, 0, 0);
  }

  getBlob(): Promise<Blob> {
    if (!this.canvas) {
      throw new Error('Canvas element not found.');
    }
    return this.conversion.toBlob(this.canvas.nativeElement);
  }
}
