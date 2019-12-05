import {PureComponent, ReactNode} from 'react'

export type TypographyType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'text'
  | 'quote'
  | 'epigraph'
  | 'source'
  | 'timestamp'
  | 'description'
  | 'galleryDescription'
  | 'photoSource'
  | 'list'

export interface TypographyProps {
  type?: TypographyType
  tagName?: string
  children?: ReactNode
  uppercase?: boolean
}

export default class Typography extends PureComponent<TypographyProps, {}> {}
