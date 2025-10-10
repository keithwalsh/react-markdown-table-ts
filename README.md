# ⚛️ react-markdown-table-ts 🛡️

![build](https://github.com/keithwalsh/react-markdown-table-ts/actions/workflows/build.yml/badge.svg)
[![NPM Version](https://img.shields.io/npm/v/react-markdown-table-ts.svg)](https://www.npmjs.com/package/react-markdown-table-ts)
[![codecov](https://codecov.io/gh/keithwalsh/react-markdown-table-ts/branch/main/graph/badge.svg)](https://codecov.io/gh/keithwalsh/react-markdown-table-ts)
[![Code Climate](https://codeclimate.com/github/keithwalsh/react-markdown-table-ts/badges/gpa.svg)](https://codeclimate.com/github/keithwalsh/react-markdown-table-ts)
[![code quality](https://img.shields.io/codefactor/grade/github/keithwalsh/react-markdown-table-ts)](https://www.codefactor.io/repository/github/keithwalsh/react-markdown-table-ts)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

| ![Light Theme Example](public/light.png) | ![Dark Theme Example](public/dark.png)  |
|------------------------------------------|-----------------------------------------|
| `'light'` theme                          | `'dark'` theme                          |

## Overview 
A React component for generating and displaying formatted Markdown tables with syntax highlighting. The core component is `MarkdownTable` which converts 2D array data into properly formatted Markdown table syntax. Columns of variable width maintain consistent spacing across all rows, ensuring vertical alignment of delimiters. For syntax highlighting and line numbering, Prism.js is used within a `<pre>` HTML element.

## API
```typescript
interface MarkdownTableProps {
    inputData?: string[][] | null;
    columnAlignments?: readonly Alignment[];
    isCompact?: boolean;
    hasPadding?: boolean;
    hasTabs?: boolean;
    hasHeader?: boolean;
    convertLineBreaks?: boolean;
    topPadding?: number;
    theme?: 'light' | 'dark';
    className?: string;
    preStyle?: React.CSSProperties;
    minWidth?: number;
    showLineNumbers?: boolean;
    onGenerate?: (markdownTableString: string) => void;
}
```
| Prop                 | Type                                    | Default     | Description                                                                        |
|----------------------|-----------------------------------------|-------------|------------------------------------------------------------------------------------|
| `inputData`          | `string[][] \| null`                    | `null`      | The outer array represents rows. The inner array represent cells within each row. |
| `columnAlignments`   | `readonly Alignment[]`                  | `[]`	       | Acceptable values are 'left', 'center', 'right', or 'none'. Defaults to 'none' when unspecified. |
| `isCompact`          | `boolean`                               | `false`     | Disables column width alignment to provide a more compact markdown table string.   |
| `hasPadding`         | `boolean`                               | `true`      | One space added before and after the content in each cell.                         |
| `hasTabs`            | `boolean`                               | `false`     | Adds a tab character after each \| and before the content.                         |
| `hasHeader`          | `boolean`                               | `true`      | Indicates whether the first row of `data` is a header.                             |
| `convertLineBreaks`  | `boolean`                               | `false`     | Replace newlines with <br> tags in table cells.                                    |
| `topPadding`         | `number`                                | `16`        | Controls the padding-top (in pixels) of the \<pre\> element display.               |
| `theme`              | `'light' \| 'dark'`                     | `light`     | Controls the color scheme of the \<pre\> element display.                            |
| `className`          | `string`                                | `undefined` | Class will be applied to the \<pre\> element display.                                |
| `preStyle`           | `React.CSSProperties`                   | `undefined` | Allows direct styling of the display with CSS properties.                          |
| `minWidth`           | `number`                                | `undefined` | Optional minimum width in pixels for the table container.                          |
| `showLineNumbers`    | `boolean`                               | `true`      | Show or hide line numbers in the Prism syntax highlighting.                        |
| `onGenerate`         | `(markdownTableString: string) => void` | `undefined` | Callback to receive the generated Markdown table string.                           |
## Usage Patterns

1. **Basic Table Generation**:
```typescript
<MarkdownTable
    inputData={[
        ["Header 1", "Header 2"],
        ["Row 1 Col 1", "Row 1 Col 2"]
    ]}
/>
```
2. **Column Alignment**:
```typescript
<MarkdownTable
    inputData={data}
    columnAlignments={['left', 'center', 'right']}
/>
```
3. **Auto-Generated Headers**:
```typescript
<MarkdownTable
    inputData={data}
    hasHeader={false} // Will generate A, B, C... headers
/>
```
4. **Setting Minimum Width**:
```typescript
<MarkdownTable
    inputData={data}
    minWidth={500} // Sets the minimum width of the table container to 500 pixels
/>
```
5. **Hiding Line Numbers**:
```typescript
<MarkdownTable
    inputData={data}
    showLineNumbers={false} // Hides line numbers in the code block
/>
```

## Behaviors

1. **Input Validation**:
- Input must be non-null 2D string array
- All rows should contain string values
- Empty arrays are not allowed
- Column alignments must be valid ('left', 'center', 'right', 'none')

2. **Column Width Handling**:
- Default: Adjusts columns to fit content with 'none' alignment
- `isCompact={true}`: Minimizes column widths
- Maintains minimum width of 3 characters for alignment indicators

3. **Error Handling**:
- Returns error message string if validation fails
- Wraps errors in `MarkdownTableError` class
- Preserves stack traces for debugging

4. **Styling**:
- Uses Prism.js for syntax highlighting
- Supports light/dark themes
- Custom styles via `className` and `preStyle` props

## Common Transformations

1. **Data Formatting**:
- Newlines can be converted to `<br>` tags with `convertLineBreaks`
- Padding can be controlled with `hasPadding`
- Tab spacing available with `hasTabs`

2. **Header Generation**:
- Auto-generates A, B, C... headers when `hasHeader={false}`
- Supports custom headers via first row when `hasHeader={true}`
