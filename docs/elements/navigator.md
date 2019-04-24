# Navigator

> 导航栏组件

### 事项

- 导航栏分为三部分，左边按钮，中间 title, 右边按钮，如果左右按钮不传，则默认显示标题
- 支持绝对定位导航栏
- 按钮支持 React Element 和 React Component 两种形式传递 children

## 用法

```javascript
import { Navigator } from "@codoonfxd/crn-elements";

<Navigator
  // 导航栏标题
  title="Navigator Title"
  // 标题样式
  titleStyle={{
    color: "red"
  }}
  // 导航栏左边按钮
  leftButton={{
    // 按钮透明度
    activeOpacity: 0.8,
    // 按钮children
    children: (
      <Image source={{ uri: IMG_URL }} style={{ width: 20, height: 20 }} />
    )
  }}
  // 导航栏右边按钮
  rightButton={{
    // 按钮透明度
    activeOpacity: 0.8,
    // 按钮样式
    style: {
      backgroundColor: "red"
    },
    // 按钮children
    children: (
      <Image source={{ uri: IMG_URL2 }} style={{ width: 20, height: 20 }} />
    ),
    // 按钮点击触发回调
    onPress: () => {
      console.log(111);
    }
  }}
/>;
```

## Demo

- default

![default](../_images/elements/navigator/default.png)

- custom

![custom](../_images/elements/navigator/custom.png)

- absolute

![absolute](../_images/elements/navigator/absolute.png)

## API

### Props

| 属性        | 说明              | 类型             | 默认值 | 必选  |
| ----------- | ----------------- | ---------------- | ------ | ----- |
| title       | 导航栏标题        | string           | ''     | true  |
| style       | 导航栏样式        | ViewStyle        | --     | false |
| titleStyle  | 导航栏标题样式    | ViewStyle        | --     | false |
| absolute    | 是否开启绝对定位  | boolean          | false  | false |
| leftButton  | 导航栏左边 button | INavigatorButton | --     | false |
| rightButton | 导航栏右边 button | INavigatorButton | --     | false |

### INavigatorButton

| 属性          | 说明                | 类型                         | 默认值 | 必选  |
| ------------- | ------------------- | ---------------------------- | ------ | ----- |
| children      | 导航栏按钮 children | ReactNode or React.Component | --     | true  |
| onPress       | 按钮点击回调        | () => any                    | --     | false |
| style         | 按钮央视            | ViewStyle                    | --     | false |
| activeOpacity | 按钮点击透明度      | number                       | --     | false |
