"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const debug = debug_1.default('axm:proxy');
class Proxy {
    static wrap(object, methods, hook) {
        if (!Array.isArray(methods))
            methods = [methods];
        for (let i = 0; i < methods.length; ++i) {
            debug('Wrapping method:', methods[i]);
            const original = object[methods[i]];
            if (!original)
                return debug('Method %s unknown', methods[i]);
            if (original.__axm_original) {
                debug('Already wrapped', methods[i]);
                if (methods[i] !== '_load') {
                    return;
                }
            }
            const hooked = hook(original);
            if (original.__axm_original) {
                hooked.__axm_original = original.__axm_original;
            }
            else {
                hooked.__axm_original = original;
            }
            object[methods[i]] = hooked;
        }
    }
}
exports.default = Proxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvcHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBeUI7QUFDekIsTUFBTSxLQUFLLEdBQUcsZUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBRWhDO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUk7UUFFaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFaEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDdkMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3JDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUVuQyxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUU1RCxJQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQzNCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDcEMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO29CQUMxQixPQUFNO2lCQUNQO2FBQ0Y7WUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFFN0IsSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFO2dCQUMzQixNQUFNLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUE7YUFDaEQ7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUE7YUFDakM7WUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO1NBQzVCO0lBQ0gsQ0FBQztDQUNGO0FBNUJELHdCQTRCQyJ9