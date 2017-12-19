## 前言

React 寫久了，難免會開始對於一些重複性的事情感到厭煩，尤其是在進入大型專案開發以後，不僅表單的欄位大幅增加，還需要驗證、暫存、處理特殊的 UI 邏輯，Redux-Form 就是一個幫我們解決關於表單大小事的框架。在引入一個新的依賴關係前，我們必須了解它所解決的問題，以下是一個最簡單的 React 表單範例。

```jsx
// Form Component
class MyFormComponent extends Component {
  constructor() {
    super();
    this.state = { name: '', pwd: '' };
  }
  render() {
    const { name, pwd } = this.state;
    return (
      <form onSubmit={e => this.props.onSubmit(e, { name, pwd })}>
        <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })}/>
        <input value={this.state.pwd} onChange={e => this.setState({ pwd: e.target.value })}/>
        <button type="submit">送出</button>
      </form>
    );
  }
}

// Container
const Container = ({ handleSignIn }) => {
  return (
    <MyFormComponent onSubmit={handleSignIn}/>
  );
}
```
## 分析

事實上，幾乎每個 React 表單都在重複下面這些步驟

1. 初始化 form state
2. 將 state 注入表單控制項的 value
3. 將 setState 邏輯綁定類似 onChage 的事件
4. 驗證 form state
5. 收集所有 form state 並組成後端 API 定義的 Body

眾所周知 React 是一個易於封裝和元件化的語言，沒道理要重複寫出這樣固定的內容。事實上，在社群已經如此龐大的情況下，大部分的問題 NPM 上都已經有人解決過了，以下介紹 Redux-Form 的基本用法。

<img src="https://github.com/erikras/redux-form/raw/master/docs/reduxFormDiagram.png" style="max-height: 300px"/>

如[官方文件](https://redux-form.com/7.2.0/docs/gettingstarted.md/)上的這張圖，Redux-Form 的運作方式是直接在 redux store 裡建立一個 form reducer，並且利用 Field 元件的幫助，將表單控制項的內容注入 redux store 裡。

## 使用方法

如上述流程，安裝上我們必須先將 form reducer 與我們原來的 root reducer 結合

```js
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	...otherReducers,
	form: formReducer
})
```

再使用 Higher-Order Function 來裝飾我們的表單

```js
import { reduxForm, Field } from 'redux-form';

export default reduxForm({
  form: 'myForm',
})(MyFormComponent);
```

然後使用 Field 元件來包裝表單控制項

> 這裡的 name 屬性代表取決於我們希望它在 body 裡的名字，以上的設定會送出類似`{ name: 'swat', pwd: '123' }`這樣的 payload。

```jsx
// inject value & onChange to native <input />
const MyInput = ({ input: { value, onChange } }) => <input value={value} onChange={onChange} />;

// in render method
<Field name="name" component={MyInput}/>
<Field name="pwd" component={MyInput}/>
```

最後我們需要在 Container 裡設定 onSubmit 方法，如下

> 特別注意這裡的方法命名， Redux-Form 會幫我們把 Container 裡的 onSubmit 注入到 FormComponent 裡的 handleSubmit props，且幫我們處理掉 e.preventDefault() 的跳頁問題。

```jsx
// in Container
<MyFormComponent onSubmit={handleSignIn} />

// in FormComponent
<form onSubmit={this.props.handleSubmit}>
	{/* ... */}
</form>
```

## 成果

大功告成，以下是完成後元件的全貌
> 在這裡為了方便展示，將 Container 及 Form 寫在一起，可自行拆分，或參考[完整範例](https://github.com/puresmash/redux-form-example/tree/v0.1)。

```jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as Actions from '../actions';

const MyInput = ({ input: { value, onChange } }) => <input value={value} onChange={onChange} />;

// Form Component
class FormComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field name="name" component={MyInput} />
        <Field name="pwd" component={MyInput} />
        <button type="submit">送出</button>
      </form>
    );
  }
}

const MyFormComponent = reduxForm({
  form: 'simpleForm'
})(FormComponent);


// Container
const Container = ({ handleSignIn }) => {
  return (
    <MyFormComponent onSubmit={handleSignIn}/>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    handleSignIn: payload => dispatch(Actions.signIn(payload))
  }
}

export default connect(null, mapDispatchToProps)(Container);
```
## 後記

- 至此我們已經完成了基本的 Redux-Form 架構，不過目前整體還過於簡單，還不算太有用，下一篇文章將繼續介紹複雜一點的應用方式。
- 為了優化使用者體驗，如果應用的表單比較簡單，其實可以考慮是否需要引入 Redux-Form 依賴，因為更多的依賴代表使用者必須下載更大的 Bundle Files，延緩首次加載的時間。