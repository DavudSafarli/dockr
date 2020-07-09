import { Containers } from ".";

// export something to make it module
export {}
declare global {
  interface ElectronPreloadAPI {
    GetContainers: () => Promise<Containers>;
  }

  interface Window {
    api: ElectronPreloadAPI
  }  

}