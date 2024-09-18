import {beforeEach, describe, expect, it, test } from 'vitest';
import {cleanup, render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/vitest"
import React from 'react';
import { CardsLibrary } from "../src/components/Cards-Library";
import userEvent from "@testing-library/user-event"
import { CardsContext } from '../src/components/CardsContext';


beforeEach(() => {
    cleanup();
})

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

describe("Cards library component test", () => {
    it("Renders without existing cards correctly", () => {
        render(
        <CardsContext.Provider value={[]}>
            <CardsLibrary />)
        </CardsContext.Provider>
        );

        expect(screen.getByRole("heading", {name: /my cards/i})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /create card/i})).toBeInTheDocument();

    })
    
    it("Renders with existing cards correctly", () => {
        render(
            <CardsContext.Provider value={mockCardList}>
                <CardsLibrary />)
            </CardsContext.Provider>
        );
    
        expect(screen.getAllByRole("card")).toHaveLength(2);
        expect(screen.getByRole("heading", {name: /my cards/i})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /create card/i})).toBeInTheDocument();

    })

    it("Renders card form after clicking on a card", async () => {
        render(
            <CardsContext.Provider value={mockCardList}>
                <CardsLibrary />)
            </CardsContext.Provider>
        );
        const user = userEvent.setup()

        const firstCard = screen.getAllByRole("card")[0];
        await user.click(firstCard)

        expect(screen.getByRole("card-form")).toBeInTheDocument();
    })

})