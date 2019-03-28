# `CRN-ELEMENTS`

> 用于 React Native 的组件库，该组件库使用 Typescript 开发，提供了更方便的类型支持。

## 🔗 链接一览

- [📑 文档地址](https://codoonfxd.github.io/crn-elements)
- [🚀 更新日志](https://codoonfxd.github.io/crn-elements/#/CHANGELOG)
- [🔌 如何贡献](https://codoonfxd.github.io/crn-elements/#/CONTRIBUTING)

## ⚙️ 安装

```bash
# 使用npm
npm install --save @codoonfxd/crn-elements

# 使用yarn
yarn add @codoonfxd/crn-elements
```

## 🎊 使用

> 注意：分为两种引入方式，推荐**单独引入**。

```javascript
// 引入时会将所有组件引入
import { Button } from '@codoonfxd/crn-elements';
// 单独引入(推荐)
import Button from '@codoonfxd/crn-elements/dist/Button';

export default () => {
  return <Button title="按钮" />;
};
```
