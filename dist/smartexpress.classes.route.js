"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor(routeStringArg) {
        this.handler = null;
        this.routeString = routeStringArg;
    }
    /**
     * add a handler to do something with requests
     * @param handlerArg
     */
    addHandler(handlerArg) {
        this.handler = handlerArg;
    }
    /**
     * add a express middleware
     * @param middlewareArg
     */
    addExpressMiddleWare(middlewareArg) {
    }
}
exports.Route = Route;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRleHByZXNzLmNsYXNzZXMucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGV4cHJlc3MuY2xhc3Nlcy5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBO0lBR0UsWUFBWSxjQUFzQjtRQURsQyxZQUFPLEdBQVksSUFBSSxDQUFBO1FBRXJCLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUUsVUFBbUI7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUE7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILG9CQUFvQixDQUFFLGFBQWE7SUFFbkMsQ0FBQztDQUNGO0FBdEJELHNCQXNCQyJ9