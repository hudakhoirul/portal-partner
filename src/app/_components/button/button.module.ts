import {NgModule} from '@angular/core';
import {ButtonComponent} from '@app/_components/button/button.component';
import {DxButtonModule} from 'devextreme-angular';
@NgModule({
    declarations :[
        ButtonComponent
    ],
    exports: [
        ButtonComponent
    ],
    imports: [
        DxButtonModule
    ],

})

export class ButtonModule{

}

