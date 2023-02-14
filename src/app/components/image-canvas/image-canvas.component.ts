import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> = new ElementRef<HTMLCanvasElement>(document.querySelector('#canvas') as HTMLCanvasElement);

  textColor: string = '';

  protected width: number = 0;
  protected height: number = 0;

  url: string = '';

  constructor() { }

  ngOnInit(): void {
    this.width = 720
    this.height = 720
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
    this.deleteExistingTopText()

    const input = this.createInput()
    input.type = 'text'
    input.id = 'top-text'
    input.style.marginBottom = '30rem'

    this.canvas.nativeElement.insertAdjacentElement('afterend', input)

    input.focus()
  }

  createBottomText() {
    this.deleteExistingBottomText()

    const input = this.createInput()
    input.type = 'text'
    input.id = 'bottom-text'
    input.style.marginTop = '35rem'

    this.canvas.nativeElement.insertAdjacentElement('afterend', input)

    input.focus()
  }

  deleteExistingTopText() {
    const input = document.querySelector('#top-text')

    input?.remove()
  }

  deleteExistingBottomText() {
    const input = document.querySelector('#bottom-text')

    input?.remove()
  }

  createInput() {
    const input = document.createElement('input')

    input.className = 'ts-input'

    input.style.marginLeft = '.3rem'
    input.style.background = 'transparent'
    input.style.position = 'absolute'
    input.style.width = `${this.width - 10}px`
    input.style.height = '4rem'
    input.style.zIndex = '1'
    input.style.color = 'white';
    input.style.fontFamily = 'Impact'
    input.style.fontSize = '50px'
    input.style.textShadow = '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000'
    input.style.textAlign =  'center'
    input.style.textTransform = 'uppercase'

    input.addEventListener('focusin', () => {
      input.style.border = '1px solid black'
    })
    input.addEventListener('focusout', () => {
      input.style.border = '1px solid #ccc'
    })

    return input;
  }

  showTextColorPicker() {
    const colorPicker = document.querySelector('#text-color-picker') as HTMLInputElement

    colorPicker.click()
  }

  changeTextColor() {
    const tsInputs = document.querySelectorAll('.ts-input') as NodeListOf<HTMLInputElement>

    tsInputs.forEach(input => {
      input.style.color = this.textColor
    })
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
