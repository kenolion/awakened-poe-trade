import { STAT_BY_REF_V2 } from '@/assets/data'
import type { StatCalculated } from '@/parser/modifiers'
import type { StatFilter } from './interfaces'

const TIMELESS_JEWEL_VARIANT_GROUPS = [
  ['Ahuana', 'Doryani', 'Xibaqua'],
  ['Avarius', 'Dominus', 'Maxarius'],
  ['Cadiro', 'Caspiro', 'Victario'],
  ['Asenath', 'Balbala', 'Nasima'],
  ['Akoya', 'Kaom', 'Rakiata'],
  ['Medved', 'Uhtred', 'Vorana']
] as const

/**
 * Creates a separate filter for all historic-ruler variants of a Timeless
 * Jewel modifier. The trade site treats multiple IDs in a count filter as OR.
 */
export function createTimelessJewelVariantFilter (
  filter: StatFilter,
  calc: StatCalculated
): StatFilter | undefined {
  const group = TIMELESS_JEWEL_VARIANT_GROUPS.find(names =>
    names.some(name => calc.stat.ref.endsWith(name))
  )
  if (!group) return undefined

  const currentName = group.find(name => calc.stat.ref.endsWith(name))!
  const baseRef = calc.stat.ref.slice(0, -currentName.length)
  const variants = group
    .map(name => findStat(`${baseRef}${name}`))
    .filter((stat): stat is NonNullable<typeof stat> => stat != null)

  if (variants.length !== group.length) return undefined

  const tradeIds = [...new Set(
    variants.flatMap(stat => stat.trade.ids[calc.type] ?? [])
  )]
  if (tradeIds.length <= 1) return undefined

  const textLines = filter.text.split('\n')
  const displayedName = group.find(name => textLines[0].endsWith(name))
  if (displayedName) {
    textLines[0] = `${textLines[0].slice(0, -displayedName.length)}any`
  }
  textLines[0] = `OR — ${textLines[0]}`

  return {
    ...filter,
    tradeId: tradeIds,
    text: textLines.join('\n'),
    roll: cloneRoll(filter.roll),
    disabled: true,
    or: true
  }
}

function findStat (ref: string) {
  const statOrGroup = STAT_BY_REF_V2(ref)
  if (!statOrGroup) return undefined

  return ('stats' in statOrGroup)
    ? statOrGroup.stats.find(stat => stat.ref === ref)
    : statOrGroup
}

function cloneRoll (roll: StatFilter['roll']): StatFilter['roll'] {
  if (!roll) return undefined

  return {
    ...roll,
    default: { ...roll.default },
    bounds: roll.bounds ? { ...roll.bounds } : undefined
  }
}
