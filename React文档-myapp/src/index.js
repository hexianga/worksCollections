import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//根据从局部到全局的思想编辑组件
// 可以理解为写React组件类就是在写html代码，不过只是将html代码拆分为各个小的部分，最后进行组装成一个完整的页面而已


// 写一个square组件类
/*
class Square extends React.Component {
    // 构造函数
    // 用于添加初始状态
    // constructor(){
    //     super();//构造函数中super()必不可少
    //     this.state ={
    //         value:null,
    //     };
    // }
    render (){
        // 从父组件获取参数
        // JSX中采用子节点的形式来进行注释,通过Board组件向Square组件传递参数
        return (
            <button className="square" onClick= {()=>this.props.onClick()} >
                {this.props.value}
            </button>
        );
    }
}*/

// 函数式组件替换Square方格类
function Square(props){
    // {props.onClick()} 将无法正常工作，因为它会立即调用 props.onClick方法 ，而不是将其传递过去。
    return (
        <button className="square" onClick= {props.onClick} >
            {props.value}
        </button>
    );
}



//写一个Board组件类
//写一个方法向Square传递参数
class Board extends React.Component {
    // constructor(){
    //   super();
    //   this.state={
    //     squares:Array(9).fill(null),
    //     xIsNext:true,
    //   };
    // }

    // handleClick(i){
    //     // 复制一个数组常量
    //     const squares= this.state.squares.slice();
    //     squares[i] = this.state.xIsNext?'X':'O';
    //     this.setState({
    //         squares:squares,
    //         xIsNext:!this.state.xIsNext,
    //     });
    // }

    // 这里的i值是render()方法中传进去的
    // 然后当方块点击的时候，i值上溯到Game组件类中的执行函数作为参数
    renderSquare(i){
        // state状态提升，将state中的数据作为参数传给Square子组件
        // 更新Board组件的state,绑定一个函数到点击事件
        // 代码拆分提高可读性
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={()=>this.props.onClick(i)}
            />
        );
    } 

    // 编辑render()方法
    render() {
        // 定义一个常量判定谁赢了
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if(winner){
        //     status='Winner: '+winner;
        // }else{
        //     // 下一个玩家
        //     status='Next player: '+(this.state.xIsNext ? 'X':'O');
        // }
        // JSX中变量和方法的引用使用{}
        return (
            <div>
                <div className="board-row">
                     {this.renderSquare(0)}
                     {this.renderSquare(1)}
                     {this.renderSquare(2)}
                </div>
                <div className="board-row">
                     {this.renderSquare(3)}
                     {this.renderSquare(4)}
                     {this.renderSquare(5)}
                </div>
                <div className="board-row">
                     {this.renderSquare(6)}
                     {this.renderSquare(7)}
                     {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//编辑一个Game组件
class Game extends React.Component{
    // 将state从board提升到Game
    constructor(){
        super();
        // 用一个对象数组来存放历史信息
        this.state={
            // 对象数组,每个对象中存每一步后的游戏状态
            // 棋盘中的所有数据是从history中的最后一个squares数组中获得并且进行渲染的
            // 所以要想点击后改变渲染就要改变history中最后一个squares中的值
            // 悔棋中是通过stepNumber来进行渲染的，所以当悔棋改变了stepNumber的值
            // 时，棋盘也会重新渲染
            history:[{
                squares:Array(9).fill(null),
            }],
            stepNumber:0,
            xIsNext:true,
            
        };
    }

    // 点击事件执行函数
    handleClick(i){
        // 复制常量以得到不能改变的数据

        // 跳转到之前的步骤后还要继续执行，所以此时应该实时改变历史记录中的状态
        const history= this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares= current.squares.slice();
        
        // 当有一方赢得游戏后点击失效
        // 当方块已经被点击后再次点击无效
        if(calculateWinner(squares)||squares[i]){
            return ;
        }

        squares[i] = this.state.xIsNext?'X':'O';

        // 点击后更改状态
        this.setState({
            history:history.concat([{
                squares:squares
            }]),
            // 改变当前执行到的步骤数
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext,
        });
    }


    // 编辑点击a标签的时候执行的跳转函数
    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)?false:true,
        });
    }

    render(){
        const history= this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        // 显示下棋步骤
        const moves = history.map((step,move)=>{
            const desc = move?
            'Move #'+move:
            'Game start';

            // 列表中的a标签没有链接地址但是有处理程序
            return (
                <li key={move}>
                    <a href = "#" onClick={()=>this.jumpTo(move)}>{desc}></a>
                </li>
            );
        });

        // 通过一个变量来存储谁输谁赢
        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status='Next player: '+(this.state.xIsNext ? 'X':'O');
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i)=>this.handleClick(i)}
            />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
        )
    }
}

// 将组件渲染到html中相应的元素下面
ReactDOM.render(
    <Game />,
    document.getElementById('root')
)

// 计算胜利的方法
function calculateWinner(squares){
    const lines=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i= 0;i<lines.length;i++){
        const [a,b,c]=lines[i];
        if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
            return squares[a];
        }
    }
    return null;
}