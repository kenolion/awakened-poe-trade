import { FilterTag, StatFilter } from './interfaces'
import type { ParsedItem } from '@/parser'

interface MercenaryOption {
  id: string
  text: string
}

interface MercenaryBuild {
  main: MercenaryOption
  supports: MercenaryOption[]
}

const MANYSHOT_SUPPORTS: MercenaryOption[] = [
  ['59712', 'Lesser Elemental Damage with Attacks (Tier 1)'],
  ['44886', 'Elemental Damage with Attacks (Tier 2)'],
  ['28416', 'Greater Elemental Damage with Attacks (Tier 3)'],
  ['40565', 'Lesser Cold Penetration (Tier 1)'],
  ['54628', 'Cold Penetration (Tier 2)'],
  ['26094', 'Greater Cold Penetration (Tier 3)'],
  ['14317', 'Lesser Chain (Tier 1)'],
  ['31052', 'Chain (Tier 2)'],
  ['6040', 'Lesser Pierce (Tier 1)'],
  ['56267', 'Pierce (Tier 2)'],
  ['27970', 'Greater Pierce (Tier 3)'],
  ['12054', 'Multiple Projectiles (Tier 1)'],
  ['49419', 'Greater Multiple Projectiles (Tier 3)'],
  ['22670', 'Lesser Increased Area of Effect (Tier 1)'],
  ['53342', 'Increased Area of Effect (Tier 2)'],
  ['19113', 'Greater Area of Effect (Tier 3)'],
  ['26146', 'Lesser Hypothermia (Tier 1)'],
  ['38571', 'Hypothermia (Tier 2)'],
  ['53145', 'Greater Hypothermia (Tier 3)'],
  ['32052', 'Greater Fork (Tier 3)'],
  ['5293', 'Return (Tier 3)']
].map(([hash, text]) => ({
  id: `mercenary.support_${hash}`,
  text
}))

const MERCENARY_BUILDS: Record<string, MercenaryBuild> = {
  'Manyshot': {
    main: { id: 'mercenary.skill_11495', text: 'Ice Shot' },
    supports: MANYSHOT_SUPPORTS
  },
  'Infamous Manyshot': {
    main: { id: 'mercenary.skill_11495', text: 'Ice Shot' },
    supports: MANYSHOT_SUPPORTS
  }
}

export function createMercenaryFilters (item: ParsedItem): StatFilter[] {
  const build = item.mercenaryBuild ? MERCENARY_BUILDS[item.mercenaryBuild] : undefined
  if (!build) return []

  const group = 1
  return [
    createFilter(`Mercenary Skill Group ${group}: ${build.main.text}`, build.main.id, group, false),
    ...build.supports.map(support =>
      createFilter(`Mercenary Skill Group ${group} Support: ${support.text}`, support.id, group, true)
    )
  ]
}

function createFilter (
  text: string,
  tradeId: string,
  mercenaryGroup: number,
  disabled: boolean
): StatFilter {
  return {
    tradeId: [tradeId],
    statRef: tradeId,
    text,
    tag: FilterTag.Variant,
    sources: [],
    disabled,
    mercenaryGroup
  }
}
