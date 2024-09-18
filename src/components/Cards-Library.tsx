import { FormEvent, useState } from "react";
import { Card } from "./Card";
import { CardType } from "../types";
import { CardForm } from "./Card-Form";
import { useCards, useCardsDispatch } from "./CardsContext";



export function CardsLibrary() {
    const [formMode, setFormMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [focusedCard, setFocusedCard] = useState({} as CardType)
    const cards = useCards();
    const dispatch = useCardsDispatch();

    function handleCardClick(card: CardType) {
        setFocusedCard(card)
        setFormMode(true)
    }

    
    function handleCreateBtnClick() {
        setFocusedCard({id: Math.floor(Math.random() * (100000000 - 1) + 1), queue: "", answer: "", box: 1, nextReview: new Date()})
        setFormMode(true)
        setCreateMode(true)
    }

    function handleCreateCard(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const newCard = {
            ...focusedCard,
            queue: formData.get("queue") as string,
            answer: formData.get("answer") as string
        }

        dispatch({
            type: "create",
            payload: newCard
        })
        setFormMode(false)
        setCreateMode(false)
    }


    function handleUpdateCards(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const updatedCard = {
            ...focusedCard,
            queue: formData.get("queue") as string,
            answer: formData.get("answer") as string
        }

        dispatch({
            type: "update",
            payload: updatedCard
        })
        setFormMode(false)
    }

    function handleDeleteCard(card: CardType) {
        dispatch({
            type: "delete",
            payload: card,
        });
        setFormMode(false);
    }

    return (
        <div role="library" className="section">
            <h2 className="font-bold text-lg my-2">{(formMode) ? "Manage card" : "My cards"}</h2>
            {(formMode) ? 
            <div className="max-w-96 mx-auto">
            <button 
            onClick={() => setFormMode(false)}
            className="bg-gray-100 p-2 block">
                {"<-"} Back
            </button>
            <CardForm card={focusedCard} onCard={(createMode) ? handleCreateCard : handleUpdateCards} />
            {!createMode && 
            <button onClick={() => handleDeleteCard(focusedCard)} className="red-btn">Delete</button>}
            </div>
            :
            <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map(card => {
                return (
                    <div key={card.id} onClick={() => handleCardClick(card)}>
                        <Card  card={card} front={true} />
                    </div>
                )
            })}
            <button onClick={handleCreateBtnClick} className="green-btn card">Create card</button>
            </div>
            </>
            }
        </div>
    );
}