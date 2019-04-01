[portal]: elements/portal.md

# Provider

> 提供了 [Portal][portal] 入口，以及主题（待完成）和国际化功能（待完成）。

## 使用

```javascript
import Provider from '@codoonfxd/crn-elements/dist/Provider';

// 该组件请在根目录添加
export const Demo = () => {
  return (
    <Provider>
      <OtherComponent />
    </Provider>
  );
};
```

引入该组件后，就可以在全局使用[`Portal`][portal]组件的相关方法了。

## Props

该组件支持[Portal][portal]的所有`Props`。
