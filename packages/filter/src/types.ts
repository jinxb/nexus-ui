export interface IBtnListType {
  name: string
  size?: string
  type?: string
  show: boolean
  cb: Function
  disabled?: boolean
  options?: {
    plain?: boolean
    text?: boolean
    round?: boolean
    circle?: boolean
    color?: boolean
  }
}

export interface IScreenData {
  label?: string
  type: string
  key: string
  placeholder?: string
  width?: string
  labelWidth?: string
  clearable?: boolean
  options?: Record<string, string>[]
}
