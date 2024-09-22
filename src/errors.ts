// src/errors.ts

/**
 * @fileoverview Defines custom error classes for Markdown table syntax generation.
 */

export class MarkdownTableError extends Error {
    /**
     * Constructs a new MarkdownTableError.
     * @param message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "MarkdownTableError";
    }
}
