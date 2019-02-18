"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profilingCPUFallback_1 = require("../profiling/profilingCPUFallback");
const profilingHeapFallback_1 = require("../profiling/profilingHeapFallback");
const configuration_1 = require("../configuration");
const semver = require("semver");
class ProfilingFeature {
    init(forceFallback) {
        // allow to force the fallback via environment
        if (process.env.PM2_PROFILING_FORCE_FALLBACK)
            forceFallback = true;
        const isInspectorOk = (semver.satisfies(process.version, '>= 10.0.0') ||
            (semver.satisfies(process.version, '>= 8.0.0') && process.env.FORCE_INSPECTOR)) && !forceFallback;
        let ProfilingCPU;
        let ProfilingHeap;
        if (isInspectorOk) {
            ProfilingCPU = require('../profiling/profilingCPU').default;
            ProfilingHeap = require('../profiling/profilingHeap').default;
            configuration_1.default.configureModule({
                heapdump: true
            });
        }
        this.profilings = {
            cpuProfiling: isInspectorOk ? new ProfilingCPU() : new profilingCPUFallback_1.default(),
            heapProfiling: isInspectorOk ? new ProfilingHeap() : new profilingHeapFallback_1.default()
        };
        return this.profilings;
    }
    destroy() {
        for (let profilingName in this.profilings) {
            if (typeof this.profilings[profilingName].destroy === 'function') {
                this.profilings[profilingName].destroy();
            }
        }
    }
}
exports.default = ProfilingFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL3Byb2ZpbGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRFQUFvRTtBQUNwRSw4RUFBc0U7QUFDdEUsb0RBQTRDO0FBQzVDLGlDQUFnQztBQUVoQztJQUlFLElBQUksQ0FBRSxhQUF1QjtRQUMzQiw4Q0FBOEM7UUFDOUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QjtZQUFFLGFBQWEsR0FBRyxJQUFJLENBQUE7UUFFbEUsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDO1lBQ25FLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUNuRyxJQUFJLFlBQVksQ0FBQTtRQUNoQixJQUFJLGFBQWEsQ0FBQTtRQUVqQixJQUFJLGFBQWEsRUFBRTtZQUNqQixZQUFZLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUMsT0FBTyxDQUFBO1lBQzNELGFBQWEsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxPQUFPLENBQUE7WUFFN0QsdUJBQWEsQ0FBQyxlQUFlLENBQUM7Z0JBQzVCLFFBQVEsRUFBRyxJQUFJO2FBQ2hCLENBQUMsQ0FBQTtTQUNIO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLDhCQUFvQixFQUFFO1lBQzdFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksK0JBQXFCLEVBQUU7U0FDakYsQ0FBQTtRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsT0FBTztRQUNMLEtBQUssSUFBSSxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN6QyxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO2FBQ3pDO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUFyQ0QsbUNBcUNDIn0=