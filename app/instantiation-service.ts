import { ServiceCollection } from "service-collection";

export function IInstantiationService(ctor: any, methodName: string, paramIndex: number): any {
  if (ctor['DEPENDENCIES']) ctor['DEPENDENCIES'].push(InstantiationService.ID);
  else ctor['DEPENDENCIES'] = [InstantiationService.ID];
}

export class InstantiationService {

  static readonly ID = 'InstiationService';

  private serviceCollection_: ServiceCollection;

  constructor(serviceCollection: ServiceCollection) {
    serviceCollection.addService('InstantiationService', this);
    this.serviceCollection_ = serviceCollection;
  }

  createInstance<T>(ctor: any, ...args: any[]): T {
    const dependencyIDs = ctor['DEPENDENCIES'] || [];
    const dependencies: any[] = [];
    for (let i = 0; i < dependencyIDs.length; i ++) {
      const dependencyID = dependencyIDs[i];
      const dependency = this.serviceCollection_.getService(dependencyID);
      if (!dependency) throw new Error('Unknown dependency! ' + dependencyID);
      dependencies.push(dependency);
    }
    args = args.concat(dependencies);
    return new ctor(...args)
  }

}