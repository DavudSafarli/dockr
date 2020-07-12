import { execFile, spawn } from 'child_process';
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
    
    async Remove(id: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            const child = execFile(dockrcli, ['rm', id])
            child.stdout!.on("data", (data) => {
                resolve(true)
                child.kill()
            })
            child.stderr!.on("data", (data) => {
                reject(false)
                child.kill()
            })
        })
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

    async Bash(id: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            spawn('docker',[`exec -it ${id} bash`], {
                shell: true,
                detached: true,
            });
        })
    }


}
export default Container.getInstance()