/**
 * Created by fox21 on 11/16/2016.
 */
import { Component } from '@angular/core';


@Component({

    templateUrl: 'app/Help/help.component.html',
    styleUrls: ['app/Help/chartstyle.css'],

})

export class HelpComponent  {
/*
    public login(event: any, cname: string, pw: string)
    {


    }
*/
    public saveCharacter(cn: string)
    {
        localStorage.setItem('character', cn);
    }
}