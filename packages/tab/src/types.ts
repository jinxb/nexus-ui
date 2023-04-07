export interface IBtnListType {
  name: string
  size?: string
  type?: string
  show: boolean
  disabled?: boolean
  options?: {
    plain?: boolean
    text?: boolean
    round?: boolean
    circle?: boolean
    color?: boolean
  }
}

type optionsType = {
  label: string
  value: string
}
export interface IScreenData {
  label?: string
  type: string
  key: string
  placeholder?: string
  width?: string
  clearable?: boolean
  // selection?: options[]
  options?: optionsType[]
}
