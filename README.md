# ⚛️ react-markdown-table-ts 🛡️

[![NPM Version](https://img.shields.io/npm/v/react-markdown-table-ts.svg)](https://www.npmjs.com/package/react-markdown-table-ts)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
[![codecov](https://codecov.io/gh/keithwalsh/react-markdown-table-ts/branch/main/graph/badge.svg)](https://codecov.io/gh/keithwalsh/react-markdown-table-ts)

A React component that converts structured data into Markdown table syntax and displays it within a `<pre>` tag.

## ✨ Features

- **Type Safety:** Built with TypeScript to provide strong type guarantees.
- **Easy Integration:** Simple API for converting data arrays into Markdown table strings.
- **Customizable Alignments:** Specify column alignments (left, center, right, or none) with ease.
- **Compact Mode:** Option to generate compact tables with minimal padding.
- **Header Options:** Choose whether to include a header row or use default alphabetical headers.
- **Tab-Separated Columns:** Option to add tabs between columns.
- **Flexible Styling:** Apply custom CSS classes for styling the rendered Markdown.

## 📦 Installation

Install the package via npm:

```

npm install react-markdown-table-ts

```

## 🔧 API

### MarkdownTable Props

|        Prop        |                     Type                      |   Default   |                 Description                 |
| :----------------: | :-------------------------------------------: | :---------: | :-----------------------------------------: |
|       `data`       |                 `string[][]`                  | (required)  |   The table data as a 2D array of strings   |
|    `hasHeader`     |                   `boolean`                   |   `true`    | Whether the first row of `data` is a header |
| `columnAlignments` | `('left' \| 'center' \| 'right' \| 'none')[]` |    `[]`     |          Alignment for each column          |
|     `compact`      |                   `boolean`                   |   `false`   |          Use minimal column widths          |
|    `className`     |                   `string`                    | `undefined` |      CSS class for the rendered table       |
|     `useTabs`      |                   `boolean`                   |   `false`   |       Add tabs between table columns        |

## 🚀 Usage

```jsx
import React from 'react';
import {MarkdownTable} from 'markdown-table-component';

const App = () => {
  const data = [
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3'],
    ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3'],
  ];

  return <MarkdownTable data={data} />;
};

export default App;
```
