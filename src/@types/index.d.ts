import { ContainerState } from "./enums/ContainerState"

type Dict<T> = { [key: string]: T; }
type Containers = Dict<Container>

interface Container {
  Id: string,
  Image: string,
  Names: Array<string>,
  Ports: Array<Port>,
  State: ContainerState,
  Command: string,
  Status: string,
  Created: number,
}

export type ContainerBriefInfo = {
  name: string,
  image: string,
  ports?: Array<Port>,
  state: ContainerState,
  status: string,
}

type Port = {
  IP?: string,
  PrivatePort: number,
  PublicPort?: number,
  Type: string,
}

type IconOptions = {
  iconComponent?: Function,
  class?: object,
  onclick?: Function,
  removeHoverEffect?: boolean,
  svgClass?: object
}

type TabOptions = {
  id: any
  title: string
  iconOptions?: IconOptions
}

type TabsOptions = {
  sliderColor: String,
  color: String,
  backgroundColor: String,
}