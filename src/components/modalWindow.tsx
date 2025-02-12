import { FC } from "react"
import { fetchAddSeminar, fetchUpdateSeminar } from "../store/action-creators/Nodes"
import { store } from "../store"


interface ModalWindowProps {
    id: number
    title: string
    description: string
    date: string
    time: string
    photo: string
    update: boolean
}



const modalWindow: FC<ModalWindowProps> = ({id, title, description, date, time, photo, update}) => {

    // закрытие модального окна
    const closeModal = () => {
        const modal = document.querySelector('.modal-open');
        modal && modal.classList.remove('modal-open');
        modal && modal.classList.add('modal-close');
    }

    // редактирование семинара
    const updateSeminar = () => {
        store.dispatch(fetchUpdateSeminar(id, title, description, date, time, photo));
        closeModal();
    }

    // добавление семинара
    const addSeminar = () => {
        store.dispatch(fetchAddSeminar(title, description, date, time, photo));
    }
    return (
    <div className="modal-close">
        <div className="modal_content">
            <h2>Редактирование семинара</h2>
            <div className="modal_form">
            <input className='modal_input modal_title' type="text" placeholder="Название" value={title} />
            <input className='modal_input modal_description' type="text" placeholder="Описание" value={description} />
            <input className='modal_input modal_date' type="date" placeholder="Дата" value={date}  />
            <input className='modal_input modal_time' type="time" placeholder="Время" value={time}  />
            <input className='modal_input modal_photo' type="url" placeholder="Фото" value={photo} />
            <button className="button modal_submit" type="submit" onClick={update ? updateSeminar : addSeminar}>Сохранить</button>
            <button className="button modal_close" onClick={closeModal}>Закрыть</button>
            </div>
        </div>
        </div>
  )
}

export default modalWindow