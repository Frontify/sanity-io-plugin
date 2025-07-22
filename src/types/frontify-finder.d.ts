declare module '@frontify/frontify-finder' {
  export interface FrontifyAsset {
    id: string
    name: string
    title?: string
    description?: string
    filename?: string
    extension?: string
    url: string
    downloadUrl?: string
    previewUrl?: string
    dynamicPreviewUrl?: string
    thumbnailUrl?: string
    mimeType?: string
    width?: number
    height?: number
    size?: number
    createdAt?: string
    updatedAt?: string
  }

  export interface OpeningOptions {
    clientId: string
    options: {
      allowMultiSelect?: boolean
      autoClose?: boolean
      permanentDownloadUrls?: boolean
      filters?: Array<{
        key: string
        values: string[]
        inverted: boolean
      }>
    }
  }

  export interface FrontifyFinder {
    mount: (container: HTMLElement) => void
    close: () => void
    onAssetsChosen: (callback: (assets: FrontifyAsset[]) => void) => void
    onCancel: (callback: () => void) => void
  }

  export function create(config: OpeningOptions): Promise<FrontifyFinder>
} 