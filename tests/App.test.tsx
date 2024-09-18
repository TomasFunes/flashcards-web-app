import {beforeEach, describe, expect, it, test } from 'vitest';
import {cleanup, render, screen, within } from '@testing-library/react'
import "@testing-library/jest-dom/vitest"
import App from "../src/components/App"  
import React from 'react';
import userEvent from "@testing-library/user-event"

beforeEach(() => {
    cleanup();
})

describe ("App component testing", () => {
    it("initially renders learn section", () => {
        render(<App />)
    
        expect(screen.getByRole("header")).toBeInTheDocument();
        expect(screen.getByRole("cards-container")).toBeInTheDocument();
    })

    it("Renders 'my cards' section", async () => {
        render(<App />)
        const user = userEvent.setup();

        const header = screen.getByRole("header");
        const sectionBtn = within(header).getByRole("button", {name: /my cards/i});
        await user.click(sectionBtn)

        expect(screen.getByRole("library")).toBeInTheDocument();

    })

    it("Renders 'how to use' section", async () => {
        render(<App />)
        const user = userEvent.setup();

        const header = screen.getByRole("header");
        const sectionBtn = within(header).getByRole("button", {name: /how to use/i});
        await user.click(sectionBtn)

        expect(screen.getByRole("help")).toBeInTheDocument();

    })
})
