# Frontify DAM > Sanity

![Frontify demo](https://raw.githubusercontent.com/Frontify/sanity-io-plugin/main/assets/Sanity_Frontify_Plugin.gif)

A Sanity plugin that integrates the Frontify Finder, Frontify asset chooser, as a custom asset source, allowing users to select images from Frontify directly within their Sanity Studio.

> This is a **Sanity Studio v3** plugin.

## Features

- Select images from Frontify directly in Sanity Studio
- Configurable filters for asset selection
- Support for single or multiple asset selection
- Automatically transforms Frontify assets to Sanity-compatible format
- Preserves asset metadata and source information

## Installation

```sh
npm install sanity-plugin-frontify-dam
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {frontifyPlugin} from 'sanity-plugin-frontify-dam'

export default defineConfig({
  // ... other config
  plugins: [
    frontifyPlugin({
      domain: 'your-frontify-domain',
      allowMultiSelect: false,
      filters: [
        {
          key: 'object_type',
          values: ['IMAGE'],
          inverted: false,
        },
      ],
    }),
  ],
})
```

## Configuration

The plugin accepts the following configuration options:

- `domain` (string): The domain of the Frontify instance - the end user will be promped for this if it is not provided in the config
- `allowMultiSelect` (boolean): Whether to allow multiple asset selection (default: false)
- `filters` (array): Array of filters to apply to the asset selection

## Using in Schema

Once the plugin is installed, the Frontify asset source will be available for all image fields in your schema automatically. The plugin adds itself as an asset source for image fields.

## Direct Usage

You can also use the asset source directly in specific fields:

```ts
import {defineField, defineType} from 'sanity'
import {frontifyAssetSource} from 'sanity-plugin-frontify-dam'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
        sources: [
          frontifyAssetSource({
            allowMultiSelect: false,
            filters: [
              {
                key: 'object_type',
                values: ['IMAGE'],
                inverted: false,
              },
            ],
          }),
        ],
      },
    }),
  ],
})
```

## Requirements

- Sanity Studio v3 or later
- React 18+

## License

[MIT](LICENSE) © Frontify

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
