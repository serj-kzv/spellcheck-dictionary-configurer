import browserApi from "../../common/browserApi.js";

export default class OptHelperBase {
    constructor(storageType = 'local', name = 'options') {
        console.debug('init OptHelperBase constructor');
        this.name = name;
        this.storage = OptHelperBase.getStorageByType(storageType);
        console.debug('init OptHelperBase constructor is finished');
    }

    static getStorageByType(storageType) {
        console.debug('getStorageByType, browserApi.storage is ', browserApi.storage);
        switch (true) {
            case typeof browser === 'undefined': {
                console.debug('getStorageByType, storageType is ', storageType);
                return localStorage;
            }
            case storageType === 'local': {
                console.debug('getStorageByType, storageType is ', storageType);
                return browserApi.storage.local;
            }
            default : {
                console.debug('An error in getStorageByType');
            }
        }
    }

    async hasOptions() {
        const stored = await this.storage.get(this.name);

        if (typeof stored.options !== 'undefined') {
            return stored.options;
        }

        return false;
    }

    readOptions() {
        return this.storage.get(this.name);
    }

    async saveOptions(options) {
        await this.storage.set({options});

        return options;
    }

    async saveOptionsData(name, data) {
        const options = await this.readOptions();

        if (options !== undefined) {
            options[name] = data;

            return await this.storage.set({options});
        }
    }

    async readOptionsData(name) {
        const options = await this.readOptions();

        if (options !== undefined) {
            const cfg = options[name];

            if (typeof cfg !== 'undefined') {
                return cfg;
            }
        }
    }

    async removeOptionData(name) {
        const options = await this.readOptions();

        if (options !== undefined) {
            delete options[name];

            return await this.storage.set({options});
        }
    }

    clear() {
        return this.storage.clear();
    }
}
