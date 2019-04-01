# Toast

> 用于展示消息，加载中状态的组件。

## 用法

```javascript
import Toast from '@codoonfxd/crn-elements/dist/Toast';

// 提示消息
Toast.open({
  message: '我是消息提示',
});

// 展示与隐藏加载中状态
Toast.showLoading();
Toast.hideLoading();
```

## 静态方法

### Toast.open(config: IToastOpenConfig)

> IToastOpenConfig 详细类型信息请查看`ToastStatic.tsx`文件。

打开一个 Toast 提示框，默认会在 2s 后关闭，如果需要长期存在，请将 **duration 传值为 0**。

#### `IToastOpenConfig`参数表：

|    参数名     |        说明        | 可选值(- 为无可选值) |         类型         |   默认值(- 为必填)   |
| :-----------: | :----------------: | :------------------: | :------------------: | :------------------: |
|    message    |     提示的文字     |          -           |        string        |          -           |
|     style     |      容器样式      |          -           |      ViewStyle       |          {}          |
|   textStyle   |      文字样式      |          -           |      TextStyle       |          {}          |
|   duration    |   显示持续的时间   |          -           |        number        |         2000         |
|    hasMask    |   是否显示遮罩层   |          -           |       boolean        |        false         |
| animateConfig |    过渡动画配置    |          -           | IToastConfig(见下表) | 详见`IToastConfig`表 |
|   renderTop   | 文字上方渲染的组件 |          -           |      ReactNode       |      undefined       |
| renderBottom  | 文字下方渲染的组件 |          -           |      ReactNode       |      undefined       |
|  renderLeft   | 文字左侧渲染的组件 |          -           |      ReactNode       |      undefined       |
|  renderRight  | 文字右侧渲染的组件 |          -           |      ReactNode       |      undefined       |
|    onClose    |  提示关闭后的回调  |          -           |       Function       |      undefined       |

#### `IToastConfig`参数表：

|     参数名      |             说明             | 可选值(- 为无可选值) |      类型      |  默认值(- 为必填)   |
| :-------------: | :--------------------------: | :------------------: | :------------: | :-----------------: |
| animateDuration | 过渡动画持续时间（单位毫秒） |          -           |     number     |         300         |
|     easing      |       过渡动画过渡效果       |          -           | EasingFunction | Easing.elastic(0.9) |

### Toast.destroy()

隐藏存在的 Toast 提示框。

### Toast.showLoading(message?: string)

展示加载中状态的提示框。

### Toast.hideLoading()

隐藏加载中状态提示框。
