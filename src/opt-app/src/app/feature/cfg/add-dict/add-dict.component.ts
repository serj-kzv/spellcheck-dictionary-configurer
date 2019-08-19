import {Component, OnInit, ViewChild} from '@angular/core';
import {CfgService} from "../../../core/service/cfg.service";
import {MatRadioChange} from "@angular/material";
import addSpecificCfg from "../../../../../../lib/common/addSpecificCfg";
import browserApi from "../../../../../../lib/common/browserApi";
import findMozDictsFn from "../../../../../../lib/common/findMozDictsFn";
import changeCfg from "../../../../../../lib/common/changeCfg";
import {NgControl} from "@angular/forms";

@Component({
    selector: 'app-add-dict',
    templateUrl: './add-dict.component.html',
    styleUrls: ['./add-dict.component.scss']
})
export class AddDictComponent implements OnInit {
    dicts = [];
    defaultDict = {name: null, target_locale: null, default_locale: null};
    activeDict = this.defaultDict;
    tabs = [];
    defaultTab = {title: null, url: null};
    activeTab = this.defaultTab;
    defaultDictChoice: Choice = {address: null, lang: null};
    activeDictChoice = this.defaultDictChoice;
    addressPatternTypes = [
        {
            name: 'Address',
            value: 'address'
        },
        {
            name: 'Hostname',
            value: 'hostname'
        },
        {
            name: 'Address (starts with)',
            value: 'addressStartsWith'
        },
        {
            name: 'Address (ends with)',
            value: 'addressEndsWith'
        },
    ];
    activeAddressPattern = this.addressPatternTypes[0].value;
    @ViewChild('addressInput', {static: false}) addressInput: NgControl;

    aInitFn = async () => {
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
        console.debug('tabs', await browserApi.tabs.query({}));
        console.debug('dicts', this.dicts);
    };

    aAddSpecificCfgBtnAction = async () => {
        console.debug('aAddSpecificCfgBtnAction');
        console.debug(this.activeDict.target_locale);
        console.debug(this.cfgService.cfg);
        console.debug(this.cfgService.cfgTxt);
        console.debug(this.cfgService.cfg['specificElementMutatorCfgs']);

        // const address = this.activeDictChoice.address;
        const address = this.activeDictChoice.address;
        const lang = this.activeDictChoice.lang;

        console.debug('address', address);

        if (address) {
            switch (true) {
                case this.activeAddressPattern === 'hostname': {
                    addSpecificCfg(
                        this.cfgService.cfg,
                        address,
                        null,
                        lang
                    );
                    break;
                }
                case this.activeAddressPattern === 'address' || this.activeAddressPattern === 'addressStartsWith'
                || this.activeAddressPattern === 'addressEndsWith': {
                    addSpecificCfg(
                        this.cfgService.cfg,
                        null,
                        address,
                        lang
                    );
                    break;
                }
            }
        } else {
            changeCfg(this.cfgService.cfg['default'], null, null, lang);
        }
        this.cfgService.updCfgTxtFromCfg();
        await this.cfgService.saveCfg();
    };

    constructor(public cfgService: CfgService) {
    }

    ngOnInit() {
        this.aInitFn();
    }

    addressPatternSelectAction($event: MatRadioChange) {
        console.debug('activeAddressPattern', this.activeAddressPattern, $event.value, this.activeTab.url);

        let url = this.activeTab.url;

        if (url && (url = url.trim()).length > 0) {
            switch (true) {
                case $event.value === 'hostname' : {
                    try {
                        this.activeDictChoice.address = new URL(this.activeDictChoice.address).hostname;
                        console.debug('hostname', this.activeTab.url);
                    } catch (e) {
                        console.debug(e);
                    }
                    break;
                }
                case $event.value === 'address' : {
                    this.activeDictChoice.address = this.activeTab.url;
                    break;
                }
                case $event.value === 'addressStartsWith' : {
                    if (!this.activeDictChoice.address.startsWith('**')) {
                        this.activeDictChoice.address = `**${this.activeDictChoice.address}`;
                    }
                    break;
                }
                case $event.value === 'addressEndsWith' : {
                    if (!this.activeDictChoice.address.endsWith('**')) {
                        this.activeDictChoice.address = `${this.activeDictChoice.address}**`;
                    }
                    break;
                }
            }
            this.addressInput.control.setValue(this.activeDictChoice.address);
            console.debug('activeDictChoice.address', this.activeDictChoice.address);
        }
    }

    addSpecificCfgBtnAction() {
        this.aAddSpecificCfgBtnAction();
    }

    setActiveChoice($event: any) {
        console.debug('$event', $event);
    }
}
