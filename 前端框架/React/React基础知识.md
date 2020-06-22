# React基础知识

简介：本文为React基础知识笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)



## 1、属性语法

在属性中嵌入 JavaScript 表达式时，仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

```jsx
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
```

## 2、state & props

> `props` 是传递*给*组件的（类似于函数的形参），而 `state` 是在组件*内*被组件自己管理的（类似于在一个函数内声明的变量）。

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。更改输出内容需要借助state，其允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

- 不要直接修改 State，直接修改是无效的，需要通过setState来更改
- this.props和this.state可能是异步更新的，不要直接使用他们来更新state，而是使用函数传入

```jsx
// wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

- 数据是向下流动的，不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，但是组件可以选择把它的 state 作为 props 向下传递到它的子组件中，也就是父组件只能通过props传递信息，但子组件是不知道当前的props是来自父组件的props还是state。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

## 3、事件处理

- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

```jsx
// 传统html
<button onclick="activateLasers()">
  Activate Lasers
</button>

// react
<button onclick={activateLasers}>
  Activate Lasers
</button>
```

- 在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。

```jsx
// 传统html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>

// react
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

- 要注意JSX回调函数中绑定的this

```js
// 此时未绑定this，显示为undefined
class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        );
    }
}

// 此时已绑定this
class LoggingButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('this is:', this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        );
    }
}

// 不想使用bind绑定，通过以下两种语法也能实现绑定this
class LoggingButton extends React.Component {
  // public class fields 语法
  handleClick = () => {
    console.log('this is:', this); 
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
      // 回调中使用箭头函数-不建议
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

- 向事件传递参数的方法

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## 4、条件渲染

- 通过花括号包裹代码，可以在 JSX 中嵌入任何表达式，因此利用 JavaScript 中的逻辑与 (&&) 运算符或三目运算符，可以很方便地进行元素的条件渲染。

```jsx
<div>{unreadMessages.length > 0 && <h2>You have {unreadMessages.length} unread messages.</h2>}</div>
The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
```

- 如果要阻止渲染，则直接返回null即可。

## 5、列表和key

vue中通过v-for来进行循环，而react中通过map来获得列表。

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

注意，元素的 key 只有放在就近的数组上下文中才有意义，简单讲就是那里使用map，哪里就用key。

## 6、表单

**受控组件**：表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素使 React 的 state 成为“唯一数据源”，并根据用户输入进行更新。

```jsx
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: 'This is init nameValue',
            textValue: 'This is init textValue',
            selectValue: 'grapefruit'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form>
                {/*input标签*/}
                <label>名字:<input type="text" value={this.state.nameValue} name='nameValue' onChange={this.handleChange}/></label>
                {/*textarea标签*/}
                <label>文章:<textarea value={this.state.textValue} name='textValue' onChange={this.handleChange}/></label>
                {/*select标签*/}
                <select value={this.state.selectValue} name='selectValue' onChange={this.handleChange}>
                    <option value="grapefruit">葡萄柚</option>
                    <option value="lime">酸橙</option>
                </select>
            </form>
        );
    }
}
```

## 7、组合

这个概念类似于vue中的插槽，可以通过使用一个特殊的 children prop 来将他们的子组件传递到渲染结果。

```jsx
// 默认通过props.children传递
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
    </FancyBorder>
  );
}

// 也可以自定义名称
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.left}
            {props.right}
        </div>
    );
}

function WelcomeDialog() {
    return (
        <FancyBorder color="blue" left ={<h1>Welcome</h1>} right ={<h2>hello</h2>} />
    );
}
```

## 8、React哲学

1. 将设计好的 UI 划分为组件层级
2. 用 React 创建一个静态版本：最好将渲染 UI 和添加交互这两个过程分开，先用已有的数据模型渲染一个不包含交互功能的 UI
3. 确定 UI state 的最小（且完整）表示

>通过问自己以下三个问题，你可以逐个检查相应数据是否属于 state：
>1. 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
>2. 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
>3. 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

4. 确定 state 放置的位置

>对于应用中的每一个 state：
>
>- 找到根据这个 state 进行渲染的所有组件。
>- 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
>- 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
>- 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。
5. 添加反向数据流(回调函数等)



## 其他

- 组件名称必须以大写字母开头（React 会将以小写字母开头的组件视为原生 DOM 标签）。



------

如果发现本项目有错误，欢迎提交 issues 指正。

