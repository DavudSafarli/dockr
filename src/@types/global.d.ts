// export something to make it module
export {}
declare global {
  interface ElectronPreloadAPI {
    GetContainers: () => Promise<string>;
  }

  interface Window {
    api: ElectronPreloadAPI
  }  

}