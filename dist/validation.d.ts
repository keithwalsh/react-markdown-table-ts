/**
 * @fileoverview Validation utilities and custom error class for markdown table
 * data validation.
 */
/**
 * Custom error class for handling Markdown table generation errors.
 * Supports ES2022 error chaining via the optional `cause` property.
 */
export declare class MarkdownTableError extends Error {
    constructor(message: string, options?: ErrorOptions);
}
/**
 * Validates that the input data is a non-empty two-dimensional array.
 * @param inputData - The data to validate
 * @throws {MarkdownTableError} If validation fails
 */
export declare function validateInputData(inputData: unknown): void;
//# sourceMappingURL=validation.d.ts.map