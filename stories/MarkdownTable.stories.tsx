/**
 * @fileoverview Storybook stories for the MarkdownTable component, demonstrating
 * various configurations and use cases for markdown table generation and display.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownTable } from '../src/index'

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
    theme: 'light' as const
  },
  argTypes: {
    inputData: {
      control: {
        type: 'object'
      },
      description: 'The outer array represents rows. The inner array represent cells within each row.',
      table: {
        category: 'Core Data Props',
        type: {
          summary: 'string[][] | null'
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
      description: 'Optional flag to add tabs as additional padding between column pipes.',
      table: {
        category: 'Configuration Props',
        type: {
          summary: 'boolean'
        }
      }
    },
    hasHeader: {
      control: 'boolean',
      description: 'Indicates whether the first row of `data` is a header.',
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
      description: 'Controls the padding-top (in pixels) of the pre element display.',
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: 'number'
        }
      }
    },
    theme: {
      options: ['light', 'dark'],
      control: { type: 'select' },
      description: 'Switch between light and dark mode.',
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: "'light' | 'dark'"
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
      description: 'Optional minimum width in pixels for the table container.',
      table: {
        category: 'Visual/UI Props',
        type: {
          summary: 'number'
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
    theme: 'light',
    className: undefined,
    preStyle: undefined,
    minWidth: 450
  }
}
