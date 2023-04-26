// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
import ElementPlus from 'element-plus'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'

import { Nxui } from '@jinxb/nexus-ui'
import '@jinxb/nexus-ui/style.css'
import '../../assets/common.scss';

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    app.use(VXETable)
    app.use(ElementPlus, { locale })
    app.use(Nxui)
  },
};
