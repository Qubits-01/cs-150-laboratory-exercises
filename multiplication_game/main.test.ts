import { describe, expect, it } from "vitest";
import { GameController } from "./main";

describe("GameController", () => {
    describe("multiplyK", () => {
        it("should multiply the value of K with the input num", () => {
            // Arrange
            let game = new GameController(100, 2);

            // Act 
            game.multiplyK(2);

            // Assert
            expect(game.K).toBe(4);
        });

        it("should change to next player after multiplying", () => {
            // Arrange
            let game = new GameController(100, 4);

            // Act 
            game.multiplyK(2);

            // Assert
            expect(game.whosTurn).toBe(1);
        });

        it("the game should be done when K >= N", () => {
            // Arrange
            let game = new GameController(12, 69);

            // Act
            game.multiplyK(9);

            // Assert
            expect(game.isGameDone()).toBe(true);
        });

        it("the game should not be done when K < N", () => {
            // Arrange
            let game = new GameController(100, 34);

            // Act
            game.multiplyK(4);

            // Assert
            expect(game.isGameDone()).toBe(false);
        });

        it("should return the correct winner (1)", () => {
            // Arrange
            let game = new GameController(20, 3);

            // Act
            game.multiplyK(2);
            game.multiplyK(5);

            // Assert
            expect(game.isGameDone()).toBe(true);
            expect(game.getWinner()).toBe(1);
        });

        it("should return the correct winner (2)", () => {
            // Arrange
            let game = new GameController(30, 3);

            // Act
            game.multiplyK(2);
            game.multiplyK(5);
            game.multiplyK(3);

            // Assert
            expect(game.isGameDone()).toBe(true);
            expect(game.getWinner()).toBe(2);
        });
    });

    describe("isGameDone", () => {
        it("should return true when K >= N", () => {
            // Arrange
            let game = new GameController(18, 2);

            // Act 
            game.multiplyK(9);

            // Assert
            expect(game.isGameDone()).toBe(true);
        });

        it("should return false when K < N", () => {
            // Arrange
            let game = new GameController(96, 2);

            // Act 
            game.multiplyK(9);

            // Assert
            expect(game.isGameDone()).toBe(false);
        });
    });

    describe("changeToNextPlayer", () => {
        it("should iterate to the next player", () => {
            // Arrange
            let game = new GameController(189, 3);

            // Act, Assert
            expect(game.whosTurn).toBe(0);
            game.multiplyK(9);
            expect(game.whosTurn).toBe(1);
            game.multiplyK(2);
            expect(game.whosTurn).toBe(2);
            game.multiplyK(2);
            expect(game.whosTurn).toBe(0);
        });
    });

    describe("getWinner", () => {
        it("should return the correct winner when the game is done", () => {
            // Arrange
            let game = new GameController(10, 3);

            // Act
            game.multiplyK(5);

            // Assert
            expect(game.isGameDone()).toBe(true);
            expect(game.getWinner()).toBe(0);
        });

        it("should return null if the game is not yet done", () => {
            // Arrange
            let game = new GameController(100, 3);

            // Act
            game.multiplyK(5);

            // Assert
            expect(game.isGameDone()).toBe(false);
            expect(game.getWinner()).toBeNull();
        });
    });
});
