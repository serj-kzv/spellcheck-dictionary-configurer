import {Injectable} from '@angular/core';
import OptHelperImpl from '../../../../../lib/background/OptHelper/OptHelperImpl.js';

@Injectable({
    providedIn: 'root'
})
export class OptHelperImplService extends OptHelperImpl {

    constructor() {
        super();
    }

    read() {
        return super.read();
    }
}
