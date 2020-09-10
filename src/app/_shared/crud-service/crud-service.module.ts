import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataCreate } from './_create';
import { DataDelete } from './_delete';
import { DataRead } from './_read';
import { DataUpdate } from './_update';
import { DataUpdatex } from './_updatex';
import { DataService } from './data.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DataService,
    DataCreate,
    DataRead,
    DataUpdate,
    DataUpdatex,
    DataDelete
  ]
})
export class CrudServiceModule { }
