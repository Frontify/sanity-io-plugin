import React from 'react'
import { FrontifyAssetSource } from './components/FrontifyAssetSource'
import { FrontifyPluginConfig } from './types'

export const frontifyAssetSource = (config: FrontifyPluginConfig = {}) => {
  return {
    name: 'frontify',
    title: 'Frontify',
    component: (props: any) => React.createElement(FrontifyAssetSource, { ...props, config }),
    icon: () => '🖼️', // You can replace with a proper icon component
  }
}
