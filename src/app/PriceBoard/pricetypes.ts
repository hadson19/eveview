/**
 * Created by fox21 on 11/16/2016.
 */
export interface PriceTypes { totalCount_str: string; items: Array<items>; region: string; typeName: string; station: string; typeid: number; }
export interface items {
    volume_str: string; buy: boolean; issued: string; price: number; volumeEntered: number;
    minVolume: number; volume: number; range: string; href: string; duration_str: string; location: location; duration: number;
    minVolume_str: string; volumeEntered_str: string; type: type; id: number; id_str: string;
}
export interface location { id_str: string; href: string; id: number; name: string; }
export interface type { id_str: string; href: string; id: number; name: string; }

export class PriceData {price: number; volumeEntered: number; minVolumne: number; volume: number;
    range: string; location: string; type: string; duration: number; issued: string; buy: boolean; }
export interface PriceBand {region: string; itemname: string; station: string; l2pricedata: Array<Level2>; }
export interface PriceSellBand {region: string; itemname: string; station: string; priceData: PriceData; }
export interface PriceSellBands {bands: Array<PriceSellBand>;}
export class Level2 { priceSell: number; volSell: number; Buyrange: string; priceBuy: number; volBuy: number; location: string; }
export class qarray {
    public regionName: string;
    public typeName: string;
    public stationName: string;
    public uri: string;
}
