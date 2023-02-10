import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> = new ElementRef<HTMLCanvasElement>(document.querySelector('#canvas') as HTMLCanvasElement);

  protected width: number = 0;
  protected height: number = 0;

  url: string = '';

  constructor() { }

  ngOnInit(): void {
    this.width = 720
    this.height = 720

    this.canvas.nativeElement.addEventListener('click', () => {
      const input = this.createTopText()

      this.canvas.nativeElement.insertAdjacentElement('afterend', input)

      input.focus()
    })
  }

  onImageChange(input: Event) {
    const element = input.currentTarget as HTMLInputElement
    let fileList: FileList = element.files || new FileList()

    const reader = new FileReader()

    reader.readAsDataURL(fileList[0])
    reader.onload = () => {
      this.url = reader.result as string

      this.drawImageOnCanvas(this.url)
    }
  }

  createTopText() {
    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'input'
    input.style.background = 'transparent'
    input.style.position = 'absolute'
    input.style.width = `${this.width - 10}px`
    input.style.height = '4rem'
    input.style.zIndex = '1'
    input.style.marginTop = '4rem'
    input.style.color = 'white';
    input.style.fontFamily = 'Impact'
    input.style.fontSize = '50px'
    input.style.textShadow = '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000'
    input.style.textAlign =  'center'
    input.style.textTransform = 'uppercase'

    return input;
  }

  async loadImage(src: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.src = src;
    return new Promise(resolve => {
      image.onload = () => {
        resolve(image);
      }
    });
  }

  async drawImageOnCanvas(string: string) {
    const context = this.canvas.nativeElement.getContext('2d');
    if(context) {

      const image: HTMLImageElement = await this.loadImage(string);

      context.clearRect(0, 0, this.width, this.height);
      context.drawImage(image, 0, 0, this.width, this.height);
    }
  }
}
