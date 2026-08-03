import type { BaseType } from './interfaces'

const MERCENARY_WARRANT_ICON = 'https://cdn.poedb.tw/image/Art/2DItems/Currency/MercenaryWarrant.webp'

export const ITEM_OVERRIDES: Record<string, BaseType[]> = {
  'en': [{
    name: 'Mercenary Warrant',
    refName: 'Mercenary Warrant',
    namespace: 'ITEM',
    icon: MERCENARY_WARRANT_ICON
  }],
  'cmn-Hant': [{
    name: '傭兵契約書',
    refName: 'Mercenary Warrant',
    namespace: 'ITEM',
    icon: MERCENARY_WARRANT_ICON
  }],
  'ko': [{
    name: '용병 소환장',
    refName: 'Mercenary Warrant',
    namespace: 'ITEM',
    icon: MERCENARY_WARRANT_ICON
  }],
  'ru': [{
    name: 'Наёмничья расписка',
    refName: 'Mercenary Warrant',
    namespace: 'ITEM',
    icon: MERCENARY_WARRANT_ICON
  }]
}

export const CLIENT_STRING_OVERRIDES: Record<string, Record<string, string>> = {
  'en': { MERCENARY_BUILD: 'Build: ' },
  'cmn-Hant': { MERCENARY_BUILD: 'Build: ' },
  'ko': { MERCENARY_BUILD: 'Build: ' },
  'ru': { MERCENARY_BUILD: 'Build: ' }
}
