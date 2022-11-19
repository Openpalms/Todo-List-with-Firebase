# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Todo List using Firebase
### Only has two components -
### 1.input form : 
uses React Hooks of state(to pass data to the firebase storage) and Effect (to fetch data from firebase) <br/>
addTodo() - accepts form values  <br/>
@name - string, header of todo List <br/>
@description - string, main text <br/>
@date - string,estimated date to end task <br/>
@finished - Boolean, marks project as completed <br/>
getTodos() - getting data from Firebase storage <br/>
then using @useState to set whole data and map through it  <br/>

### 2.TodoCard components:
uses @dayjs to work with time <br/>
updateData() - adds new string to array for new file and allows to map through it  <br/>
uploadFiles() - uploads new file to firebase storage <br/>
deleteTodoItem() - removes exact Todo card from database <br/>
toggle() - toggles @finished state <br/>



