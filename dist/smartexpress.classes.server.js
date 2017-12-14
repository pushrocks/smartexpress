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
    addRoute(routeArg) {
        this.routeObjectMap.add(routeArg);
    }
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            let done = plugins.smartq.defer();
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
            // finally listen on a port
            this.httpServer.listen(port, '0.0.0.0', () => {
                console.log(`pubapi-1 now listening on ${port}!`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxrREFBaUQ7QUFjakQ7SUFZRSxZQUFhLFVBQXlCO1FBVHRDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBUyxDQUFBO1FBSW5ELGdDQUFnQztRQUN4QixvQkFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDaEQsMkNBQTJDO1FBQzNDLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUE7UUFHM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUE7SUFDM0IsQ0FBQztJQUVELFFBQVEsQ0FBRSxRQUFlO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFSyxLQUFLLENBQUUsSUFBWTs7WUFDdkIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUVqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtZQUVsRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxDQUFDLCtCQUErQjtZQUN0RixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxD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