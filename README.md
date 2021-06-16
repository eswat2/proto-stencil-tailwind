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

Next, within the project's `stencil.config.js` file:

1. import the plugin 
2. update the plugins config
3. update the reloadStrategy 

### stencil.config.ts

```ts
import { Config } from '@stencil/core'
import tailwind from 'proto-stencil-tailwind'

export const config: Config = {
  plugins: [
    tailwind()
  ],
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

```ts
import { Config } from '@stencil/core'
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

> NOTE:  adding an inputFile will give you the ability to support the creation of [tailwind _components_](https://tailwindcss.com/docs/extracting-components#extracting-component-classes-with-apply)...


## Using the inputFile option


##### 1. stencil.config.ts

```ts
import { Config } from '@stencil/core'
import tailwind from 'proto-stencil-tailwind'

export const config: Config = {
  plugins: [
    tailwind({
      inputFile: './src/styles/app.css'
    })
  ],
  devServer: {
    reloadStrategy: 'pageReload'
  }
}
```


##### 2. src/styles/app.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-blue {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}
```

This simple combination of changes creates a tailwind _component_ class named **btn-blue** which you could use in your app instead of typing:

_"py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"_  

You can read more about this approach here:

- [Extracting component classes with @apply](https://tailwindcss.com/docs/extracting-components#extracting-component-classes-with-apply).

## tw utility

I found a handy utility that works well with this plugin:

```ts
const tw = (...classes: (false | null | undefined | string)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export { tw };
export default tw;
```

This `tw` utility was developed for React, but it works just as well for Stencil and this plugin.

For example:

```jsx
    <Logo
      className={tw(
        'relative',
        'w-full h-auto',
        'mt-2 mb-4',
        'text-blue-600 fill-current'
      )}
    />
```

You can use this to breakup the long class strings and it also gives you a way to provide conditional styling using ternary expressions:

```jsx
    <div
      class={tw(
        'flex align-middle',
        'rounded-lg p-4 mb-1',
        'border border-solid',
        isExotic(group)
          ? 'bg-gray-300 border-gray-600'
          : 'bg-green-200 border-green-600',
      )}
    >
```

The plugin will correctly find all of the tailwind classes when using this approach and make them available in the associated component root.  You can find the article about this _trick_ in the references below.

## Credits

Thanks goes to **Jack Rowlingson** and all of the others who contributed to the Tailwind 1.x version of this plugin!!

- [stencil-tailwind](https://github.com/jrowlingson/stencil-tailwind) - _the original plugin_


## References

- [Tailwind CSS](https://tailwindcss.com/)
- [Building a Scalable CSS Architecture](https://blog.algolia.com/redesigning-our-docs-part-4-building-a-scalable-css-architecture/) - _algolia_
- [Simple Trick to Clean Up Tailwind CSS in React](https://www.skies.dev/tailwind-react-trick) - _the tw utility_