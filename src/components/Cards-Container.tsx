import { useState } from "react";
import { Card } from "./Card";
import { useCards, useCardsDispatch } from "./CardsContext";


export function CardsContainer() {
    const [answerState, setAnswerState] = useState(false);
    const cards = useCards();
    const dispatch = useCardsDispatch();
    const toReview = fetchReviewableCards();

    function fetchReviewableCards() {
        return cards.filter(card => (new Date()).getTime() - new Date(card.nextReview).getTime() >= 0);
    }


    function handleKnowledge(know: number) {
        if(know) {
            dispatch({
                type: "known",
                payload: toReview[0]
            });
        } else {
            dispatch({
                type: "notKnown",
                payload: toReview[0]
            });
        }
        setAnswerState(false);
      }


    return (
        <main role="cards-container" className="section">
            <h2 className="font-bold text-lg my-2">Today's cards</h2>
            {(toReview.length == 0) ?
            <>
            <p className="my-2">You have no more cards to study for today. Create new ones or come back tomorrow!</p>
            </>
            :
            <>
            <progress value={1} max={toReview.length}></progress>
            {toReview.slice(0, 1).map((card) => {
                return (
                    <Card 
                        key={card.id} 
                        card={card}
                        front={answerState ? false : true}
                    />
                )
            })}
            <div className="flex max-w-xs m-auto justify-between">
            {(answerState) ?
            <>
                <button onClick={() => handleKnowledge(1)} className="green-btn">I knew it</button>
                <button onClick={() => handleKnowledge(0)} className="red-btn">I didn't know it</button>
            </>
            :
            <>
                <button onClick={() => setAnswerState(true)} className="green-btn">
                    See answer
                </button>
            </>
            }
            </div>
            </>
            }
        </main>
    );
}