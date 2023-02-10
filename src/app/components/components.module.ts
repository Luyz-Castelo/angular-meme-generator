import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCanvasComponent } from './image-canvas/image-canvas.component';

@NgModule({
  declarations: [
    ImageCanvasComponent
  ],
  exports: [
    ImageCanvasComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class ComponentsModule { }
