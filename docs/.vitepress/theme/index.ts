import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './styles/index.css';
import 'virtual:uno.css';
// @ts-expect-error
import TwPlugin from './components/TwPlugin.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TwPlugin', TwPlugin);
  },
} satisfies Theme;
