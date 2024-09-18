import {beforeEach, describe, expect, it, vi } from 'vitest';
import {cleanup, render, screen, waitFor, within } from '@testing-library/react'
import "@testing-library/jest-dom/vitest"
import React, { useContext } from 'react';
import { CardsContainer } from '../src/components/Cards-Container';
import userEvent from "@testing-library/user-event"
import { CardsContext, CardsDispatchContext, CardsProvider } from '../src/components/CardsContext';


beforeEach(() => {
    cleanup();
})

const mockCard = {
    id: 1,
    box: 1,
    queue: "Apple",
    answer: "Manzana",
    nextReview: new Date()

}

const mockCardList = [
    {
        id: 1,
        box: 1,
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

const setCards = vi.fn(() => {})


describe("Cards container component testing", () => {
    it("Renders learning section with one card available", () => {
        render(
        <CardsContext.Provider value={[mockCard]}>
            <CardsContainer />
        </CardsContext.Provider>
        );


        expect(screen.getByRole("heading")).toBeInTheDocument();
        expect(screen.getByRole("progressbar")).toBeInTheDocument();

        expect(screen.getByRole("card")).toBeInTheDocument();
        expect(screen.getByRole("button", {
            name: /see answer/i
        })).toBeInTheDocument();
    });

    it("Renders learning section with the first card on the list if many cards are available", () => {
        render(
            <CardsContext.Provider value={mockCardList}>
                <CardsContainer />
            </CardsContext.Provider>
            );


        expect(screen.getByRole("heading")).toBeInTheDocument();
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
        expect(screen.getByRole("button", {
            name: /see answer/i
        })).toBeInTheDocument();

        const card = screen.getByRole("card")
        expect(within(card).getByRole("paragraph")).toHaveTextContent(/apple/i)
        
    });

    it("Renders learning section with NO cards available", () => {
        render(
        <CardsContext.Provider value={[]}>
            <CardsContainer />
        </CardsContext.Provider>
        );

        expect(screen.getByRole("heading")).toBeInTheDocument();
        expect(screen.getByRole("paragraph")).toHaveTextContent(/You have no more cards/i)
    });

    it("Renders answer display when clicking the 'see answer' button", async () => {
        render(
        <CardsContext.Provider value={mockCardList}>
            <CardsContainer />
        </CardsContext.Provider>
        )

        const user = userEvent.setup();

        const seeAnsBtn = screen.getByRole("button", {
            name: /see answer/i
        });

        await user.click(seeAnsBtn);

        expect(screen.getByRole("button", {name: /i knew it/i})).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /i didn't know it/i})).toBeInTheDocument()
    })
})