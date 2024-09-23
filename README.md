# react-markdown-table-ts

[![NPM Version](https://img.shields.io/npm/v/react-markdown-table-ts.svg)](https://www.npmjs.com/package/react-markdown-table-ts)
[![codecov](https://codecov.io/gh/keithwalsh/react-markdown-table-ts/branch/main/graph/badge.svg)](https://codecov.io/gh/keithwalsh/react-markdown-table-ts)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A React component that converts structured data into Markdown table syntax and displays it within a `<pre>` tag.

## Features

- **Type Safety:** Built with TypeScript to provide strong type guarantees.
- **Easy Integration:** Simple API for converting data arrays into Markdown table strings.
- **Customizable Alignments:** Specify column alignments (left, center, right, or none) with ease.
- **Compact Mode:** Option to generate compact tables with minimal padding.
- **Header Options:** Choose whether to include a header row or use default alphabetical headers.
- **Flexible Styling:** Apply custom CSS classes for styling the rendered Markdown.

## Installation

Install the package via npm:

```

npm install react-markdown-table-ts

```

## API

### MarkdownTable Props

|        Prop        |                     Type                      |   Default   |                 Description                 |
| :----------------: | :-------------------------------------------: | :---------: | :-----------------------------------------: |
|       `data`       |                 `string[][]`                  | (required)  |   The table data as a 2D array of strings   |
|    `hasHeader`     |                   `boolean`                   |   `true`    | Whether the first row of `data` is a header |
| `columnAlignments` | `('left' \| 'center' \| 'right' \| 'none')[]` |    `[]`     |          Alignment for each column          |
|     `compact`      |                   `boolean`                   |   `false`   |          Use minimal column widths          |
|    `className`     |                   `string`                    | `undefined` |      CSS class for the rendered table       |

## Usage

```jsx
import React from 'react';
import {MarkdownTable} from 'markdown-table-component';

const App = () => {
  const data = [
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3'],
    ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3'],
  ];

  return (
    <MarkdownTable
      data={data}
      hasHeader={true}
      columnAlignments={['left', 'center', 'right']}
      compact={false}
      className="custom-table"
    />
  );
};

export default App;
```
