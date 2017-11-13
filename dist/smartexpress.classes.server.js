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
    /**
     * adds a Route to the Server
     */
    addRouter(routeArg) {
        this.routeObjectMap.add(routeArg);
    }
    addRoute(routeArg) {
        this.routeObjectMap.add(routeArg);
    }
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            this.expressAppInstance = plugins.express();
            this.httpServer = new plugins.http.Server(this.expressAppInstance);
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
            let done = plugins.smartq.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRleHByZXNzLmNsYXNzZXMuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxrREFBaUQ7QUFhakQ7SUFZRSxZQUFhLFVBQXlCO1FBVHRDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBUyxDQUFBO1FBSW5ELGdDQUFnQztRQUN4QixvQkFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDaEQsMkNBQTJDO1FBQzNDLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUE7UUFHM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUE7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxDQUFFLFFBQWU7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELFFBQVEsQ0FBRSxRQUFlO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFSyxLQUFLLENBQUUsSUFBWTs7WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7WUFFbEUsTUFBTTtZQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDN0Msa0JBQWtCLEVBQUUsSUFBSTtvQkFDeEIsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLGtCQUFrQixFQUFFLGVBQWU7aUJBQ3BDLENBQUMsQ0FBQTtnQkFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUN0RCxDQUFDO1lBRUQsT0FBTztZQUNQLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUM3QyxDQUFDO1lBQ0QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsSUFBSSxHQUFHLENBQUMsQ0FBQTtnQkFDakQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtnQkFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUMzQixDQUFDO0tBQUE7SUFFRCxhQUFhO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDeEIsQ0FBQztJQUVLLElBQUk7O1lBQ1IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNoQixDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDM0IsQ0FBQztLQUFBO0NBRUY7QUFsRUQsd0JBa0VDIn0=