import { contextBridge } from "electron";
import {execFile} from 'child_process'
import { parse, dockrcli } from './utils';
import Events from './events';
import Container from './container';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        GetContainers: async () => {
            return new Promise((resolve, reject) => {
                console.log('run dockr.exe');
                let child = execFile(dockrcli, ['ls'], {
                    timeout: 1000
                },(error, stdout, stderr) => {
                    console.log('dockr.exe returned');
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
        },
        Events: {
            RegisterEventListener: Events.RegisterEventListener,
            UnregisterEventListener: Events.UnregisterEventListener,
        }
    } as ElectronPreloadAPI,
);
