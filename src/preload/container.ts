import { execFile } from 'child_process';
import { dockrcli } from './utils';
import { ContainerInterface } from '@/@types/global';

class Container implements ContainerInterface {
    private static instance: Container;
    private constructor() { }
    
    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        
        return Container.instance;
    }
    
    Start(id: string): Promise<boolean>{

        return new Promise((resolve, reject) => {
            
            const child = execFile(dockrcli, ['start', id])
            child.stdout!.on("data", (data) => {
                resolve(true)
                child.kill()
            })
            child.stdout!.on("error", (data) => {
                reject(false)
                child.kill()
            })
        })
    }
    
    async Stop(id: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            const child = execFile(dockrcli, ['stop', id])
            child.stdout!.on("data", (data) => {
                resolve(true)
                child.kill()
            })
            child.stdout!.on("error", (data) => {
                reject(false)
                child.kill()
            })
        })
    }

}
export default Container.getInstance()