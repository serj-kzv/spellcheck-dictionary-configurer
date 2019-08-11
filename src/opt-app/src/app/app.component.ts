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
    dicts = [];
    activeDict = null;
    tabs = [];
    activeTab = null;

    aInitFn = async () => {
        this.cfg = JSON.stringify(await this.optHelperImpl.read(), null, 2);
        this.dicts = (await findMozDictsFn(browserApi.runtime.getURL('resource/dicts.json')))
            .sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        this.tabs = await browserApi.tabs.query({});
        console.debug(await browserApi.tabs.query({}));
        console.debug(await browserApi.management.getAll());
        console.debug(await browserApi.runtime.getBrowserInfo());
        console.debug(await browserApi.runtime.getPlatformInfo());
        console.debug(this.dicts);
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
            alert('A JSON text that you try to save is invalid, fix it and try again!');
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

    selectDict() {

    }
}
