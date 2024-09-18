import {beforeEach, describe, expect, it, test, vi } from 'vitest';
import {cleanup, render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/vitest"
import React from 'react';
import userEvent from "@testing-library/user-event"
import { CardForm } from '../src/components/Card-Form';


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

const handleUpdateCards = vi.fn(() => 0);

describe("Tests for card form component", () => {
    
    it("renders form for card creation correctly", () => {  
        render(<CardForm card={null} onCard={handleUpdateCards}/>)

        expect(screen.getByRole("textbox", {name: /queue/i})).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: /answer/i})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /OK/i})).toBeInTheDocument();
    }) 

    it("renders for card update correctly", () => {  
        render(<CardForm card={mockCardList[0]} onCard={handleUpdateCards}/>)

        screen.debug();

        expect(screen.getByRole("textbox", {name: /queue/i})).toHaveValue("Apple");
        expect(screen.getByRole("textbox", {name: /answer/i})).toHaveValue("Manzana");
        expect(screen.getByRole("button", {name: /OK/i})).toBeInTheDocument();
    }) 

    it("Calls handler when clicking the 'edit button", async () => {  
        render(<CardForm card={mockCardList[0]} onCard={handleUpdateCards} />)

        const user = userEvent.setup();

        const editBtn = screen.getByRole("button", {name: /OK/i});
        await user.click(editBtn);
    }) 
})
