/**
 * Created by fox21 on 11/16/2016.
 */
import { Component, Input } from '@angular/core';
// import {ItemGroups,ItemGroup} from '../ItemsByGroup/interface';

@Component({
    selector: 'as-donkey',
    template: `
       donkey {{ data }}
    `
})

export class DonkeyComponent {
    @Input() data: string;

}