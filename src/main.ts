import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import { loadFonts } from './plugins/webfontloader'

loadFonts()

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'pokemonTheme',
    themes: {
      pokemonTheme: {
        dark: false,
        colors: {
          primary: '#FF0000',
          secondary: '#FFD700',
          background: '#F5F5F5',
          surface: '#FFFFFF',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
});

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
