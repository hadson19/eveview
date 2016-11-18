/**
 * Created by fox21 on 11/16/2016.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemGroup } from '../ItemsByGroup/interface';
import { ibgService } from '../ItemsByGroup/ibg.service';

@Component({
    selector: 'as-tree-view',
    template: `
    <ul>
        <li *ngFor="let itg of itemGroups">
            <span (click)="toggle(itg)"> {{ itg.name }} </span>
            <as-tree-view *ngIf="itg.isExpanded" (onItemsSelect)="onItemsSel($event)" [itemGroups]="getChildren(itg)" >
            
             </as-tree-view>
        </li>
    </ul>
    `,
    styleUrls: ['app/Common/treeview.css'],
    providers: [ ibgService ]
})

export class TreeViewComponent {
    @Input() itemGroups: Array<ItemGroup>;
    @Output() onItemsSelect = new EventEmitter<string>();
    private ItemService: ibgService;
    private subgrps: ItemGroup[];
    //public itemGroups: Array<ItemGroup>;
    constructor(private itgs: ibgService)
    {  this.ItemService = itgs;
        this.subgrps = this.itgs.getGroupData();
    }

    toggle(it: ItemGroup)
    {
        it.isExpanded = true;
        if(it.isExpanded)
            it.isExpanded = false;
        this.onItemsSelect.emit(it.types.href);
    }

    onItemsSel(s: string)
    {
        this.onItemsSelect.emit(s);
    }
    getChildren(it: ItemGroup): ItemGroup[]
    {
        return it.children;
        /* let result = new Array<ItemGroup>();
         for(let sub of this.subgroups)
         {
         if(sub.parentGroup.href === it.href)
         {
         result.push(sub);
         }
         }
         return result;*/
    }
}