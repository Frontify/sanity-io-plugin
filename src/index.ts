import {definePlugin} from 'sanity'

import {frontifyAssetSource} from './assetSource'
import {FrontifyPluginConfig} from './types'

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {frontifyPlugin} from 'frontify-dam'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [
 *     frontifyPlugin({
 *       filters: [
 *         {
 *           key: "object_type",
 *           values: ["IMAGE"],
 *           inverted: false
 *         }
 *       ]
 *     })
 *   ],
 * })
 * ```
 */
export const frontifyPlugin = definePlugin<FrontifyPluginConfig>((config = {}) => {
  return {
    name: 'frontify-dam',
    form: {
      image: {
        assetSources: [frontifyAssetSource(config)],
      },
    },
  }
})

// Export the asset source for direct use
export {frontifyAssetSource} from './assetSource'
export {FrontifyAssetSource} from './components/FrontifyAssetSource'
export type {FrontifyAsset, FrontifyPluginConfig, SanityAsset} from './types'
