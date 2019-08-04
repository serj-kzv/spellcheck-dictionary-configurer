export default class OptHelperBase {
    constructor(storageType = 'local', name = 'options') {
        this.name = name;
        this.storage = OptHelperBase.getStorageByType(storageType);
    }

    static getStorageByType(storageType) {
        switch (true) {
            case typeof browser === 'undefined': {
                return localStorage;
            }
            case storageType === 'local': {
                return browser.storage.local;
            }
        }
    }

    async readOptions() {
        const stored = await this.storage.get(this.name);

        if (typeof stored.options !== 'undefined') {
            return stored.options;
        }

        return await this.saveOptions({});
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
