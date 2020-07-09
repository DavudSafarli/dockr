import { Containers } from ".";

// export something to make it module
export {}
declare global {
  interface ElectronPreloadAPI {
    GetContainers: () => Promise<Containers>;
    Events: EventInterface;
  }

  interface Window {
    api: ElectronPreloadAPI
  }  

}

interface EventInterface {
  RegisterEventListener: (listener: (chunk: any) => void) => void;
  UnregisterEventListener: () => void;

}