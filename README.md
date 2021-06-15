# proto-stencil-tailwind

This package is used in order to integrate with the 2.x release of [tailwindcss](https://tailwindcss.com/). It provides
simple functionality for supporting a [utility-first](https://tailwindcss.com/docs/utility-first) workflow within the Shadow DOM.

> NOTE: this plugin specificially adds support for _inline utilities..._ (idiomatic Tailwind)

## Installation

First, yarn install within the project:

```
yarn add --dev proto-stencil-tailwind
yarn add --dev postcss 
yarn add --dev rollup
yarn add --dev tailwindcss
```

Next, within the project's `stencil.config.js` file, import the plugin and add it to the config's plugins config:

### stencil.config.ts

```ts
import { Config } from '@stencil/core'
import tailwind from 'proto-stencil-tailwind'

export const config: Config = {
  plugins: [
    tailwind()
  ]
}
```

Note, hot module reloading (`hmr`) is not yet supported. For local development, you'll need to update `reloadStratgy` to use the `pageReload` option:

```ts
export const config: Config = {
  devServer: {
    reloadStrategy: 'pageReload'
  }
}
```

### Create your Tailwind config file (optional)

While Tailwind provides a sensible default configuration, it is often desirable to further customize your theme. This default configuration can be used as a starting point for such customizations. To customize your Tailwind installation, you will first need to generate a config file for your project using the included Tailwind CLI utility when you install the `proto-stencil-tailwind` npm package.

`npx tailwindcss init`

This will generate a [`tailwind.config.js`](https://tailwindcss.com/docs/configuration) file at the root of your project.

## Usage

### Inline utilities

[Utility classes](https://tailwindcss.com/docs/utility-first) can be used directly within JSX; they will be included in the component's shadow tree.

```jsx
class MyComponent {
  render() {
    return (
      <div class="p-4 bg-red">
        <p class="text-sm text-white">This is JSX!</p>
      </div>
    );
  }
}
```

## Options

The following plugin options may be configured:

### stencil.config.ts

```js
import tailwindcss from 'tailwindcss'

export const config: Config = {
  plugins: [
    tailwind({
      tailwind: tailwindcss('tailwind.config.js'),
      inputFile: './src/styles/app.css',
      includeTailwindCss: false
    })
  ]
}
```

* `tailwind`: **(optional)** your own configuration file and version of TailwindCSS to be used.
* `inputFile`: **(optional)** a stylesheet filepath to be used in place of the default.
* `includeTailwindCss`: **(optional)** include global `tailwind.css` in the bundle (default: `true`)
