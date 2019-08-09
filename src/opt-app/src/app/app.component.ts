import {Component, OnInit} from '@angular/core';
import findMozDictsFn from '../../../lib/common/findMozDictsFn.js';
import OptHelperImpl from '../../../lib/background/OptHelper/OptHelperImpl.js';
import browserApi from '../../../lib/common/browserApi.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    cfg = null;
    optHelperImpl = new OptHelperImpl();
    port = browserApi.runtime.connect({name: 'OptHelper-cfg-port'});

    aInitFn = async () => {
        this.cfg = JSON.stringify(await this.optHelperImpl.read(), null, 2);
        console.debug(await browserApi.management.getAll());
        console.debug(await browserApi.runtime.getBrowserInfo());
        console.debug(await browserApi.runtime.getPlatformInfo());
        console.debug(await findMozDictsFn(browserApi.runtime.getURL('resource/dicts.json')));
        console.debug(await findMozDictsFn(browserApi.runtime.getURL('resource/dicts.json')));
    };
    aResetFn = async () => {
        const jsonObj = await this.optHelperImpl.reset();

        this.cfg = JSON.stringify(jsonObj, null, 2);
        this.port.postMessage({cmd: 'upd-the-cfg', cfg: jsonObj});
    };
    aSaveFn = async () => {
        let jsonObj;

        try {
            jsonObj = JSON.parse(this.cfg);
        } catch (e) {
            console.debug(e);
        }

        this.port.postMessage({cmd: 'upd-the-cfg', cfg: jsonObj});
    };

    ngOnInit(): void {
        this.aInitFn();
    }

    resetBtnAction() {
        this.aResetFn();
    }

    saveBtnAction() {
        this.aSaveFn();
    }
}