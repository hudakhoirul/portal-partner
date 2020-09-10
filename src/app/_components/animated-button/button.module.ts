import {NgModule} from '@angular/core';
import {ButtonComponent} from '@app/_components/animated-button/button.component';
import {DxButtonModule, DxLoadIndicatorModule, DxTemplateModule} from 'devextreme-angular';
@NgModule({
    declarations :[
        ButtonComponent
    ],
    exports: [
        ButtonComponent
    ],
    imports: [
        DxButtonModule, DxLoadIndicatorModule, DxTemplateModule 
    ],

})

export class AnimatedButtonModule{

}

