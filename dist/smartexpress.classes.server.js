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
    constructor(optionsArg) {
        this.routeObjectMap = new plugins.lik.Objectmap();
        // do stuff when server is ready
        this.startedDeferred = plugins.smartq.defer();
        // tslint:disable-next-line:member-ordering
        this.startedPromise = this.startedDeferred.promise;
        this.options = optionsArg;
    }
    updateServerOptions(optionsArg) {
        Object.assign(this.options, optionsArg);
    }
    addRoute(routeArg) {
        this.routeObjectMap.add(routeArg);
    }
    start(portArg = this.options.port) {
        return __awaiter(this, void 0, void 0, function* () {
            let done = plugins.smartq.defer();
            if (typeof portArg === 'string') {
                portArg = parseInt(portArg);
            }
            this.expressAppInstance = plugins.express();
            this.httpServer = new plugins.http.Server(this.expressAppInstance);
            this.expressAppInstance.use(plugins.bodyParser.json()); // for parsing application/json
            this.expressAppInstance.use(plugins.bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
            // ssl
            if (this.options.forceSsl) {
                this.expressAppInstance.set('forceSSLOptions', {
                    enable301Redirects: true,
                    trustXFPHeader: true,
                    sslRequiredMessage: 'SSL Required.'
                });
                this.expressAppInstance.use(plugins.expressForceSsl);
            }
            // cors
            if (this.options.cors) {
                this.expressAppInstance.use(plugins.cors());
            }
            // set up routes in for express
            yield this.routeObjectMap.forEach((routeArg) => __awaiter(this, void 0, void 0, function* () {
                let expressRoute = this.expressAppInstance.route(routeArg.routeString);
                routeArg.handlerObjectMap.forEach((handler) => __awaiter(this, void 0, void 0, function* () {
                    switch (handler.httpMethod) {
                        case 'GET':
                            expressRoute.get(handler.handlerFunction);
                            return;
                        case 'POST':
                            expressRoute.post(handler.handlerFunction);
                            return;
                        case 'PUT':
                            expressRoute.put(handler.handlerFunction);
                            return;
                        case 'ALL':
                            expressRoute.all(handler.handlerFunction);
                            return;
                        case 'DELETE':
                            expressRoute.delete(handler.handlerFunction);
                            return;
                        default:
                            return;
                    }
                }));
            }));
            if (this.options.defaultAnswer) {
                this.expressAppInstance.get('/', (request, response) => {
                    response.send(this.options.defaultAnswer);
                });
            }
            // finally listen on a port
            this.httpServer.listen(portArg, '0.0.0.0', () => {
                console.log(`pubapi-1 now listening on ${portArg}!`);
                this.startedDeferred.resolve();
                done.resolve();
            });
            return yield done.promise;
        });
    }
    getHttpServer() {
        return this.httpServer;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            let done = plugins.smartq.defer();
            this.httpServer.close(() => {
                done.resolve();
            });
            return yield done.promise;
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxrREFBaUQ7QUFnQmpEO0lBWUUsWUFBYSxVQUF5QjtRQVR0QyxtQkFBYyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQVMsQ0FBQTtRQUluRCxnQ0FBZ0M7UUFDeEIsb0JBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2hELDJDQUEyQztRQUMzQyxtQkFBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFBO1FBRzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFBO0lBQzNCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxVQUF5QjtRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVELFFBQVEsQ0FBRSxRQUFlO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFSyxLQUFLLENBQUUsVUFBMkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJOztZQUN2RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBRWpDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDN0IsQ0FBQztZQUVELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJ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