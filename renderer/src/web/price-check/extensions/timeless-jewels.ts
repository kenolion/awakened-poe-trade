import { createTimelessJewelVariantFilter } from '../filters/timeless-jewels'
import { registerStatFilterExtension } from './stat-filters'

registerStatFilterExtension((filter, calc) =>
  createTimelessJewelVariantFilter(filter, calc)
)
