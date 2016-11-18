/**
 * Created by fox21 on 11/16/2016.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'volPipe'})
export class volPipe implements PipeTransform {
    transform(value: number): string {

        let nn = 0;
        if(value === undefined)
            return '';
        let str = value.toString();

        nn = 0;

        if(str.length < 4)
            return str;

        str = str.split('').reverse().join('');

        let apnd = '';
        let adj = 0;
        let l = str.length / 3 - 1;
        let i = 0;
        for(i = 0; i < l; i++)
        {
            if(str.length > (3 * i + 3)){
                apnd +=  str.substr(3 * i , 3 ) + ',';
            }
            else{
                apnd +=  str.substr(3 * i , 3 ) ;
            }


        }
        if(str.length > (3*i ))
        {
            let xi = str.length - (3 * i );
            apnd +=  str.substr(3 * i ,xi);
        }

        return apnd.split('').reverse().join('');
        //return value.toString().replace(/(\d)(?=(\d{3})+\.)/g, '1,');
    }
}