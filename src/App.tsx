import { useState, useEffect, FC } from 'react';
import './App.css'
import { Seminar } from './types/seminars';
import { store } from './store';
import { fetchDeleteSeminar, fetchGetSeminar, fetchUpdateSeminar, fetchAddSeminar } from './store/action-creators/Nodes';
import Plus from './icons/Plus';
import Delete from './icons/Delete';
import Update from './icons/Udpate';

function App() {
  // состояние семинаров
  const [Seminar, setSeminar] = useState<Seminar[]>();
  // получение состояния загрузки
  const [loading, setLoading] = useState<boolean>(false);
  // получение ошибки
  const [error, setError] = useState<string | null>(null);

  // подписка на изменение состояния
  const unsubscribe = store.subscribe(() => {
    setSeminar(store.getState().fetchRepositoriesReducer.seminars)
    setLoading(store.getState().fetchRepositoriesReducer.loading)
    setError(store.getState().fetchRepositoriesReducer.error)
  })

  // состояние редактирования
  const [updateSeminarId, setUpdateSeminarId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');

  interface ModalWindowProps {
    id: number;
    add?: boolean
  }

  // модальное окно редактирования
  function modalWindow ({id, add = false}: ModalWindowProps) {
    const modal = document.querySelector('.modal-close');

    if (add) { 
      setUpdateSeminarId(0);
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setPhoto('');
    } else {
      setUpdateSeminarId(id);
      Seminar && Seminar.map((Seminar) => {
        if (Seminar.id === id) {
          setTitle(Seminar.title);
          setDescription(Seminar.description);
          setDate(Seminar.date);
          setTime(Seminar.time);
          setPhoto(Seminar.photo);
        }
      })
    }

    
    modal?.classList.remove('modal-close');
    modal?.classList.add('modal-open');
  }

  
  // закрытие модального окна
  const closeModal = () => {
    const modal = document.querySelector('.modal-open');
    modal && modal.classList.remove('modal-open');
    modal && modal.classList.add('modal-close');
  }
  
  // редактирование семинара
  const SeminarAddUpdate = (update: boolean = true) => {
    update ? store.dispatch(fetchUpdateSeminar(updateSeminarId, title, description, date, time, photo)) : store.dispatch(fetchAddSeminar(title, description, date, time, photo));
    closeModal();
  }

  // обновление семинаров
  useEffect(() => {
    unsubscribe();
    store.dispatch(fetchGetSeminar());
  }, [Seminar?.length]);
  

  // удаление семинара
  const deleteSeminar = (id: number) => {
    // окно подтверждения для удаления
    if (window.confirm('Вы действительно хотите удалить семинар?')) {
      store.dispatch(fetchDeleteSeminar(id));
    }

  }

  return (
    <>
      <div className="App container">
        <h1>Список семинаров</h1>
        {/* список семинаров */}
        <div className="seminars">
          {loading && <h2>Загрузка...</h2>}
          {error && <h2>{error}</h2>}
          {Seminar && Seminar.length ? Seminar?.map((Seminar) => (
            <div className="seminar_info" key={Seminar.id}>
              <div>
                <button type="button" onClick={() => deleteSeminar(Seminar.id)} className="info_delete button_svg__delete">{Delete()}</button>
                <button type="button" className="info_edit button_svg__edit" onClick={() => modalWindow({ id: Seminar.id, add: false })}>{Update()}</button>
                <h3 className="info_title">{Seminar.title}</h3>
                <p className="info_description">{Seminar.description}</p>
                <div className="info_dateTime">
                  <p className='info_date'>Дата: {Seminar.date}</p>
                  <p className='info_time'>Время: {Seminar.time}</p>
                </div>
              </div>
              <img className="info_photo" src={Seminar.photo} alt={Seminar.title} />
            </div>
          )) : 
            <h2>Список семинаров пуст</h2>
          }
          <div className="seminar_info seminar_add">
            <button className="button button_svg__add" onClick={() => modalWindow({ id: crypto.getRandomValues(new Uint32Array(1))[0], add: true })}>{Plus()}</button>
          </div>
          
        </div>
      </div>
      {/* модальное окно */}
      <div className="modal-close">
        <div className="modal_content">
          <h2>Редактирование семинара</h2>
          <form action={() => SeminarAddUpdate(updateSeminarId !== 0)} method="post"  className="modal_form">
            <input required className='modal_input modal_title' type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input required className='modal_input modal_description' type="text" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input required className='modal_input modal_date' type="date" placeholder="Дата" value={date} onChange={(e) => setDate(e.target.value)} />
            <input required className='modal_input modal_time' type="time" placeholder="Время" value={time} onChange={(e) => setTime(e.target.value)} />
            <input required className='modal_input modal_photo' type="url" placeholder="Фото" value={photo} onChange={(e) => setPhoto(e.target.value)} />
            <button className="button modal_submit" type="submit">Сохранить</button>
            <button className="button modal_close" onClick={closeModal}>Закрыть</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
