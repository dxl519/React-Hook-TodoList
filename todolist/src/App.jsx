import React, { useState } from 'react'

// 子组件
function Todo({ todo, index, clickComplete, downDelete }) {   //解构
    return (
        <div className="todo-item" style={{ textDecorationLine: todo.isCompleted ? 'line-through' : 'none' }}>{todo.text}

            <button onClick={() => { clickComplete(index) }}>完成</button>
            <button onClick={() => { downDelete(index) }}>删除</button>
        </div>

    )
}

//子组件
function TodoFrom({ addTodo }) {  //解构
    //声明一个叫value的变量用来存储内容
    const [value, setValue] = useState('')

    //点击提交
    const handle = () => {
        if (value === "") {
            alert("输入内容不能为空")
            return
        }
        addTodo(value)
        setValue("")
    }

    //按下Enter键添加内容
    const keyDown = e => {
        if (e.keyCode === 13) {
            handle()
        }

    }
    return (
        <div>
            <input type="text" value={value} onKeyDown={keyDown} onChange={e => setValue(e.target.value.trim())} />
            <button onClick={handle}>提交</button>
        </div>
    )


}

// 父组件
function App() {
    const [todos, setTodos] = useState([
        { text: '小明', isCompleted: false },
        { text: '小黑', isCompleted: true }
    ])
    //添加todo
    const addTodo = text => {
        const obj = { text: text, isCompleted: false }
        const newTodos = [...todos, obj]
        setTodos(newTodos)
        console.log(todos)
    }

    //点击完成改变状态
    const clickComplete = index => {
        const newTodos = [...todos]
        newTodos[index].isCompleted = true
        setTodos(newTodos)
    }

    //点击删除选中的内容
    const downDelete = index => {
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }

    //全选
    const allFuture = () => {
        let newisCompleted = false
        const newTodos = [...todos]
        newTodos.some((todo, index) => {
            if (todo.isCompleted === false) {
                newisCompleted = true
            }
            return 123
        })
        newTodos.map((item, index) => {
            newTodos[index].isCompleted = newisCompleted
            return 123
        })
        setTodos(newTodos)
    }
    return (
        <div className='center'>
            <h1>TodoList</h1>
            <button onClick={allFuture}>全选</button>
            <TodoFrom addTodo={addTodo}></TodoFrom>
            <div className="todo-list">
                {
                    todos.map((todo, index) => {
                        return <Todo key={index} todo={todo} index={index} downDelete={downDelete} clickComplete={clickComplete}></Todo>
                    })
                }
            </div>
        </div>
    )

}

export default App