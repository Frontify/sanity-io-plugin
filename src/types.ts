import {AssetSourceComponentProps} from 'sanity'

export interface FrontifyPluginConfig {
  domain?: string
  allowMultiSelect?: boolean
  filters?: Array<{
    key: string
    values: string[]
    inverted: boolean
  }>
}

// Re-export FrontifyAsset from the module
export type {FrontifyAsset} from '@frontify/frontify-finder'

export interface FrontifyAssetSourceProps extends AssetSourceComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (assets: any[]) => void
  onClose: () => void
  config?: FrontifyPluginConfig
}

export interface SanityAsset {
  kind: 'url'
  value: string
  assetDocumentProps: {
    originalFilename?: string
    source: {
      name: string
      id: string
      url: string
    }
    title?: string
    description?: string
    creditLine?: string
  }
}
