import s from './TodoCard.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';

const TodoCard = (props) => {
  dayjs.extend(relativeTime);

  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const updateData = async (url) => {
    if (url && url.length > 0) {
      await updateDoc(doc(props.database, 'todo', props.data.date), {
        url: arrayUnion(url),
      });
      setUrl('');
    }
  };
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(props.storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => updateData(url));
      }
    );
  };
  const deleteTodoItem = async (id) => {
    await deleteDoc(doc(props.database, 'todo', props.data.date));
    console.log(progress);
  };
  const toggle = async () => {
    await updateDoc(doc(props.database, 'todo', props.data.date), {
      finished: !props.data.finished,
    });
  };
  const expires = dayjs(props.data.date).fromNow();

  return (
    <div
      className={expires.includes('ago') ? `${s.expired} + ${s.card}` : s.card}
    >
      {props.data.finished === true ? (
        <h1>
          {props.data.name} <br />
          <p className={s.taskDone}> is finished!</p>
        </h1>
      ) : (
        <>
          <h1 className={expires.includes('ago') ? s.expired : null}>
            {props.data.name}
          </h1>
          <h4>{props.data.description}</h4>
          <h4>
            {expires.includes('ago') ? 'expired' : 'expires'} {expires}
          </h4>
          <form>
            <input
              type="file"
              className={s.input}
              placeholder="files"
              onChange={(e) => {
                if (e.target.files[0]) uploadFiles(e.target.files[0]);
              }}
            />
          </form>
          <ol>
            {props.data.url !== undefined
              ? props.data.url.map((item, index) => (
                  <li key={index}>
                    <a
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item}
                      className={s.img}
                    >
                      Attached file #{index + 1}
                    </a>
                  </li>
                ))
              : null}
          </ol>
        </>
      )}

      <button className={s.button} onClick={() => deleteTodoItem(props.id)}>
        Delete
      </button>
      <button className={s.button} onClick={() => toggle()}>
        Mark as completed
      </button>
    </div>
  );
};

export default TodoCard;
