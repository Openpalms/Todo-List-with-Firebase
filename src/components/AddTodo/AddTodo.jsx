import { useState, useEffect } from 'react';
import TodoCard from '../TodoCard/TodoCard';
import s from './AddTodo.module.css';
import dayjs from 'dayjs';
import { collection, setDoc, doc, query, onSnapshot } from 'firebase/firestore';

const AddTodo = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [finished, setfinished] = useState(false);
  const [firebaseTodo, setFirebaseTodo] = useState([]);
  const [iscorrect, setisCorrect] = useState(true);
  const addNewTodo = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(props.database, 'todo', date), {
        name: name,
        description: description,
        date: date,
        finished: finished,
        id: new Date().toISOString(),
        url: [],
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setName('');
    setDescription('');
    setDate('');
  };

  const getTodos = async () => {
    const q = query(collection(props.database, 'todo'));
    onSnapshot(q, (querySnapshot) => {
      setFirebaseTodo([]);

      querySnapshot.docs.map((doc) => {
        setFirebaseTodo((prevState) => {
          return [...prevState, doc.data()];
        });
      });
    });
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <form className={s.form}>
        <h2>Add new todo:</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">description</label>
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="description">Expire date</label>
        <input
          type="date"
          value={date}
          min={dayjs()}
          placeholder="Expire date"
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={(e) => {
            if (description.length > 0 && name.length > 0 && date.length > 0) {
              addNewTodo(e);
            } else {
              e.preventDefault();
              setisCorrect(false);
              setTimeout(() => {
                setisCorrect(true);
              }, 4000);
            }
          }}
        >
          {iscorrect ? 'Add' : 'Please fill all the fields'}
        </button>
      </form>
      <div className="cardsContainer">
        {firebaseTodo.map((item) => (
          <TodoCard
            key={item.id}
            database={props.database}
            storage={props.storage}
            data={item}
            setfinished={setfinished}
          />
        ))}
      </div>
    </>
  );
};

export default AddTodo;
