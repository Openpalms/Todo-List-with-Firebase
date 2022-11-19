import './App.css';
import AddTodo from './components/AddTodo/AddTodo';
function App(props) {
  return (
    <div className="App">
      <div className="wrapper">
        <AddTodo database={props.database} storage={props.storage} />
      </div>
    </div>
  );
}

export default App;
