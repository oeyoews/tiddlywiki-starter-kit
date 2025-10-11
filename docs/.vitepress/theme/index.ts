import TwLayout from './Twlayout.vue';
import TwPlugin from './components/TwPlugin.vue';
import './styles/index.css';
import 'virtual:uno.css';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TwPlugin', TwPlugin);
  },
  // Layout: TwLayout,
} satisfies Theme;
