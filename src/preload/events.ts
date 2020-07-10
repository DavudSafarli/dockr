import { execFile, ChildProcess } from 'child_process';
import { parse, dockrcli } from './utils';
import { EventInterface } from '@/@types/global';
import { Message } from '@/@types/events';

class Events implements EventInterface {
    private static instance: Events;
    private static listener: (chunk: Message) => void;
    private static process: ChildProcess;
    private constructor() { }

    public static getInstance(): Events {
        if (!Events.instance) {
            Events.instance = new Events();
        }

        return Events.instance;
    }


    public RegisterEventListener(listener: (chunk: Message) => void): void {
        Events.listener = listener;
        
        Events.process = execFile(dockrcli, ['listen'])
        Events.process.stdout!.on("data", data => {

            if(!Events.listener) return;

            const chunks: Array<string> = data.trim().split("\n")
            chunks.forEach(chunk => {
                try {
                    Events.listener(parse(chunk))   
                } catch (error) {
                    console.error(error)
                }
            });

        })
    }
    
    public UnregisterEventListener(): void {
        Events.process.kill()
        delete Events.listener
    }

}
export default Events.getInstance()