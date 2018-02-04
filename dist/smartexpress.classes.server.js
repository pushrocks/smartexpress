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
const smartexpress_classes_route_1 = require("./smartexpress.classes.route");
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
    addRoute(routeStringArg, handlerArg) {
        let route = new smartexpress_classes_route_1.Route(this, routeStringArg);
        if (handlerArg) {
            route.addHandler(handlerArg);
        }
        this.routeObjectMap.add(route);
        return route;
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
            // helmet
            this.expressAppInstance.use(plugins.helmet());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxrREFBaUQ7QUFFakQsNkVBQW9EO0FBZXBEO0lBWUUsWUFBYSxVQUF5QjtRQVR0QyxtQkFBYyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQVMsQ0FBQTtRQUluRCxnQ0FBZ0M7UUFDeEIsb0JBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2hELDJDQUEyQztRQUMzQyxtQkFBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFBO1FBRzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFBO0lBQzNCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxVQUF5QjtRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVELFFBQVEsQ0FBRSxjQUFzQixFQUFFLFVBQW9CO1FBQ3BELElBQUksS0FBSyxHQUFHLElBQUksa0NBQUssQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUE7UUFDM0MsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNkLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDOUIsQ0FBQztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUssS0FBSyxDQUFFLFVBQTJCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTs7WUFDdkQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZ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