import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { CardType } from "../types";

function saveFlashCards(flashcards: CardType[]) {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function loadFlashCards() {
    const savedCards = localStorage.getItem("flashcards");
    return savedCards ? JSON.parse(savedCards) : [];
} 


interface CardsProviderProps {
    children: React.ReactNode;
}

interface ActionType {
    type: string;
    payload: CardType;
}


export function cardsReducer(cards: CardType[], action: ActionType) {
    const payloadCard = action.payload;
    switch (action.type) {
        case 'known':
            saveFlashCards(cards.map(card => {
                const cardDate = new Date(payloadCard.nextReview);
                if(card.id === payloadCard.id) {
                    const nextDate = new Date(cardDate.getFullYear(), cardDate.getMonth(), cardDate.getDate() + 1);
                    return {
                        ...payloadCard, 
                        box: payloadCard.box + 1,
                        nextReview: nextDate
                    };
                }
                return card;
            }));
            return loadFlashCards();
        case 'notKnown':
            const updatedCards = cards.filter(card => card.id !== payloadCard.id);
            updatedCards.push({...payloadCard, box: 1, nextReview: new Date()});
            saveFlashCards(updatedCards);
            return loadFlashCards();
        case 'create':
            saveFlashCards([...cards, payloadCard]);
            return loadFlashCards();
        case 'update':
            saveFlashCards(cards.map(card => {
                if(card.id == payloadCard.id)
                    return payloadCard;
                return card;
            }));
            return loadFlashCards();
        case 'delete':
            saveFlashCards(cards.filter(card => card.id !== payloadCard.id));
            return loadFlashCards();
        default:
            return cards;
    }
}



export const CardsContext = createContext([] as CardType[]);
export const CardsDispatchContext = createContext<Dispatch<ActionType>>(() => {});

export const useCards = () => useContext(CardsContext);
export const useCardsDispatch = () => useContext(CardsDispatchContext);


export function CardsProvider({children}: CardsProviderProps) {
    const [cards, dispatch] = useReducer(cardsReducer, loadFlashCards());

    return (
        <CardsContext.Provider value={cards}>
            <CardsDispatchContext.Provider value={dispatch}>
                {children}
            </CardsDispatchContext.Provider>
        </CardsContext.Provider>
    );
}