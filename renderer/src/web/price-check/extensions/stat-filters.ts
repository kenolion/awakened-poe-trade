import type { ParsedItem } from '@/parser'
import type { StatCalculated } from '@/parser/modifiers'
import type { StatFilter } from '../filters/interfaces'

export type StatFilterExtension = (
  filter: StatFilter,
  calc: StatCalculated,
  item: ParsedItem
) => StatFilter | StatFilter[] | undefined

const extensions: StatFilterExtension[] = []

export function registerStatFilterExtension (extension: StatFilterExtension) {
  extensions.push(extension)
}

export function getAdditionalStatFilters (
  filter: StatFilter,
  calc: StatCalculated,
  item: ParsedItem
) {
  return extensions.flatMap(extension => {
    const result = extension(filter, calc, item)
    if (!result) return []
    return Array.isArray(result) ? result : [result]
  })
}

export function disableExtensionFilters (filters: StatFilter[]) {
  for (const filter of filters) {
    if (filter.extension?.disabled) {
      filter.disabled = true
    }
  }
}
