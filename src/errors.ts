// src/errors.ts

/**
 * Custom error class for handling Markdown table generation errors.
 */
export class MarkdownTableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MarkdownTableError";
        Object.setPrototypeOf(this, MarkdownTableError.prototype);
    }
}
