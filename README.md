# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Todo List using Firebase
### Only has two components -
### 1.input form : 
uses React Hooks of state(to pass data to the firebase storage) and Effect (to fetch data from firebase)
addTodo() - accepts form values 
@name - string, header of todo List
@description - string, main text
@date - string,estimated date to end task
@finished - Boolean, marks project as completed
getTodos() - getting data from Firebase storage
then using @useState to set whole data and map through it 

### 2.TodoCard components:
uses @dayjs to work with time
updateData() - adds new string to array for new file and allows to map through it 
uploadFiles() - uploads new file to firebase storage
deleteTodoItem() - removes exact Todo card from database
toggle() - toggles @finished state

### 2.Todo card itself 



