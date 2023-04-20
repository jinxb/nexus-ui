# 快速上手

本节将介绍如何在项目中使用 NexusUI

## 用法

### 依赖

部分组件内部依赖 Element Plus 组件库，表格组件依赖 VXETable 库
所以，使用前需要先引入 Element Plus 和 VXETable

### 完整引入

```javascript
// main.ts
import { createApp } from "vue";

import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import 'element-plus/lib/theme-chalk/index.css'

import { Nxui } from "@jinxb/nexus-ui";
import "@jinxb/nexus-ui/style.css";

import App from "./App.vue";

const app = createApp(App);

app.use(VXETable);
app.use(ElementPlus);
app.use(Nxui);
app.mount("#app");
```
