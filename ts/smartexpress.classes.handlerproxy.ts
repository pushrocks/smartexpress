import * as plugins from './smartexpress.plugins';
import { Handler } from './smartexpress.classes.handler';

export class HandlerProxy extends Handler {
    /**
     * The constuctor of HandlerProxy
     * @param remoteMountPointArg
     */
    constructor(remoteMountPointArg: string) {
        super('ALL', async (req, res) => {
            const relativeRequest = req.path.slice(req.route.path.length-1);
            const proxyRequestUrl = remoteMountPointArg + relativeRequest;
            const proxiedResponse = await plugins.smartrequest.request()
        });
    }
}
