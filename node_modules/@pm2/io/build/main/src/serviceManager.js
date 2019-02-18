"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services = {
    metricsMap: new Map(),
    actions: new Map(),
    actionsScoped: new Map()
};
if (require('semver').satisfies(process.version, '>= 10.0.0') ||
    (require('semver').satisfies(process.version, '>= 8.0.0') && process.env.FORCE_INSPECTOR)) {
    services['inspector'] = require('./services/inspector');
}
class ServiceManager {
    static get(type) {
        return services[type];
    }
    static set(type, service) {
        services[type] = service;
    }
    static reset(type) {
        services[type] = new Map();
    }
}
exports.ServiceManager = ServiceManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLFFBQVEsR0FJVjtJQUNGLFVBQVUsRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUNyQixPQUFPLEVBQUUsSUFBSSxHQUFHLEVBQUU7SUFDbEIsYUFBYSxFQUFFLElBQUksR0FBRyxFQUFFO0NBQ3pCLENBQUE7QUFFRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7SUFDM0QsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRTtJQUMzRixRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7Q0FDeEQ7QUFFRDtJQUVTLE1BQU0sQ0FBQyxHQUFHLENBQUUsSUFBWTtRQUM3QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQUcsQ0FBRSxJQUFZLEVBQUUsT0FBTztRQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFBO0lBQzFCLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFFLElBQVk7UUFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDNUIsQ0FBQztDQUNGO0FBYkQsd0NBYUMifQ==