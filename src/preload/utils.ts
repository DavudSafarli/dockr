import path from 'path'

export const parse = string => JSON.parse(string.trim())
export const dockrcli = path.join(__dirname, 'dockr.exe');