interface Window {
  showOpenFilePicker(): any;
  showSaveFilePicker(): any;
}

declare class ClipboardItem {
  constructor(item: {[type: string]: any});
}

interface Clipboard {
  read(): Promise<any>;
  write(items: ClipboardItem[]): Promise<any>;
}

interface Navigator {
  readonly clipboard: Clipboard;
}
