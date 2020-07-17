import { contextBridge } from "electron";
import Events from './events';
import Container from './container';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

const exposedObject: ElectronPreloadAPI = {
    Container: {
        Start: Container.Start,
        Stop: Container.Stop,
        Bash: Container.Bash,
        Remove: Container.Remove,
        List: Container.List,
        Logs: Container.Logs,
    },
    Events: {
        RegisterEventListener: Events.RegisterEventListener,
        UnregisterEventListener: Events.UnregisterEventListener,
    }
}

contextBridge.exposeInMainWorld("api", exposedObject);
