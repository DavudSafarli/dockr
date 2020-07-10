export type Message = {
  status?: string
  id?: string
  from?: string
  
  Type: string
  Action: string
  Actor: Actor

  Scope?: string

  Time?: bigint
  TimeNano?: bigint
}

type Actor = {
  Id: string
  Attributes: Map<string, string>
}