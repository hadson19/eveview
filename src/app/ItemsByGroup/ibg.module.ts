/**
 * Created by fox21 on 11/16/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TreeViewComponent } from '../common/treeview.comp';
import { ibgComponent } from './index';




@NgModule({
    declarations: [
        TreeViewComponent,
        ibgComponent
    ],
    imports: [ HttpModule, CommonModule ],
    exports: [
        ibgComponent,
        TreeViewComponent
    ]
})
export class IbgModule {
}
