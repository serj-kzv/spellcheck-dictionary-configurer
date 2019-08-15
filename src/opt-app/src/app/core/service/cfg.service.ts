import {Injectable} from '@angular/core';
import browserApi from "../../../../../lib/common/browserApi";
import OptHelperImpl from "../../../../../lib/background/OptHelper/OptHelperImpl";
import {OptHelperImplService} from "./opt-helper-impl.service";

@Injectable({
    providedIn: 'root'
})
export class CfgService {
    cfg: Cfg = null;
    cfgTxt: string | null = null;
    port = browserApi.runtime.connect({name: 'OptHelper-cfg-port'});
    optHelperImpl = new OptHelperImpl();

    constructor(private optHelperImplService: OptHelperImplService) {
    }

    async initCfg() {
        this.cfg = await this.optHelperImplService.read();
    }

    updCfgTxtFromCfg() {
        this.cfgTxt = JSON.stringify(this.cfg, null, 2);
    }

    updCfgFromCfgTxt() {
        try {
            this.cfg = JSON.parse(this.cfgTxt);
        } catch (e) {
            console.debug(e);
            alert('A JSON text that you try to save is invalid, fix it and try again!');
        }
    }

    async saveCfg() {
        if (this.cfgTxt.trim().length < 1) {
            this.cfgTxt = '{}';
        }

        this.port.postMessage({cmd: 'upd-the-cfg', cfg: this.cfg});
    }

    async resetCfg() {
        this.cfg = await this.optHelperImpl.reset();

        this.cfgTxt = JSON.stringify(this.cfg, null, 2);
        this.port.postMessage({cmd: 'upd-the-cfg', cfg: this.cfg});
    }
}
