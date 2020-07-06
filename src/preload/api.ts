import { contextBridge } from "electron";
import {execFile} from 'child_process'
import path from 'path'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        GetContainers: async () => {
            return new Promise((resolve, reject) => {
                let exefile = path.join(__dirname, 'dockr.exe');
                console.log('run dockr.exe');
                let child = execFile(exefile, ['ls'], {
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
                        resolve(stdout)
                    }
                    child.kill()
                    return
                })
            })
        },
    } as ElectronPreloadAPI,
);