"use strict";
// src/errors.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTableError = void 0;
/**
 * Custom error class for handling Markdown table generation errors.
 */
class MarkdownTableError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MarkdownTableError';
        Object.setPrototypeOf(this, MarkdownTableError.prototype);
    }
}
exports.MarkdownTableError = MarkdownTableError;
//# sourceMappingURL=errors.js.map