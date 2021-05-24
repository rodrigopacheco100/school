export type Color = {
  colors: {
    background: string
    text: string
    primary: string
  }
}

type Theme = {
  [k in Themes]: Color
}

// eslint-disable-next-line no-shadow
export enum Themes {
  DARK = 'dark',
  LIGHT = 'light'
}

const theme: Theme = {
  dark: {
    colors: {
      background: '#121214',
      text: '#a1a1a1',
      primary: '#8257e6'
    }
  },
  light: {
    colors: {
      background: '#e1e1e6',
      text: '#121214',
      primary: '#8257e6'
    }
  }
}

export default theme
