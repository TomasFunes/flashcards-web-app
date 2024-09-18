import { FormEventHandler, useState } from "react"
import { CardType } from "../types"

interface cardFormProps {
    card: CardType | null;
    onCard: FormEventHandler<HTMLFormElement>;
}

export function CardForm({card, onCard}: cardFormProps) {
    const [formData, setFormData] = useState({
        queue: card?.queue,
        answer: card?.answer
    });

    return (
        <form role="card-form" onSubmit={onCard} className=" bg-gray-100  my-3 shadow-md ">
            <p className="form-input">
                <label htmlFor="queue">Queue</label>
                <input type="text" id="queue" name="queue" value={formData.queue} 
                onChange={(e) => setFormData({...formData, queue: e.target.value})}
                className="leading-8"/>
            </p>
            <p className="form-input">
                <label htmlFor="answer">Answer</label>
                <input type="text" id="answer" name="answer" value={formData.answer} 
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                className="leading-8"/>
            </p>
            <button type="submit" className="green-btn">OK</button>
        </form>
    )
}