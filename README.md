# react-markdown-table-ts

[![NPM Version](https://img.shields.io/npm/v/react-markdown-table-ts.svg)](https://www.npmjs.com/package/react-markdown-table-ts)
[![codecov](https://codecov.io/gh/keithwalsh/react-markdown-table-ts/branch/main/graph/badge.svg)](https://codecov.io/gh/keithwalsh/react-markdown-table-ts)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

A React component that converts structured data into Markdown table syntax and displays it within a `<pre>` tag.

## Features

- **Type Safety:** Built with TypeScript to provide strong type guarantees.
- **Easy Integration:** Simple API for converting data arrays into Markdown table strings.
- **Customizable Alignments:** Specify column alignments (left, center, right, or none) with ease.

## Installation

Install the package via npm:

```

npm install react-markdown-table-ts

```

## API

| Name               | Type                                                 | Required | Description                                                                             |
| ------------------ | ---------------------------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| tableData          | MarkdownTableData                                    | Yes      | The structured data for the table, including headers and rows.                          |
| columnAlignments   | readonly ('left' \| 'center' \| 'right' \| 'none')[] | No       | Optional array specifying the alignment for each column. Defaults to 'left' alignment.  |
| adjustColumnWidths | boolean                                              | No       | Optional flag to automatically adjust column widths based on content. Defaults to true. |
| className          | string                                               | No       | Optional CSS class for styling the rendered Markdown table.                             |
