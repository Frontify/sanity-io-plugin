declare module '@frontify/frontify-finder' {
  export interface FrontifyAsset {
    id: string
    externalId: string | null
    title: string
    description: string | null
    creator: {
      name: string
    }
    createdAt: string
    type: string
    author: string | null
    expiresAt: string | null
    alternativeText: string | null
    licenses:
      | {
          title: string
          text: string
        }[]
      | null
    copyright: {
      status: string
      notice: string
    } | null
    tags:
      | {
          value: string
          source: string
        }[]
      | null
    customMetadata: {
      property: {
        id: string
        name: string
        type: {
          name: string
        }
      }
      value?: {
        value:
          | string
          | {
              optionId: string
              text: string
            }
      }
      values?: {
        value: {
          optionId: string
          text: string
        }
      }[]
    }[]
    filename?: string | null
    extension?: string
    size?: number | null
    downloadUrl?: string | null
    previewUrl?: string
    dynamicPreviewUrl?: string | null
    thumbnailUrl?: string | null
    icon?: string
    focalPoint?: number[] | null
    width?: number
    height?: number
    duration?: number
    bitrate?: number
    pageCount?: number | null
  }

  export interface OpeningOptions {
    clientId: string
    domain?: string
    options?: {
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
    onAssetsChosen: (callback: (assets: FrontifyAsset[]) => void) => FrontifyFinder
    onCancel: (callback: () => void) => FrontifyFinder
  }

  export function create(config: OpeningOptions): Promise<FrontifyFinder>
}
