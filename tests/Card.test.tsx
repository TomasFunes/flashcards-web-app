import {beforeEach, describe, expect, test } from 'vitest';
import {cleanup, render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/vitest"
import { Card } from '../src/components/Card';
import React from 'react';

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

describe("Card component test", () => {
    test("renders queue part", () => {
        render(<Card card={mockCard} front={true} />);

        expect(screen.getByRole("box-label")).toHaveTextContent(/1/);
        expect(screen.getByRole("paragraph")).toHaveTextContent(/apple/i);
    })

    test("renders answer part", () => {
        render(<Card card={mockCard} front={false} />);

        expect(screen.getByRole("box-label")).toHaveTextContent(/1/);
        expect(screen.getByRole("paragraph")).toHaveTextContent(/manzana/i);
    })
})