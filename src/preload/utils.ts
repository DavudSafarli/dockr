import path from 'path'

export const parse = string => JSON.parse(string.trim())

export const dockrcli = (() => {
    if(process.env.NODE_ENV == "development") {
        return path.join(__dirname,"..","public", 'dockr.exe')
    }else {
        return path.join(__dirname, 'dockr.exe')
    }
})();
