// src/index.tsx
import React from "react";

/**
 * Enum representing possible alignment options for table columns.
 */
export enum Align {
    /**
     * Align the content to the left.
     */
    Left = "left",
    /**
     * Align the content to the right.
     */
    Right = "right",
    /**
     * Center the content.
     */
    Center = "center",
    /**
     * No alignment specified.
     */
    None = "none",
}

/**
 * Represents a single column in a table row.
 */
export type Column = string;

/**
 * Represents a single row in a table, consisting of columns.
 */
export type Row = readonly Column[];

/**
 * Represents the structure of a Markdown table.
 */
export interface Table {
    /**
     * The header row of the table.
     */
    readonly head: Row;
    /**
     * The body rows of the table.
     */
    readonly body: readonly Row[];
}

/**
 * Input parameters for creating a Markdown table.
 */
export interface GetTableInput {
    /**
     * The table data including headers and body rows.
     */
    readonly table: Table;
    /**
     * Optional flag to align columns based on content width.
     * @default true
     */
    readonly alignColumns?: boolean;
    /**
     * Optional alignment settings for each column.
     */
    readonly alignment?: readonly Align[];
}

/**
 * Custom error class for handling Markdown table generation errors.
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

/**
 * Generates a Markdown-formatted table as a string.
 * @param params - The parameters for table generation.
 * @returns The Markdown string for the entire table.
 * @throws {MarkdownTableError} if input validation fails.
 */
const createMarkdownTable = ({ table, alignment, alignColumns = true }: GetTableInput): string => {
    /**
     * Validates the structure of the table object.
     * Throws an error if validation fails.
     * @param table - The table to validate.
     * @throws {MarkdownTableError} if validation fails.
     */
    const validateTable = (table: Table): void => {
        if (!table) {
            throw new MarkdownTableError("Missing 'table' property.");
        }

        if (!Array.isArray(table.head)) {
            throw new MarkdownTableError(`Expected table.head to be Array<Column>, got ${typeof table.head}. Actual value: ${JSON.stringify(table.head)}`);
        }

        if (table.head.length < 1) {
            throw new MarkdownTableError(`Expected table to have at least 1 header, got ${table.head.length}.`);
        }

        if (!Array.isArray(table.body)) {
            throw new MarkdownTableError(`Expected table.body to be Array<Row>, got ${typeof table.body}. Actual value: ${JSON.stringify(table.body)}`);
        }

        const allRows = [table.head, ...table.body];

        allRows.forEach((row, rowIndex) => {
            if (!Array.isArray(row)) {
                throw new MarkdownTableError(`Expected row ${rowIndex} to be Array<string>, got ${typeof row}. Actual value: ${JSON.stringify(row)}`);
            }

            row.forEach((column, columnIndex) => {
                if (typeof column !== "string") {
                    throw new MarkdownTableError(
                        `Expected column ${columnIndex} on row ${rowIndex} to be string, got ${typeof column}. Actual value: ${JSON.stringify(column)}`
                    );
                }
            });
        });
    };

    /**
     * Validates the alignment array.
     * Throws an error if validation fails.
     * @param alignment - The alignment settings to validate.
     * @throws {MarkdownTableError} if validation fails.
     */
    const validateAlignment = (alignment?: readonly Align[]): void => {
        if (!alignment) {
            return;
        }

        if (!Array.isArray(alignment)) {
            throw new MarkdownTableError(
                `Expected alignment to be undefined or Array<Align>, got ${typeof alignment}. Actual value: ${JSON.stringify(alignment)}`
            );
        }

        alignment.forEach((a, index) => {
            if (!Object.values(Align).includes(a)) {
                throw new MarkdownTableError(`Invalid alignment for column ${index}. Actual value: ${JSON.stringify(a)}`);
            }
        });
    };

    /**
     * Validates the input parameters for generating the Markdown table.
     * Throws an error if validation fails.
     * @param params - The input parameters to validate.
     * @throws {MarkdownTableError} if validation fails.
     */
    const validateGetTableInput = ({ table, alignment, alignColumns }: GetTableInput): void => {
        if (!table) {
            throw new MarkdownTableError("Missing input parameters.");
        }

        validateTable(table);
        validateAlignment(alignment);

        if (typeof alignColumns !== "undefined" && typeof alignColumns !== "boolean") {
            throw new MarkdownTableError(
                `'alignColumns' must be either undefined or boolean, got ${typeof alignColumns}. Actual value: ${JSON.stringify(alignColumns)}`
            );
        }
    };

    /**
     * Generates a Markdown-formatted string for a single row.
     * @param params - The parameters for row generation.
     * @returns The Markdown string for the row.
     */
    const getMarkdownRow = ({
        columnsAmount,
        row,
        alignment = [],
        columnLengths,
    }: {
        columnsAmount: number;
        row: Row;
        alignment?: readonly Align[];
        columnLengths?: readonly number[];
    }): string => {
        const defaultAlignment = Align.Left;
        const adjustedAlignment =
            alignment.length < columnsAmount ? [...alignment, ...Array(columnsAmount - alignment.length).fill(defaultAlignment)] : alignment;

        let markdownRow = "|";
        for (let i = 0; i < columnsAmount; i += 1) {
            const column = row[i] ?? "";
            const align = adjustedAlignment[i] ?? defaultAlignment;
            const targetLength = columnLengths ? columnLengths[i] : column.length;

            if (align === Align.Right) {
                markdownRow += ` ${column.padStart(targetLength)} |`;
            } else if (align === Align.Center) {
                const totalPadding = targetLength - column.length;
                const paddingLeft = Math.floor(totalPadding / 2);
                const paddingRight = totalPadding - paddingLeft;
                markdownRow += ` ${" ".repeat(paddingLeft)}${column}${" ".repeat(paddingRight)} |`;
            } else {
                // Left alignment or default
                markdownRow += ` ${column.padEnd(targetLength)} |`;
            }
        }

        return markdownRow;
    };

    /**
     * Generates the alignment row for the Markdown table.
     * @param params - The parameters for alignment row generation.
     * @returns The Markdown string for the alignment row.
     */
    const getMarkdownAlignment = ({
        columnsAmount,
        alignment = [],
        columnLengths,
    }: {
        columnsAmount: number;
        alignment?: readonly Align[];
        columnLengths?: readonly number[];
    }): string => {
        const defaultAlignment = Align.Left;
        const adjustedAlignment =
            alignment.length < columnsAmount ? [...alignment, ...Array(columnsAmount - alignment.length).fill(defaultAlignment)] : alignment;

        let markdownAlignment = "|";
        for (let i = 0; i < columnsAmount; i += 1) {
            const align = adjustedAlignment[i] ?? defaultAlignment;
            const targetLength = columnLengths ? columnLengths[i] : 3;
            let alignIndicator = "";

            switch (align) {
                case Align.Left:
                    alignIndicator = `:${"-".repeat(targetLength - 1)}`;
                    break;
                case Align.Center:
                    alignIndicator = `:${"-".repeat(targetLength - 2)}:`;
                    break;
                case Align.Right:
                    alignIndicator = `${"-".repeat(targetLength - 1)}:`;
                    break;
                default:
                    alignIndicator = `${"-".repeat(targetLength)}`;
                    break;
            }

            markdownAlignment += ` ${alignIndicator} |`;
        }

        return markdownAlignment;
    };

    /**
     * Calculates the maximum length for each column based on the content.
     * @param params - The parameters for column length calculation.
     * @returns An array of maximum lengths for each column.
     */
    const getColumnLengths = ({ allRows, maxColumnsAmount }: { allRows: readonly Row[]; maxColumnsAmount: number }): number[] => {
        return allRows.reduce((lengths, row) => {
            for (let i = 0; i < maxColumnsAmount; i++) {
                const cell = row[i] ?? "";
                lengths[i] = Math.max(lengths[i] ?? 3, cell.length);
            }
            return lengths;
        }, new Array<number>(maxColumnsAmount).fill(3));
    };

    // Begin processing
    validateGetTableInput({ table, alignment, alignColumns });

    const headerColumns = table.head.length;
    const rowColumns = table.body.map((row) => row.length);
    const maxColumnsAmount = Math.max(headerColumns, ...rowColumns);

    const columnLengths = alignColumns
        ? getColumnLengths({
              allRows: [table.head, ...table.body],
              maxColumnsAmount,
          })
        : undefined;

    const markdownTableHead = getMarkdownRow({
        columnsAmount: maxColumnsAmount,
        row: table.head,
        alignment,
        columnLengths,
    });

    const markdownTableAlignment = getMarkdownAlignment({
        columnsAmount: maxColumnsAmount,
        alignment,
        columnLengths,
    });

    let markdownTableBody = "";
    table.body.forEach((row) => {
        const markdownRow = getMarkdownRow({
            columnsAmount: maxColumnsAmount,
            row,
            alignment,
            columnLengths,
        });
        markdownTableBody += `${markdownRow}\n`;
    });

    return `${markdownTableHead}\n${markdownTableAlignment}\n${markdownTableBody}`.trimEnd();
};

/**
 * Props for the MarkdownTable component.
 */
export interface MarkdownTableProps extends GetTableInput {
    className?: string;
}

/**
 * React component that generates and displays a Markdown table syntax.
 * @param props - The input parameters for table generation.
 * @returns A <pre> element containing the Markdown table syntax or an error message.
 */
const MarkdownTable: React.FC<MarkdownTableProps> = (props) => {
    const { className } = props;

    // Generate the Markdown table string
    let markdownTable: string;
    try {
        markdownTable = createMarkdownTable(props);
    } catch (error) {
        if (error instanceof MarkdownTableError) {
            return <div className={className}>Error: {error.message}</div>;
        } else {
            throw error;
        }
    }

    return <pre className={className}>{markdownTable}</pre>;
};

export default MarkdownTable;
