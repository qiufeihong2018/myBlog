"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const serviceManager_1 = require("../serviceManager");
class Inspector {
    constructor(actionFeature) {
        this.actionFeature = actionFeature;
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.exposeActions();
                return resolve();
            }).catch((e) => console.error(e));
        });
    }
    exposeActions() {
        this.actionFeature.action('km:event-loop-dump', function (reply) {
            const dump = serviceManager_1.ServiceManager.get('eventLoopService').inspector.dump();
            return reply({
                success: true,
                dump: dump
            });
        });
    }
}
exports.default = Inspector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRMb29wSW5zcGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvZXZlbnRMb29wSW5zcGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHNEQUFrRDtBQUVsRDtJQUlFLFlBQWEsYUFBNkI7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7SUFDcEMsQ0FBQztJQUVLLElBQUk7O1lBQ1IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFFckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2dCQUVwQixPQUFPLE9BQU8sRUFBRSxDQUFBO1lBQ2xCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25DLENBQUM7S0FBQTtJQUVPLGFBQWE7UUFFbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxLQUFLO1lBQzdELE1BQU0sSUFBSSxHQUFHLCtCQUFjLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO1lBRXBFLE9BQU8sS0FBSyxDQUFDO2dCQUNYLE9BQU8sRUFBRSxJQUFJO2dCQUNiLElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUE1QkQsNEJBNEJDIn0=