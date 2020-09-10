import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'px-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input() headerText: string;
  @Input() contentText: string;
  @Input() colorText: string;
  constructor() { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

}
