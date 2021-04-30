import React from "react"


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input:"",
            list: [],
            color:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.delHandle = this.delHandle.bind(this);

    }

    handleChange(event){
        this.setState({
            input: event.target.value,
        })
    }

    handleClick(){
        
        this.setState(state =>{
            const newItem = state.input;
            if (newItem){
                return{
                    input:"",
                    list: state.list.concat(newItem),
                }
            }

        })
    }
    // a little feature for 1. to prevent deleting more than 1 item when we have for example 3 "dog" elements 
    //and 2. to place other repeated elements at the bottom of the list. Like that, we will notice that we have more than 1 of an element
    // when there is a repeated element in our list, e.g. 3 "dog", when we delete one "dog" element, the two other elements will go at the end of the list.
    delHandle(event){
        const list = [...this.state.list];
        const reserveList = list.filter(i => i === event.target.id);
        const updatedList = list.filter(i => i !== event.target.id);
        if (reserveList.length === 1){
            this.setState({
                list: updatedList,
            });
        } else{
            reserveList.shift();
            for (let i=0; i<reserveList.length; i++){
                updatedList.push(reserveList[i]);
            };
            this.setState({
                list: updatedList,
            })
        }
        
    }
    

    render (){
        const elements = [...this.state.list];
        let items = elements.map(item =>{
            let id = 1 + Math.random();
            return (
                <li key={id + item} className="l-item">{item} <button id={item} className="del-btn" onClick={this.delHandle} >X</button> </li>
            )
        }
            
        )
        
        return(
            <div className="container">
                <div className="title">
                <h1>My List</h1>
                </div>
                
                <div className="app-box" >
                    
                    <input type="text" className="input" placeholder="Add to list..." value={this.state.input} onChange={this.handleChange} ></input>
                    <button className="add-btn" onClick={this.handleClick} >Add</button>
                    <ul className="list" >{items}</ul>

                </div>
            </div>

        )
    }
}

export default App