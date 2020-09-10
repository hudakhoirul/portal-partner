import { NgModule } from '@angular/core';
import { ButtonModule } from '@app/_components/button/button.module';
import { CardComponent } from '@app/_components/card/card.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ],
  imports: [
    ButtonModule,
    CommonModule
  ]
})
export class CardModule { }
