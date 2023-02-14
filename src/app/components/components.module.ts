import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCanvasComponent } from './image-canvas/image-canvas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImageCanvasComponent
  ],
  exports: [
    ImageCanvasComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class ComponentsModule { }
