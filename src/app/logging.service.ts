// dummy class to demonstrate the loading of services 

import { Injectable } from '@angular/core';

//@Injectable({providedIn:"root"})
export class LoggingService {
    lastLog: string;

    printLog(message:string){
        console.log(message);
        console.log(this.lastLog);
        this.lastLog = message;        
    }

}