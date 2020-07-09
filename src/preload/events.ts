import { execFile, ChildProcess } from 'child_process';
import { parse, dockrcli } from './utils';

class Events {
    private static instance: Events;
    private static listener: (listener: (chunk: any) => void) => void;
    private static process: ChildProcess;
    private constructor() { }

    public static getInstance(): Events {
        if (!Events.instance) {
            Events.instance = new Events();
        }

        return Events.instance;
    }


    public RegisterEventListener(listener: (chunk: any) => void): void {
        Events.listener = listener;
        console.log('RegisterEventListener');
        
        Events.process = execFile(dockrcli, ['listen'])
        Events.process.stdout!.on("data", data => {
            if(Events.listener)
                Events.listener(parse(data))
        })
    }
    
    public UnregisterEventListener(): void {
        Events.process.kill()
        delete Events.listener
    }

}
export default Events.getInstance()