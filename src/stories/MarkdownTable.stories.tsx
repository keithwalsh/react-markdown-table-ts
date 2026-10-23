/**
 * @fileoverview Storybook stories for the MarkdownTable component, demonstrating
 * various configurations and use cases for markdown table generation and display.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkdownTable } from '../MarkdownTable';

const meta = {
  title: 'Components/MarkdownTable',
  component: MarkdownTable,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    inputData: null,
    columnAlignments: [],
    isCompact: false,
    hasPadding: true,
    hasTabs: false,
    hasHeader: true,
    convertLineBreaks: false,
    topPadding: 16,
    theme: 'light' as const,
    showLineNumbers: true
  },
  argTypes: {
    inputData: {
      control: {
        type: 'object'
      },
      description: 'The outer array represents rows. The inner array represents cells within each row. Cells can be strings, numbers, booleans, null or undefined. null renders an empty table.',
      table: {
        category: 'Core Data Props',
        type: {
          summary: 'readonly (readonly CellValue[])[] | null',
          detail: 'export type CellValue = string | number | boolean | null | undefined;'
        }
      }
    },
    columnAlignments: {
      control: {
        type: 'object'
      },
      description: 'An array specifying the alignment for each column.',
      table: {
        category: 'Core Data Props',
        type: {
          summary: 'readonly Alignment[]',
          detail: 'export type Alignment = "left" | "right" | "center" | "none";'
        }
      }
    },
    isCompact: {
      control: 'boolean',
      description: 'Disables column width alignment to provide a more compact markdown table string.',
      table: {
        category: 'Configuration Props',
        type: {
          summary: 'boolean'
        }
      }
    },
    hasPadding: {
      control: 'boolean',
      description: 'Optional flag to add a single space around cell content in the markdown table.',
      table: {
        category: 'Configuration Props',
        type: {
          summary: 'boolean'
        }
      }
    },
    hasTabs: {
      control: 'boolean',
      description: 'Optional flag to put a tab on each side of the cell content, in place of the padding space.',
      table: {
        category: 'Configuration Props',
        type: {
          summary: 'boolean'
        }
      }
    },
    hasHeader: {
      control: 'boolean',
      description: 'Indicates whether the first row of `inputData` is a header.',
      table: {
        category: 'Configuration Props',
        type: {
          summary: 'boolean'
        }
      }
    },
    convertLineBreaks: {
      control: 'boolean',
      description: 'Optional flag to replace newlines with `<br>` tags in table cells.',
      table: {
        category: 'Configuration Props',
        type: {
          summary: 'boolean'
        }
      }
    },
    topPadding: {
      control: {
        type: 'number'
      },
      description: 'Space in pixels above the first line of the table.',
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: 'number'
        }
      }
    },
    theme: {
      options: ['light', 'dark', 'auto'],
      control: { type: 'select' },
      description: "Light or dark colours, or auto to follow the reader's colour scheme.",
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: "'light' | 'dark' | 'auto'"
        },
        defaultValue: { summary: 'light' }
      }
    },
    className: {
      control: 'text',
      description: 'Optional CSS class for styling the rendered Markdown table.',
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: 'string'
        }
      }
    },
    preStyle: {
      control: {
        type: 'object'
      },
      description: 'Optional inline styles for the pre element.',
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: 'React.CSSProperties'
        }
      }
    },
    minWidth: {
      control: {
        type: 'number'
      },
      description: 'Optional minimum width in pixels for the pre element.',
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: 'number'
        }
      }
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Optional flag to show or hide line numbers in the code block.',
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: 'boolean'
        },
        defaultValue: { summary: 'true' }
      }
    },
    nonce: {
      control: 'text',
      description: "Optional nonce for the component's style tag, for pages whose Content-Security-Policy blocks inline styles.",
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: 'string'
        }
      }
    },
    onGenerate: {
      description: 'Callback that receives the generated Markdown table string, plus a MarkdownTableError when inputData is invalid. Receives an empty string when inputData is null.',
      table: {
        category: 'Callbacks',
        type: {
          summary: '(markdownTableString: string, error: MarkdownTableError | null) => void'
        }
      }
    }
  }
} satisfies Meta<typeof MarkdownTable>

export default meta
type Story = StoryObj<typeof MarkdownTable>

// Move sample data before its usage
const sampleData = [
  ['Package ID', 'Weight (kg)', 'Status', 'Destination'],
  ['PKG-2024-001', '12.50', 'In Transit', 'Dublin, IE'],
  ['PKG-2024-002', '3.75', 'Delivered', 'New York, US'],
  ['PKG-2024-003', '8.20', 'Processing', 'Frankfurt, DE'],
  ['PKG-2024-004', '5.60', 'In Transit', 'London, GB']
]

export const Default: Story = {
  args: {
    inputData: sampleData,
    columnAlignments: ['left', 'right', 'center', 'none'],
    isCompact: false,
    hasPadding: true,
    hasTabs: false,
    hasHeader: true,
    convertLineBreaks: false,
    topPadding: 16,
    theme: "dark",
    className: 'markdown-table-pre',
    preStyle: {borderRadius: '8px'},
    minWidth: 450
  }
}

export const NarrowContainer: Story = {
  args: {
    inputData: sampleData
  },
  decorators: [
    Story => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    )
  ]
}
