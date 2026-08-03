import type { StatFilter } from '../filters/interfaces'
import { createMercenaryFilters } from '../filters/mercenary-filters'
import { registerExactPresetStatsExtension } from './preset-stats'
import { registerTradeQueryExtension, type TradeQueryExtension } from './trade-query'

registerExactPresetStatsExtension(item => createMercenaryFilters(item))

const mercenaryTradeQueryExtension: TradeQueryExtension = {
  apply ({ query, toQuery }, stats) {
    const groups = new Map<number, StatFilter[]>()
    const remaining: StatFilter[] = []

    for (const stat of stats) {
      if (stat.mercenaryGroup == null) {
        remaining.push(stat)
        continue
      }

      const group = groups.get(stat.mercenaryGroup) ?? []
      group.push(stat)
      groups.set(stat.mercenaryGroup, group)
    }

    for (const group of groups.values()) {
      const active = group.filter(stat => !stat.disabled)
      if (!active.length) continue

      query.stats.push({
        type: 'count',
        value: { min: active.length, max: active.length },
        filters: active.map(stat =>
          toQuery(stat.tradeId[0], stat)
        )
      })
    }

    return remaining
  }
}

registerTradeQueryExtension(mercenaryTradeQueryExtension)
