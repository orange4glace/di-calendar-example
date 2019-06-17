export class ServiceCollection {

  private services_: Map<string, any> = new Map();

  public addService(serviceID: string, service: any): void {
    this.services_.set(serviceID, service);
  }
  public getService<T>(serviceID: string): T {
    return this.services_.get(serviceID);
  }

}