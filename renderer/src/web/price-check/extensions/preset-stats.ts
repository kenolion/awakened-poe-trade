import type { ParsedItem } from '@/parser'
import type { StatFilter } from '../filters/interfaces'

export interface PresetCreationOptions {
  league: string
  currency: string | undefined
  collapseListings: 'app' | 'api'
  activateStockFilter: boolean
  searchStatRange: number
  useEn: boolean
}

export type ExactPresetStatsExtension = (
  item: ParsedItem,
  opts: PresetCreationOptions
) => StatFilter[]

const exactPresetStatsExtensions: ExactPresetStatsExtension[] = []

export function registerExactPresetStatsExtension (extension: ExactPresetStatsExtension) {
  exactPresetStatsExtensions.push(extension)
}

export function getAdditionalExactPresetStats (
  item: ParsedItem,
  opts: PresetCreationOptions
) {
  return exactPresetStatsExtensions.flatMap(extension => extension(item, opts))
}
