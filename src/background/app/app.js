import OptHelperImpl from "./OptHelperImpl.js";

const app = async () => {
    console.debug('app is started');

    const optHelper = new OptHelperImpl();

    console.debug('optHelper', optHelper);

    const cfg = await optHelper.read();

    console.debug('cfg', cfg);

    browser.runtime.onConnect.addListener(port => {
        if (port.name === 'cfg-port') {
            port.onMessage.addListener(msg => {
                if (msg.cmd === 'give-me-a-cfg') {
                    console.debug('cfg will be sent ', cfg);
                    port.postMessage(cfg);
                }
            });
        }
    });

    console.debug('app is ended');
};

export default app;