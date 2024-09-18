import { CardType } from "../types"

interface cardProps {
    card: CardType
    front: boolean   
}

export function Card({ card, front }: cardProps) {
    return (
        <div role="card" className="card">
            <div role="box-label" className="absolute right-0 bg-red-900 text-white text-2xl px-2 rounded-tr-lg rounded-bl-lg">{card.box}</div>
            <p className="absolute top-1/3 w-full text-balance text-xl">{front ? card.queue : card.answer}</p>
        </div>
    )
}