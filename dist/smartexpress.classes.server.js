"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartexpress.plugins");
class Server {
    constructor() {
        this.startedDeferred = plugins.smartq.defer();
        this.startedPromise = this.startedDeferred.promise;
        this.routeObjectMap = new plugins.lik.Objectmap();
        this.expressAppInstance = plugins.express();
    }
    /**
     * enables cors policy
     */
    enableCors() {
        this.expressAppInstance.use(plugins.cors());
    }
    enableForceSsl() {
        this.expressAppInstance.set('forceSSLOptions', {
            enable301Redirects: true,
            trustXFPHeader: true,
            sslRequiredMessage: 'SSL Required.'
        });
        this.expressAppInstance.use(plugins.expressForceSsl);
    }
    addRoute(routeArg) {
        this.routeObjectMap.add(routeArg);
    }
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            let done = plugins.smartq.defer();
            this.expressServerInstance = this.expressAppInstance.listen(port, '0.0.0.0', () => {
                console.log(`pubapi-1 now listening on ${port}!`);
                this.startedDeferred.resolve();
                done.resolve();
            });
            return yield done.promise;
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.expressServerInstance.close();
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxrREFBaUQ7QUFNakQ7SUFRRTtRQUxRLG9CQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNoRCxtQkFBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFBO1FBRTdDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBUyxDQUFBO1FBR2pELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFO1lBQzdDLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsa0JBQWtCLEVBQUUsZUFBZTtTQUNwQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBRUQsUUFBUSxDQUFDLFFBQWU7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVLLEtBQUssQ0FBQyxJQUFZOztZQUN0QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7Z0JBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLElBQUksR0FBRyxDQUFDLENBQUE7Z0JBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNoQixDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDM0IsQ0FBQztLQUFBO0lBRUssSUFBSTs7WUFDUixJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDcEMsQ0FBQztLQUFBO0NBRUY7QUE5Q0Qsd0JBOENDIn0=