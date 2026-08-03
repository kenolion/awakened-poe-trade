import { CLIENT_STRINGS } from '@/assets/data'
import type { TranslationDict } from '@/assets/data'
import { registerSectionParser, type ParserState, type SectionParseResult } from './registry'

function parseMercenaryWarrant (section: string[], item: ParserState): SectionParseResult {
  if (item.info.refName !== 'Mercenary Warrant') return 'PARSER_SKIPPED'

  const buildPrefix = (CLIENT_STRINGS as TranslationDict & { MERCENARY_BUILD?: string }).MERCENARY_BUILD ?? 'Build: '
  for (const line of section) {
    if (line.startsWith(buildPrefix)) {
      item.mercenaryBuild = line.slice(buildPrefix.length)
      return 'SECTION_PARSED'
    }
  }

  return 'SECTION_SKIPPED'
}

registerSectionParser(parseMercenaryWarrant)
