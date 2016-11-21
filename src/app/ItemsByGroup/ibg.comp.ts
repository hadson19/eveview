import {Component, OnInit, OnDestroy} from '@angular/core';
import { ibgService } from './ibg.service';
import { ItemGroups, ItemGroup, ItemGroupsCls, Blueprint, bom, ItemBuild, BItem, ItemBuildCls, TradeHubs, Hub } from './interface';
import { ItemTypesA, ItemType } from './ItemTypes';
import { Istringdistance, stringdistance } from '../algs/stringdistance';
import { TreeViewComponent } from '../common/treeview.comp';
// import { DonkeyComponent } from '../common/donkey.comp';
import {Observable} from "rxjs/Observable";

@Component ({
    selector: 'as-sel-groups',
    templateUrl: 'app/ItemsByGroup/ibg.html',
    styleUrls: ['app/itemsByGroup/ibg.css'],
    providers: [ibgService, TreeViewComponent]
})
export class ibgComponent implements OnInit, OnDestroy {
    public subgrps: Array<ItemGroup>;
    public dondata = 'the data';
    private  itemGroups: Array<ItemGroup>;
    public itemTopGroups: Array<ItemGroup>;
    public selItem: ItemType;
    public selItemTypes: Array<ItemType>;
    private predGrps: Array<ItemGroup>;
    public itemsFromGroup: ItemTypesA;
    public itmtypes: Array<Object>;
    public selGrps: Array<Object>;
    private ItemService: ibgService;
    private cnt: number;
    private pp: any;
    private jitaHub: Hub;
    public itemBuild: ItemBuildCls;
    private bp: Blueprint[];
    public BOM: bom[];
    private invalidate: boolean;
    public selBom: bom[];
    public yourHub: Hub;
    public priceBands: Array<number>;
    public lastHub: Hub;
    public tradeHubs: TradeHubs;
    public t1: number;
    public tdisplay: string;
    constructor(private itgs: ibgService) {
        this.t1 = 0;
        this.tdisplay = "tick: ";
        this.invalidate = false;
        this.itemBuild = new ItemBuildCls();
        this.ItemService = itgs;
        this.selItemTypes = new Array<ItemType>();
        this.tradeHubs = new TradeHubs();
        this.tradeHubs.Hubs = new Array<Hub>();
        let hub = new Hub();
        hub.name = 'Jita'; hub.regionId = 10000002; hub.stationId = 60003760;
        this.tradeHubs.Hubs.push(hub);
        this.yourHub = hub;
        this.jitaHub = hub;
        this.lastHub = hub;
        hub = new Hub();
        hub.name = 'Amarr'; hub.regionId = 10000043; hub.stationId = 60008494;
        this.tradeHubs.Hubs.push(hub);
        hub = new Hub();
        hub.name = 'Dodixie'; hub.regionId = 10000032; hub.stationId = 60011866;
        this.tradeHubs.Hubs.push(hub);
        hub = new Hub();
        hub.name = 'Rens'; hub.regionId = 10000030; hub.stationId = 60004588;
        this.tradeHubs.Hubs.push(hub);
        hub = new Hub();
        hub.name = 'Hek'; hub.regionId = 10000042; hub.stationId = 60005686;
        this.tradeHubs.Hubs.push(hub);
        hub = new Hub();
        hub.name = 'Tash-Murkon'; hub.regionId = 10000020; hub.stationId = 60008764;
        this.tradeHubs.Hubs.push(hub);
        hub = new Hub();
        hub.name = 'Oursulaert'; hub.regionId = 10000064; hub.stationId = 60011740;
        this.tradeHubs.Hubs.push(hub);
        hub = new Hub();

    }

    dosd(event : any){
        let s = event.target.value;
        if(s.length < 3)
            return;
        let objh: Istringdistance;
        objh = {prop: 'type.name', list: this.itmtypes, input: s  };
        let sd = new stringdistance(objh);
        this.itmtypes = sd.result;
    }

    private toggle(it: ItemGroup)
    {
        if(it.isExpanded)
            it.isExpanded = false;
        else
            it.isExpanded = true;
    }

    getChildren(it: ItemGroup) : ItemGroup[]
    {
        this.selGrps = it.children;
        return it.children;
    }

    onSelectTradeHub(h: Hub){
        this.yourHub = h;
    }
    private getHub(hub: string): Hub
    {
        for( let i = 0; i < this.tradeHubs.Hubs.length; i++)
        {
            if(this.tradeHubs.Hubs[i].name === hub)
                return this.tradeHubs.Hubs[i];
        }
    }
    onGetBOM(item: ItemType) {
        this.itemBuild = new ItemBuildCls();
        this.itemBuild.items = new Array<BItem>();
        let tot = 0;
        let RegionId = this.yourHub.regionId;
        let StationId = this.yourHub.stationId;
        //let ibitem: BItem;
        this.itgs.getBOM(item.id.toString()).subscribe(bom => {
            this.selBom = bom;
            this.itgs.getBuildPrice(bom, RegionId).subscribe(res => {let pts = res;
                    tot = 0;
                    this.lastHub = this.yourHub;
                    for(let bomitem of this.selBom)
                    {
                        for(let pt of pts)
                        {
                            if(pt.typeid === bomitem.typeid)
                            {
                                let prc: number;
                                prc = this.itgs.getPriceTotal(bomitem.quantity, pt.items, StationId);
                                if (prc > 0) {
                                    tot += prc;
                                    let ibitem: BItem = { typeid: bomitem.typeid, description: pt.items[0].type.name , price: prc };
                                    this.itemBuild.items.push(ibitem);
                                }

                                else {
                                    let ibitem: BItem = { typeid: bomitem.typeid, description: '(' + pt.items[0].type.name +')' , price: prc };
                                    this.itemBuild.items.push(ibitem);
                                }

                            }
                        }
                    }
                    let ibitem: BItem = {typeid: 0, description: 'Total', price: parseFloat(tot.toFixed(2))};
                    this.itemBuild.items.push(ibitem);
                },
                error => {console.log(error);
                }
            );
        });

    }

    private addBOM(o: Blueprint)
    {
        this.BOM = new Array<bom>();
        for(let xx of o.bom)
        {
            this.BOM.push(xx);
        }
    }

    private getGroups()
    {
        this.itgs.getGroupHref().subscribe(res => {
            this.itemGroups = res.items;
            this.itemTopGroups = new Array<ItemGroup>();
            this.subgrps = new Array<ItemGroup>();
            for (let grp of this.itemGroups) {
                if (grp.parentGroup === undefined)
                    this.itemTopGroups.push(grp);
                else
                    this.subgrps.push(grp);
            }
            for (let grp of this.itemTopGroups) {
                this.doChildren(grp);
            }
        });
    }


    private doChildren(parent: ItemGroup)
    {
        for(let ch of this.subgrps)
        {
            if(parent.href === ch.parentGroup.href)
            {
                if(parent.children === undefined)
                {
                    parent.children = new Array<ItemGroup>();
                }
                parent.children.push(ch);
                this.doChildren(ch);
            }
        }
    }


//60003760

    public setHubPrice(type: ItemType, hub: Hub)
    {
        this.itgs.getPriceDataUri(type.id,hub.regionId).subscribe(res => {
                let retval  = NaN;
                for (let ll of res.items) {
                    if (ll.location.id === hub.stationId && ll.buy === false) {
                        if (isNaN(retval) || ll.price < retval)
                            retval = ll.price;
                    }
                }
                switch(hub.name){
                    case 'Jita': type.Jitaprice = retval; break;
                    case 'Amarr': type.Amarrprice = retval; break;
                    case 'Dodixie': type.Dodixieprice = retval; break;
                    case 'Rens': type.Rensprice = retval; break;
                    case 'Hek': type.Hekprice = retval; break;
/*
                    case 'Tash-Murkon': type.Tashprice = retval; break;
                    case 'Oursulaert': type.Ourprice = retval; break;
*/

                }

            }
        );

    }

    /*public getJitaPrice(type: ItemType, Region: Number)
    {
        this.itgs.getPriceDataUri(type.id,Region).subscribe(res => {
                let retval  = NaN;
                for (let ll of res.items) {
                    if (ll.location.id === jitaHub.location && ll.buy === false) {
                        if (isNaN(retval) || ll.price < retval)
                            retval = ll.price;
                    }
                }
                type.Jitaprice = retval;
            }
        );
    }*/

    private getTypes(): any {
        let res: string;
        res = localStorage.getItem('SelEveItems');
        if(res != null && res.indexOf('marketGroup') > 0)
        {
            let restry = JSON.parse(res);
            this.selItemTypes = restry;
            for(let it of this.selItemTypes)
            {
                this.setHubPrice(it,this.getHub('Jita'));
                this.setHubPrice(it,this.getHub('Amarr'));
                this.setHubPrice(it,this.getHub('Hek'));
                this.setHubPrice(it,this.getHub('Rens'));
//                this.setHubPrice(it,this.getHub('Tash-Murkon'));
                this.setHubPrice(it,this.getHub('Dodixie'));
  //              this.setHubPrice(it,this.getHub('Oursulaert'));
            }
        }
        else {
            this.selItemTypes = new Array<ItemType>();
        }
        return "nothing";
    }

    private saveEvent(item: ItemType)
    {
        //first load saved events if not already.
        //look for item.typeid and replace, with current.
        //then save to server
    }

    public onRemoveItem ( item: ItemType)
    {
        if(event.target["alt"] === "bom")
        {
            this.onGetBOM(item);
        }
        else if(event.target["alt"]==="save event"){
            this.saveEvent(item);
        }
        else if(event.target["alt"]==="fallsbelow")
        {
            return;
        }
        else{
            let tempItem = this.selItemTypes;
            this.selItemTypes = new Array<ItemType>();
            let i = 0;
            for (i = 0; i < tempItem.length; i++) {
                if (item === tempItem[i]) {
                    continue;
                }
                this.selItemTypes.push(tempItem[i]);
            }
            localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
        }
    }

    public onSelectItem (it: ItemType) {
        let i = 0;
        for (i = 0; i < this.selItemTypes.length; i++) {
            if (it === this.selItemTypes[i]) {
                return;
            }
        }
        this.setHubPrice(it,this.getHub('Jita'));
        this.setHubPrice(it,this.getHub('Amarr'));
        this.setHubPrice(it,this.getHub('Dodixie'));
        this.setHubPrice(it,this.getHub('Hek'));
        this.setHubPrice(it,this.getHub('Rens'));
/*
        this.setHubPrice(it,this.getHub('Tash-Murkon'));
        this.setHubPrice(it,this.getHub('Oursulaert'));
*/
        this.selItemTypes.push(it);
        localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
    }

    public onItemsSelect(href: string)
    {
        this.ItemService.getUnderData(href).subscribe(res3 => {
            this.itmtypes =[];
            this.itmtypes = res3.items; this.invalidate = true; } );
    }

    onSelectItemTopGroup(item: ItemGroup) {
        if (this.invalidate) {
            this.invalidate = false;
            return;
        }

        //this.subgrps = item.children;

        this.itgs.getUnderData(item.types.href).subscribe(res3 => {
            this.itmtypes = [];
            this.itmtypes = res3.items;
        });

        for (let x of this.itemTopGroups) {
            x.isExpanded = false;
        }
        item.isExpanded = true;
    }



    onSelectItemGroup(item: ItemGroup) {
        this.itgs.getUnderData(item.types.href).subscribe(res3 => {
            this.itmtypes = [];
            this.itmtypes = res3.items; });
    }

    private sub;
    doTimer(){

        this.sub = Observable.timer(10000, 150000).flatMap(_ => {
            this.t1 += 1;
            this.tdisplay = "tick: " + this.t1;
            if(this.t1 > 2)
                this.tdisplay = "";
           return this.getTypes();
        }).subscribe();
    }
public subunder;
    ngOnInit() {
        //this.ItemService.setGroupData();
        // this.itgs.getAccessToken().subscribe(res => {
        //     let xxx = res
        // });
        this.getTypes();
        this.doTimer();
        this.getGroups();
        this.subunder = this.itgs.getUnderData('https://crest-tq.eveonline.com/market/types/?group=https://crest-tq.eveonline.com/market/groups/4/')
            .subscribe(res3 => {
                this.itmtypes = res3.items;
            });


    }
    ngOnDestroy(){
        if(this.subunder)
            this.subunder.unsubscribe();
        if(this.sub)
            this.sub.unsubscribe();

    }
}