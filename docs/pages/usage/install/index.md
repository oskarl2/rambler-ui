# Установка

```sh
npm install --save rambler-ui
```

Библиотека и ее зависимости используют фичи ES2015+: `Promise` и т. д. Для использования в старых браузерах необходимо добавить [`@babel/polyfill`](https://babeljs.io/docs/en/babel-polyfill/) в ваше приложение.

## Использование

```js
// src/index.js
import React from 'react'
import {render} from 'react-dom'
import App from './App'

render(<App />, document.getElementById('app'))

// src/App.js
import React from 'react'
import Button from 'rambler-ui/Button'

export default () => (
  <div>
    <Button buttonType="button">
      Кнопка
    </Button>
  </div>
)
```

Более подробно можно посмотреть в [примере](https://github.com/rambler-digital-solutions/rambler-ui/tree/master/examples/simple).

## Server-Side rendering

Для отрисовки на сервере необходимо в `<ThemeProvider />` пробрасывать отдельный `sheetsRegistry`, для извлечения стилей и вставки их непосредственно в html ответа сервера. После загрузки и регидратации приложения в браузере, необходимо удалить извлеченные на сервере стили из DOM для избежания сайд-эффектов.

```js
// src/render.js
import React from 'react'
import {renderToString } from 'react-dom/server'
import {ThemeProvider, createSheetsRegistry} from 'rambler-ui/theme'
import App from './App'

export default function render(req, res) {
  const sheetsRegistry = createSheetsRegistry()

  const app = renderToString(
    <ThemeProvider sheetsRegistry={sheetsRegistry}>
      <App />
    </ThemeProvider>
  )

  return res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <style type="text/css">
          ${sheetsRegistry.toString()}
        </style>
      </head>
      <body>
        <div id="app">
          ${app}
        </div>
        <script src="./index.js"></script>
      </body>
    </html>
  `)
}
```

Более подробно можно посмотреть в [примере с SSR](https://github.com/rambler-digital-solutions/rambler-ui/tree/master/examples/ssr) или в документации [JSS](https://github.com/cssinjs/jss/blob/master/docs/ssr.md).
