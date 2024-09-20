import { describe, it, expect } from 'vitest';
import { cardsReducer } from "../src/components/CardsContext";
import { CardType } from '../src/types';


describe("cardsReducer tests", () => {
    it("Returns the initial state", () => {
        const initialCards = [];
        const result = cardsReducer([], {type: "", payload: {} as CardType});
        expect(result).toEqual(initialCards);
    })


    it("Updates cards correctly on 'known' action from box 1 to box 2", () => {
        const initialState = [
            {
                id: 1,
                box: 1,
                queue: "Apple",
                answer: "Manzana",
                nextReview: new Date()
        
            },
        ]

        const knownCard = initialState[0];

        const result = cardsReducer(initialState, {type: "known", payload: knownCard})
        expect(result[0]).toEqual({
            ...knownCard, 
            box: knownCard.box + 1, 
            nextReview: new Date(knownCard.nextReview.getFullYear(), knownCard.nextReview.getMonth(), knownCard.nextReview.getDate() + 2).toISOString() 
        });
    })

    it("Updates cards correctly on 'known' action from box 2 to box 3", () => {
        const initialState = [
            {
                id: 1,
                box: 2,
                queue: "Apple",
                answer: "Manzana",
                nextReview: new Date()
        
            },
        ]

        const knownCard = initialState[0];

        const result = cardsReducer(initialState, {type: "known", payload: knownCard})
        expect(result[0]).toEqual({
            ...knownCard, 
            box: knownCard.box + 1, 
            nextReview: new Date(knownCard.nextReview.getFullYear(), knownCard.nextReview.getMonth(), knownCard.nextReview.getDate() + 5).toISOString() 
        });
    })

    it("Updates cards correctly on 'known' action from box 3 to box 4", () => {
        const initialState = [
            {
                id: 1,
                box: 3,
                queue: "Apple",
                answer: "Manzana",
                nextReview: new Date()
        
            },
        ]

        const knownCard = initialState[0];

        const result = cardsReducer(initialState, {type: "known", payload: knownCard})
        expect(result[0]).toEqual({
            ...knownCard, 
            box: knownCard.box + 1, 
            nextReview: new Date(knownCard.nextReview.getFullYear(), knownCard.nextReview.getMonth(), knownCard.nextReview.getDate() + 8).toISOString() 
        });
    })

    it("Updates cards correctly on 'known' action from box 4 to box 5", () => {
        const initialState = [
            {
                id: 1,
                box: 4,
                queue: "Apple",
                answer: "Manzana",
                nextReview: new Date()
            },
        ]
    
        const knownCard = initialState[0];
    
        const result = cardsReducer(initialState, {type: "known", payload: knownCard})
        
    
        expect(result[0]).toEqual({
            ...knownCard, 
            box: knownCard.box + 1, 
            nextReview: new Date(knownCard.nextReview.getFullYear(), knownCard.nextReview.getMonth(), knownCard.nextReview.getDate() + 14).toISOString() 
        });
    })

    it("Stays in the same box if the card is known and the box is 5", () => {
        const initialState = [
            {
                id: 1,
                box: 5,
                queue: "Apple",
                answer: "Manzana",
                nextReview: new Date()
            },
        ]

        const knownCard = initialState[0];

        const result = cardsReducer(initialState, {type: "known", payload: knownCard})
        expect(result[0]).toEqual({
            ...knownCard, 
            box: knownCard.box, 
            nextReview: new Date(knownCard.nextReview.getFullYear(), knownCard.nextReview.getMonth(), knownCard.nextReview.getDate() + 14).toISOString() 
        });
    })

    it("Updates cards correctly on 'notKnown' action", () => {
        const initialState = [
            {
                id: 1,
                box: 2,
                queue: "Apple",
                answer: "Manzana",
                nextReview: new Date()
        
            },
            {
                id: 2,
                box: 3,
                queue: "House",
                answer: "Casa",
                nextReview: new Date()
        
            }
        ]

        const notKnownCard = initialState[0];

        const result = cardsReducer(initialState, {type: "notKnown", payload: notKnownCard})
        
        expect(result).toEqual(
            [
                {
                    id: 2,
                    box: 3,
                    queue: "House",
                    answer: "Casa",
                    nextReview: new Date().toISOString()
            
                },
                {
                    id: 1,
                    box: 1,
                    queue: "Apple",
                    answer: "Manzana",
                    nextReview: new Date().toISOString()
            
                },
            ]
        );
    })


    it("Updates cards correctly on 'create' action", () => {
        const initialState = [
            {
                id: 1,
                box: 1,
                queue: "Apple",
                answer: "Manzana",
                nextReview: new Date()
        
            }
        ]

        const newCard = {
            id: 2,
            box: 3,
            queue: "House",
            answer: "Casa",
            nextReview: new Date()
        }

        const result = cardsReducer(initialState, {type: "create", payload: newCard})

        expect(result).toEqual(
            [
                {
                    id: 1,
                    box: 1,
                    queue: "Apple",
                    answer: "Manzana",
                    nextReview: new Date().toISOString()
            
                },
                {
                    id: 2,
                    box: 3,
                    queue: "House",
                    answer: "Casa",
                    nextReview: new Date().toISOString()
                }
            ]
        )
    })


    it("Updates cards correctly on 'delete' action", () => {
        const initialState = [
            {
                id: 1,
                box: 1,
                queue: "Apple",
                answer: "Manzana",
                nextReview: new Date()
        
            }
        ]

        const result = cardsReducer(initialState, {type: "delete", payload: initialState[0]})

        expect(result).toEqual([])

    })
})