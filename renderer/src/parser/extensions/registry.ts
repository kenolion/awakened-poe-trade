import type { Result } from 'neverthrow'
import type { BaseType } from '@/assets/data'
import type { ParsedItem } from '../ParsedItem'

export type SectionParseResult =
  | 'SECTION_PARSED'
  | 'SECTION_SKIPPED'
  | 'PARSER_SKIPPED'

export interface ParserState extends ParsedItem {
  name: string
  baseType: string | undefined
  infoVariants: BaseType[]
}

export type ParserFn = (section: string[], item: ParserState) => SectionParseResult
export type VirtualParserFn = (item: ParserState) => Result<never, string> | void

const sectionParsers: ParserFn[] = []
const virtualParsers: VirtualParserFn[] = []

export function registerSectionParser (parser: ParserFn) {
  sectionParsers.push(parser)
}

export function registerVirtualParser (parser: VirtualParserFn) {
  virtualParsers.push(parser)
}

export function getSectionParsers () {
  return [...sectionParsers]
}

export function getVirtualParsers () {
  return [...virtualParsers]
}
