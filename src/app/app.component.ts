import { Component, ViewChild } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CanvasComponent) canvas?: CanvasComponent;

  async onSave(): Promise<any> {
    const blob = await this.canvas?.getBlob();
    if (blob) {
      const handle = await window.showSaveFilePicker();
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    }
  }

  async onOpen(): Promise<any> {
    const [handle] = await window.showOpenFilePicker();
    const file = await handle.getFile();
    await this.canvas?.setBlob(file);
  }

  async onCopy(): Promise<any> {
    const blob = await this.canvas?.getBlob();
    if (blob) {
      await navigator.clipboard.write([
        new ClipboardItem({[blob.type]: blob}),
      ]);
    }
  }

  async onPaste(): Promise<any> {
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        if (type === 'image/png') {
          const blob = await clipboardItem.getType(type);
          await this.canvas?.setBlob(blob);
        }
      }
    }
  }
}
