import { contextBridge } from "electron";
import {execFile} from 'child_process'
import { parse, dockrcli } from './utils';
import Events from './events';
import Container from './container';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

const exposedObject: ElectronPreloadAPI = {
    GetContainers: async () => {
        return new Promise((resolve, reject) => {
            let child = execFile(dockrcli, ['ls'], {
                timeout: 1000
            },(error, stdout, stderr) => {
                if(error) {
                    reject(error.toString())
                }
                if (stderr) {
                    reject(stderr)
                }
                if(stdout) {
                    resolve(parse(stdout))
                }
                return
            })
        })
    },
    Container: {
        Start: Container.Start,
        Stop: Container.Stop,
        Bash: Container.Bash,
    },
    Events: {
        RegisterEventListener: Events.RegisterEventListener,
        UnregisterEventListener: Events.UnregisterEventListener,
    }
} 


contextBridge.exposeInMainWorld("api", exposedObject);
