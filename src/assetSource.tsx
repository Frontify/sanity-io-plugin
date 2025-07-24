/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'

import {FrontifyAssetSource} from './components/FrontifyAssetSource'
import {FrontifyIcon} from './components/FrontifyIcon'
import {FrontifyPluginConfig} from './types'

export const frontifyAssetSource = (config: FrontifyPluginConfig = {}) => {
  return {
    name: 'frontify',
    title: 'Frontify',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: (props: any) => React.createElement(FrontifyAssetSource, {...props, config}),
    icon: () => React.createElement(FrontifyIcon),
  }
}
