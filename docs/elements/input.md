# Input

> 文本输入组件，继承原生Input功能，加了一层默认样式。

## 用法

```javascript
import Input from '@codoonfxd/crn-elements/dist/Input';

export const Demo = () => {
  focusNextField = (nextField) => {
    this.refs[nextField].inputRef.focus();
  };
  return (
    <Input ref="0" placeholder="第一个有边框输入框" 
      onSubmitEditing={() => this.focusNextField('1')}
    />
    <Input ref="1" placeholder="第一个有边框输入框" />
  )
};
```

注意：默认的颜色为咕咚主题色`#00bc71`，默认样式：
```
  height: 36,
  paddingHorizontal: 8,
  borderWidth: 1,
  borderRadius: 4,
```

## 示例

### 自定义样式

```javascript
import Input from '@codoonfxd/crn-elements/dist/Input';

export const Demo = () => {
  return (
    <Input ref="3" placeholder="第四个TextInput输入框"
    multiline={true}
    style={{
      height: 60,
      fontSize: 16,
      padding: 4,
      marginBottom: 10,
      borderColor: '#dddddd',
    }}/>
  );
};
```

## Props

|      参数       |                   说明                    |      类型       | 可选值 |  默认值   |
| :-------------: | :---------------------------------------: | :-------------: | :----: | :-------: |
|      style      | 按钮样式 |    ViewStyle    |   -    |    {}     |
|    onChangeText    |     value值回调函数      |    function    |   -    |    -     |
