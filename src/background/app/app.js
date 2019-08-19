import OptHelperImpl from "../../lib/background/OptHelper/OptHelperImpl.js";
import browserApi from "../../lib/common/browserApi.js";

const app = async () => {
    console.debug('app is started');

    const optHelperImpl = await OptHelperImpl.build();

    console.debug('optHelperImpl is created and connected to content js:', optHelperImpl);

    await optHelperImpl.save(optHelperImpl.cfg);
    browserApi.browserAction.onClicked.addListener(() => browserApi.runtime.openOptionsPage());

    console.debug('app is ended');
};

export default app;