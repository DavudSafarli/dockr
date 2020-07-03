import { contextBridge } from "electron";
import {execFile, exec, execSync} from 'child_process'
import path from 'path'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        xecFile: () => {
            return new Promise((resolve, reject) => {
                let exefile = path.join(__dirname, 'dockr.exe');
                let returnData;
                execFile(exefile, ['ls'], (error, stdout, stderr) => {
                    if(error) {
                        return resolve(error)
                    }
                    if (stderr) {
                        return resolve(error)
                    }
                    return resolve(stdout)
                })
            })
        },
    }
);