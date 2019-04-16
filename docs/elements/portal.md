# Portal

> 传送门组件，在全局渲染之后，通过静态方法可以动态添加组件至 Portal 节点下。

## 用法

### Portal

```javascript
import Portal from '@codoonfxd/crn-elements/dist/Portal';

// 该组件请在根目录添加
export const Demo = () => {
  return (
    <Portal>
      <OtherComponent />
    </Portal>
  );
};

const key = Portal.add(<ComponentOne />);
Portal.update(key, <ComponentTwo />);
Portal.remove(key);
```

### Portal.Consumer

使用该组件可以直接将子组件，也就是`children`渲染至**根节点**中，使用示例如下：

```javascript
<Portal.Consumer>
  <View style={{ position: 'absolute', top: 0 }}>
    <Text>I'm an element in portal.</Text>
  </View>
</Portal.Consumer>
```

## Props

|   参数    |                     说明                     |   类型    | 可选值 |  默认值   |
| :-------: | :------------------------------------------: | :-------: | :----: | :-------: |
|   style   |                   容器样式                   | ViewStyle |   -    |    {}     |
| eventName | 取消或增加事件监听的事件名（下面会详细介绍） |  string   |   -    | undefined |

> **eventName** 用于没有使用 rn 路由的项目，因为这种项目在跳转的时候，不会触发`componentWillUnmount`生命周期，所以默认的事件监听将不会被注销。因此添加`eventName`，这个事件用于跳转页面时触发。

> **注意:** 该事件将接收一个布尔值参数，情况如下；

- true: Portal 的功能将会正常使用。
- false: 注销 Portal 监听事件，其功能将会失效。

## 静态方法

### Portal.add(el: React.ReactNode): number

添加组件至根结构。

该方法接收一个 React 元素，执行后会将该元素添加至 Portal 组件的根目录下，返回值为这次添加元素的 key 值，用于更新与删除元素。

### Portal.update(key: number, el: React.ReactNode)

更新根结构的组件。

该方法接收 key 和 el，执行后将更新根结构的组件。

### Portal.remove(key: number)

删除根结构上的组件。

该方法接收 key 参数，执行后将删除 key 值匹配的组件元素。

> 可以查看`examples`中关于`Portal`的具体使用示例。
