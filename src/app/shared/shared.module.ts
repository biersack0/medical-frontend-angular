import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessageComponent } from './components/control-message/control-message.component';
import { NotImagePipe } from './pipes/not-image.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
	declarations: [ControlMessageComponent, NotImagePipe, SafePipe],
	imports: [CommonModule],
	exports: [ControlMessageComponent, NotImagePipe, SafePipe],
})
export class SharedModule {}
