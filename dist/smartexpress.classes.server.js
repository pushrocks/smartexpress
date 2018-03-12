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
        this.serverStatus = 'initiated';
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
                this.serverStatus = 'running';
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
            if (this.httpServer) {
                this.httpServer.close(() => {
                    done.resolve();
                    this.serverStatus = 'stopped';
                });
            }
            else {
                throw new Error('There is no Server to be stopped. Have you started it?');
            }
            return yield done.promise;
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxrREFBa0Q7QUFFbEQsNkVBQXFEO0FBaUJyRDtJQVlFLFlBQVksVUFBeUI7UUFUckMsbUJBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFTLENBQUM7UUFFcEQsaUJBQVksR0FBa0IsV0FBVyxDQUFDO1FBRTFDLGdDQUFnQztRQUN4QixvQkFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakQsMkNBQTJDO1FBQzNDLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFHNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDNUIsQ0FBQztJQUVELG1CQUFtQixDQUFDLFVBQXlCO1FBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsUUFBUSxDQUFDLGNBQXNCLEVBQUUsVUFBb0I7UUFDbkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxrQ0FBSyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFSyxLQUFLLENBQUMsVUFBMkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJOztZQUN0RCxJQUFJLElBQUksR0FBRyxPQUFPLENB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