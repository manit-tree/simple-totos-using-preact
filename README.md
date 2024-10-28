# Simple totos using Preact

Mini project for learning Preact

### app.jsx

```jsx
import { signal } from "@preact/signals";
import './app.css';

let items = signal([
  {"id":"1", "title":"Learn Python"},
  {"id":"2", "title":"Hang out with friends"},
  {"id":"3", "title":"Read a book"},
  {"id":"4", "title":"Watching a movie"}
])

export function App() {
  let add_item = (item) => {
    let id = (new Date()).getTime() + '';
    items.value = [...items.value, {"id":id, "title":item}];
  }

  let handleChange = (evt) => {
    item.value = evt.target.value;
  }

  let handleKeydown = (evt) => {
    let input = evt.target;

    if (evt.key == 'Enter') {
      let item = input.value.trim();

      if (item) {
        add_item(item);
        input.value = '';
      }
    }
  }

  let remove_item = (evt) => {
    evt.preventDefault();

    let el = evt.target;
    let id = el.closest('li').getAttribute('data-id');

    items.value = items.value.filter(item => {
      return item.id != id;
    })
  }

  return (
    <main>
      <h1>Todos</h1>
      <input type="text" onChange={handleChange} onkeydown={handleKeydown}></input>
      <ul class="todos">
        {items.value.map(item => (
          <li data-id={item.id}><span class="value">{item.title}</span> <a href="#" onClick={remove_item}>x</a></li>
        ))}
      </ul>
    </main>
  )
}
```

### app.css

```css
:root {
    --link-color: #50FA7B;
    --divider-color: rgba(255, 255, 255, 0.15);
}

#app {
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    display: grid;
    place-content: center;
    font-family: sans-serif, tahoma;

    *:focus-visible {
        outline: 0;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        width: 440px;

        input[type="text"] {
            width: 100%;
            border: 0;
            padding: 0.5em 1em;
            border-radius: 16px;
            box-sizing: border-box;
        }


        .todos {
            list-style: none;
            width: 100%;

            li {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid var(--divider-color);
                padding: 0.55em 0;

                &:last-child {
                    border-bottom: 0;
                }

                a {
                    color: var(--link-color);
                    text-decoration: none;
                }
            }
        }
    }
}
```

### index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Todos</title>
  </head>
  <body>
    <div id="app"></div>
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <script type="module" src="./src/main.jsx"></script>
  </body>
</html>
```

### package.json

```json
{
  "name": "simple totos using preact",
  "description": "Mini project for learning Preact",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@excalidraw/excalidraw": "^0.17.6",
    "@preact/signals": "^1.3.0",
    "preact": "^10.23.1"
  },
  "devDependencies": {
    "@preact/preset-vite": "^2.9.0",
    "lightningcss": "^1.25.1",
    "vite": "^5.4.1",
    "vite-plugin-css-injected-by-js": "^3.4.0"
  }
}
```

### vite.config.js

```js
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import fs from 'fs';

export default defineConfig({
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
  plugins: [
    cssInjectedByJsPlugin(),
    preact()
  ],
  css: {
        transformer: 'lightningcss',
    },
    build: {
      outDir: './dist',
      minify: true,
      sourcemap: false,
      emptyOutDir: true,
      rollupOptions: {
          output: {
              entryFileNames: `assets/[name].js`,
              chunkFileNames: `assets/[name].js`,
              assetFileNames: `assets/[name].[ext]`
          }
      }    
    },
    server: {
        https: {
            key: fs.readFileSync(`./server.key`),
            cert: fs.readFileSync(`./server.crt`)
        }
    }
})
```


