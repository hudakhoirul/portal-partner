import { NgModule } from '@angular/core';
import { LoaderComponent } from '@app/_components/loader/loader.component';
import { DxLoadPanelModule } from 'devextreme-angular';
@NgModule({
    declarations : [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ],
    imports: [
        DxLoadPanelModule
    ],

})

export class LoaderModule{

}

