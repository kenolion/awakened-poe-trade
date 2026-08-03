import type { StatFilter } from '../filters/interfaces'
import type { TradeRequest } from '../trade/pathofexile-trade'

export interface TradeQueryExtensionContext {
  query: TradeRequest['query']
  toQuery: (
    id: string,
    stat: Pick<StatFilter, 'roll' | 'option' | 'disabled'>
  ) => TradeRequest['query']['stats'][number]['filters'][number]
}

export interface TradeQueryExtension {
  apply (context: TradeQueryExtensionContext, stats: StatFilter[]): StatFilter[]
}

const extensions: TradeQueryExtension[] = []

export function registerTradeQueryExtension (extension: TradeQueryExtension) {
  extensions.push(extension)
}

export function applyTradeQueryExtensions (
  context: TradeQueryExtensionContext,
  stats: StatFilter[]
) {
  return extensions.reduce(
    (remaining, extension) => extension.apply(context, remaining),
    stats
  )
}
