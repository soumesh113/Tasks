import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import classes from "./List.module.css";
import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import App from "../../App";
import { Link } from 'react-router-dom';

function List() {
  const loggedIn=JSON.parse(localStorage.getItem("loggedIn"));
  if(!loggedIn)
  {
     Navigate("/");
  }
  const [isCompleteScreen, setIsCompleteScreen] = useState(0);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const[user,setUser]=useState("");
  const[mode,setMode] = useState(0)
  const modehandler = () =>{
    if(mode==0)
    {
      setMode(1)
    }
    else
    {
      setMode(0)
    }
  }
  useEffect(() => {
    let user=localStorage.getItem('current_user');
    console.log(user);
    let savedTodo = JSON.parse(localStorage.getItem(user+"?list"));
    setUser(user);
    let savedCompletedTodo = JSON.parse(localStorage.getItem(user+"?comList"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if(savedCompletedTodo)
    {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);
  const onCompleteHandler=(index)=>{
    let updatedTodoArr = [...allTodos];
    let complete=[...completedTodos];
    complete.push(allTodos[index]);
    localStorage.setItem(user+"?comList",JSON.stringify(complete));
    setCompletedTodos(complete);
    updatedTodoArr.splice(index, 1);
    setTodos(updatedTodoArr);
    localStorage.setItem(user+"?list", JSON.stringify(updatedTodoArr));
  }
  const onDeleteHandler=(index)=>{
    let updatedTodoArr = [...completedTodos];
    updatedTodoArr.splice(index, 1);
    setCompletedTodos(updatedTodoArr);
    localStorage.setItem(user+"?comList", JSON.stringify(updatedTodoArr));
  }
  const onDeleteHandler3=(item)=>{
     let updatedTodoArr = [...allTodos];
     let index = updatedTodoArr.indexOf(item);
     updatedTodoArr.splice(index, 1);
     setTodos(updatedTodoArr);
     localStorage.setItem(user+"?comList", JSON.stringify(updatedTodoArr));
  }
  const onEdit=(index)=>{
    var date = window.prompt("Enter new date:");
    var title = window.prompt("Enter new title");
    var description = window.prompt("Enter new description");
    let newTodoItem = {
      date: date,
      title: title,
      description: description,
    };
    let updatedTodoArr = [...allTodos];
  updatedTodoArr.splice(index, 1);
  updatedTodoArr.splice(index, 0, newTodoItem)
  setTodos(updatedTodoArr);
  localStorage.setItem(user+"?list", JSON.stringify(updatedTodoArr));
  }
  const onEdit2=(item)=>{
    var date = window.prompt("Enter new date:");
    var title = window.prompt("Enter new title");
    var description = window.prompt("Enter new description");
    let newTodoItem = {
      date: date,
      title: title,
      description: description,
    };
    let updatedTodoArr = [...allTodos];
    let index = updatedTodoArr.indexOf(item);
    updatedTodoArr.splice(index, 1);
    updatedTodoArr.splice(index, 0, newTodoItem)
    setTodos(updatedTodoArr);
    localStorage.setItem(user+"?list", JSON.stringify(updatedTodoArr));
  }
  const onDeleteHandler2=(index)=>{
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.splice(index, 1);
    setTodos(updatedTodoArr);
    localStorage.setItem(user+"?List", JSON.stringify(updatedTodoArr));
  }
  let listItems=<div></div>;
   if(isCompleteScreen==0){
   listItems=allTodos.map((item, index) => {
    return (
      <div className={classes.item} key={index}>
        <div className={classes.title}>Title: {item.title}</div>
        <div className={classes.dis}>Description: {item.description}</div>
        <div className={classes.date}>Date: {item.date}</div>
        <div>
          <button  className={classes.btn} onClick={()=>{onCompleteHandler(index)}}>Mark as done</button>
          <button className={classes.btn} onClick={()=>{onDeleteHandler2(index)}}>Delete</button>
          <button className={classes.btn} onClick={()=>{onEdit(index)}}>Edit</button>

        </div>
      </div>
    );
  })
};
const currentDate = new Date().toISOString().split('T')[0];
if(isCompleteScreen==2){
  const filteredData = allTodos.filter(item => item.date === currentDate);
  listItems=filteredData.map((item, index) => {
    return (
      <div className={classes.item} key={index}>
        <div className={classes.title}>Title: {item.title}</div>
        <div className={classes.dis}>Description: {item.description}</div>
        <div className={classes.date}>Date: {item.date}</div>
        <div>
          <button  className={classes.btn} onClick={()=>{onCompleteHandler(index)}}>Mark as done</button>
          <button className={classes.btn} onClick={()=>{onDeleteHandler3(item)}}>Delete</button>
          <button className={classes.btn} onClick={()=>{onEdit2(item)}}>Edit</button>
        </div>
      </div>
    );
  })
}
  if (isCompleteScreen==1){
    listItems=completedTodos.map((item, index) => {
      return (
        <div className={classes.item} key={index}>
          <div className={classes.title}>Title: {item.title}</div>
          <div className={classes.dis}> Description:{item.description}</div>
          <div className={classes.date}>Date: {item.date}</div>
          <div>
          <button className={classes.btn} onClick={()=>{onDeleteHandler(index)}}>Delete</button>
          </div>
        </div>
      );
  })
}
  const textHandler=(e)=>{
    setNewDescription(e.target.value);
  }
  
 const titleHandler=(e)=>{
  setNewTitle(e.target.value);
 }
 const handleAddTodo = () => {
  const titleExist=allTodos.some(todo=>todo.title===newTitle);
  if(newTitle==''|| newDescription==''){
    alert("fill the title and discription filed");
  }
  else if(titleExist){
    alert("title alredy exist");
  }
  else{
  let newTodoItem = {
    date:selectedDate,
    title: newTitle,
    description: newDescription,
  };
  let updatedTodoArr = [...allTodos];
  updatedTodoArr.push(newTodoItem);
  setTodos(updatedTodoArr);
  localStorage.setItem(user+"?list", JSON.stringify(updatedTodoArr));
}
  setNewDescription('');
  setNewTitle('');
};
const [selectedDate, setSelectedDate] = useState('');

const handleDateChange = (event) => {
  setSelectedDate(event.target.value);
};
const getComplete=()=>{
  if(isCompleteScreen==0|| isCompleteScreen==2){
    setIsCompleteScreen(1);
  }
}
const getToday=()=>{
  if(isCompleteScreen==1|| isCompleteScreen==0){
    setIsCompleteScreen(2);
  }
}
const getTodo=()=>{
  if(isCompleteScreen==1|| isCompleteScreen==2){
    setIsCompleteScreen(0);
  }
}
  return (
    <>
    <div className={classes.container}>
        <div className={classes.column1}>
           <div className={classes.addArea}>
           <button className={classes.add} onClick={handleAddTodo}> + Add task</button>
            <div className={classes.field}>Title:</div>
           <div><input type="text" className={classes.input} onChange={titleHandler} value={newTitle}></input></div>
           <div className={classes.field}>Description:</div>
            <div><textarea type="text" className={classes.textarea} onChange={textHandler} value={newDescription}></textarea></div>
            <label htmlFor="dateInput">Select a Date: </label>
      <input
        type="date"
        id="dateInput"
        value={selectedDate}
        onChange={handleDateChange}
      />
       <p>Selected Date: {selectedDate}</p>
           </div>
            <div className={classes.options} onClick={getComplete}>Completed</div>
            <div className={classes.options} onClick={getToday}> Today</div>
             <div className={classes.options} onClick={getTodo}> Todo</div>
             <Link to = "/">
              <button className={classes.btn}>Logout</button>
             </Link>
            <div className={classes.filter}>
    </div>
        </div>
        <div className={classes.column2}>
         {listItems}
        </div>
    </div> 
    </>
  )
}
export default List;


