import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-stepper',
  templateUrl: './my-stepper.component.html',
  styleUrls: ['./my-stepper.component.scss']
})
export class MyStepperComponent implements OnInit {

  @Input() stepdata: any;

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * On init
   */
  ngOnInit(): void {
    console.log(this.stepdata);
  }

  getStepGroupClass(i) {
    // return '(i<stepdata.active || stepdata.active===stepdata.data.length-1) && \'active\'';
    const tmp = this.stepdata.data.findIndex(x => x.flag === 2);
    if ((i === this.stepdata.active - 1) || (i === this.stepdata.data.length - 1) && (this.stepdata.active === this.stepdata.data.length - 1)) {
      if (this.stepdata.isAnswer === 1 || this.stepdata.isArchive === 1) {
        return 'active';
      }
      return 'current';
    }
    if (i < this.stepdata.active) {
      return 'active';
    }
  }

  getStepItemClass(i) {
    if (i === this.stepdata.active) {
      if (this.stepdata.isAnswer === 1 || this.stepdata.isArchive === 1) {
        return 'active';
      }
      return 'current';
    }
    if (i <= this.stepdata.active) {
      return 'active';
    }
  }

  getArrorRightClass(i) {
    if (i === this.stepdata.active) {
      if (this.stepdata.isAnswer === 1 || this.stepdata.isArchive === 1) {
        return 'active';
      }
      return 'current';
    }
    if (i <= this.stepdata.active) {
      return 'active';
    }
  }
}
