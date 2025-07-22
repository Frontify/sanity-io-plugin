import {create, FrontifyAsset, OpeningOptions} from '@frontify/frontify-finder'
import {Box, Dialog, Flex, Spinner, Text} from '@sanity/ui'
import React, {useCallback, useMemo, useRef, useState} from 'react'

import {FrontifyAssetSourceProps, SanityAsset} from '../types'

export function FrontifyAssetSource({
  onSelect,
  onClose,
  config: userConfig,
}: FrontifyAssetSourceProps) {
  console.log('🔥 UPDATED PLUGIN VERSION 3.0 - FrontifyAssetSource component rendered')

  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const finderRef = useRef<any>(null)
  const isInitializedRef = useRef(false)
  const hasMountedRef = useRef(false)

  const config: OpeningOptions = useMemo(
    () => ({
      clientId: userConfig?.clientId || '',
      options: {
        allowMultiSelect: userConfig?.allowMultiSelect || false,
        autoClose: false,
        permanentDownloadUrls: true,
        // Default to showing only images, but allow override
        filters: userConfig?.filters || [
          {
            key: 'object_type',
            values: ['IMAGE'],
            inverted: false,
          },
        ],
      },
    }),
    [userConfig],
  )

  const handleOpenFinder = useCallback(async () => {
    console.log('handleOpenFinder called from:', new Error().stack)

    // Prevent double mounting safeguard
    if (finderRef.current || isInitializedRef.current || hasMountedRef.current) {
      console.log('Finder already exists, is being initialized, or has mounted, skipping...')
      return
    }

    console.log('Opening Frontify Finder...')
    isInitializedRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const finder = await create(config)
      finderRef.current = finder

      console.log('Finder created, mounting...')

      // Mount the finder to the DOM element
      const container = document.getElementById('finder-container')
      if (!container) {
        throw new Error('Finder container not found')
      }

      finder.mount(container)
      setIsLoading(false)
      hasMountedRef.current = true

      console.log('Finder mounted')

      // Handle assets chosen
      finder.onAssetsChosen((assets: FrontifyAsset[]) => {
        console.log('Assets chosen:', assets)

        if (assets.length > 0) {
          const asset = assets[0] // Single asset selection
          console.log('Selected asset:', asset)
          console.log('Available URLs:', {
            url: asset.url,
            downloadUrl: asset.downloadUrl,
            previewUrl: asset.previewUrl,
            dynamicPreviewUrl: asset.dynamicPreviewUrl,
            thumbnailUrl: asset.thumbnailUrl,
          })

          // Transform FrontifyAsset to Sanity asset format
          const sanityAsset: SanityAsset = {
            kind: 'url',
            value: asset.dynamicPreviewUrl || asset.previewUrl || asset.downloadUrl || asset.url,
            assetDocumentProps: {
              originalFilename: asset.filename || `${asset.name}.${asset.extension || 'jpg'}`,
              source: {
                name: 'frontify',
                id: asset.id,
                url: asset.url,
              },
              title: asset.title || asset.name,
              description: asset.description || asset.title || asset.name || '',
              creditLine: `By Frontify`,
            },
          }

          console.log('Transformed to Sanity asset:', sanityAsset)

          // Update the field value
          onSelect([sanityAsset])
        }

        handleCloseFinder()
      })

      // Handle cancel
      finder.onCancel(() => {
        console.log('Cancel pressed')
        handleCloseFinder()
      })
    } catch (error) {
      console.error('Error creating finder:', error)
      setError(error instanceof Error ? error.message : 'Failed to load Frontify Finder')
      setIsLoading(false)
      isInitializedRef.current = false
      hasMountedRef.current = false
    }
  }, [config, onSelect])

  const handleCloseFinder = useCallback(() => {
    if (finderRef.current) {
      console.log('Finder unmounted')
      finderRef.current.close()
      finderRef.current = null
    }
    isInitializedRef.current = false
    hasMountedRef.current = false
    setIsModalOpen(false)
    onClose()
  }, [onClose])

  // Open finder when modal opens - only once
  React.useEffect(() => {
    console.log('useEffect triggered:', {
      isModalOpen,
      hasFinder: !!finderRef.current,
      isInitialized: isInitializedRef.current,
      stack: new Error().stack,
    })

    if (isModalOpen && !finderRef.current && !isInitializedRef.current) {
      console.log('Calling handleOpenFinder from useEffect')
      handleOpenFinder()
    }
  }, [isModalOpen]) // Remove handleOpenFinder from dependencies to prevent double mounting

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (finderRef.current) {
        console.log('Component unmounting, cleaning up finder...')
        finderRef.current.close()
        finderRef.current = null
      }
      isInitializedRef.current = false
      hasMountedRef.current = false
    }
  }, [])

  return (
    <Dialog
      id="frontify-finder-modal"
      onClose={handleCloseFinder}
      width={2}
      header="Select Frontify Asset"
    >
      <Box style={{width: '100%', height: '800px', position: 'relative'}}>
        {isLoading && (
          <Flex
            align="center"
            justify="center"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 10,
            }}
          >
            <Flex direction="column" align="center" gap={3}>
              <Spinner muted />
              <Text muted>Loading Frontify Finder...</Text>
            </Flex>
          </Flex>
        )}

        {error && (
          <Flex
            align="center"
            justify="center"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 10,
            }}
          >
            <Flex direction="column" align="center" gap={3}>
              <Text style={{color: 'var(--card-fg-color)'}}>❌ Error</Text>
              <Text muted size={1}>
                {error}
              </Text>
            </Flex>
          </Flex>
        )}

        <div
          id="finder-container"
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid var(--card-border-color)',
            borderRadius: '4px',
          }}
        />
      </Box>
    </Dialog>
  )
}

export default FrontifyAssetSource
