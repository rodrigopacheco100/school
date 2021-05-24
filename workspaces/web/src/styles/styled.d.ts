/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'

import { Color } from './theme'

export type Theme = Color

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
