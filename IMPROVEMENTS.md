# Code Improvement Suggestions for react-markdown-table-ts

## Summary
This document outlines suggested improvements for the react-markdown-table-ts library. The codebase is well-structured with good test coverage, but there are opportunities to enhance code quality, developer experience, and maintainability.

---

## 1. Code Quality & Linting

### Missing ESLint Configuration
**Priority: HIGH**

The project lacks an ESLint configuration file, which is evident from the `eslint-disable` comment in `src/index.tsx:6`.

**Recommendation:**
- Add ESLint configuration with React and TypeScript support
- Add Prettier for consistent code formatting
- Add lint scripts to package.json

**Suggested Configuration:**

Create `eslint.config.js`:
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'coverage'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
)
```

Add to `package.json`:
```json
{
  "scripts": {
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix"
  },
  "devDependencies": {
    "@eslint/js": "^9.0.0",
    "eslint": "^9.0.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.0.0",
    "typescript-eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 2. Code Issues to Fix

### Unused Imports (src/index.tsx)
**Priority: MEDIUM**

Line 7 has an eslint-disable comment, and not all imported hooks appear to be used:
```typescript
import { useEffect, useMemo, useRef, useDeferredValue, useTransition, useId } from 'react';
```

**Recommendation:**
- Remove unused imports after reviewing which hooks are actually needed
- The `useTransition` destructured variable `_` is unused - consider removing if not needed

---

## 3. Performance Optimizations

### Prism.js Re-highlighting Logic
**Priority: MEDIUM**

In `src/index.tsx:103-120`, the component re-highlights on every markdown change, even if not necessary.

**Current Code:**
```typescript
useEffect(() => {
  const codeElement = preElementRef.current?.querySelector('code');
  if (codeElement && markdownTableSyntax) {
    startTransition(() => {
      requestAnimationFrame(() => {
        Prism.highlightElement(codeElement as HTMLElement);
        // ...
      });
    });
  }
}, [markdownTableSyntax, startTransition, showLineNumbers]);
```

**Issue:** 
- `startTransition` as a dependency might cause unnecessary re-renders
- The line number removal logic runs every time, even when `showLineNumbers` hasn't changed

**Recommendation:**
```typescript
useEffect(() => {
  const codeElement = preElementRef.current?.querySelector('code');
  if (codeElement && markdownTableSyntax) {
    startTransition(() => {
      requestAnimationFrame(() => {
        Prism.highlightElement(codeElement as HTMLElement);
      });
    });
  }
  // Remove startTransition from deps - it's stable
}, [markdownTableSyntax, showLineNumbers]);

// Separate effect for line number management
useEffect(() => {
  if (!showLineNumbers && preElementRef.current) {
    const lineNumbersRows = preElementRef.current.querySelector('.line-numbers-rows');
    lineNumbersRows?.remove();
  }
}, [showLineNumbers]);
```

### CSS-in-JS Performance
**Priority: LOW**

The inline `<style>` tags in the component re-render with every component update.

**Recommendation:**
- Consider extracting static CSS to separate files
- Use CSS modules or styled-components for better performance
- The theme CSS could be lazy-loaded only when needed

---

## 4. Type Safety Improvements

### Readonly Arrays Consistency
**Priority: LOW**

Some arrays are marked `readonly` (e.g., in `types.ts`) but others aren't consistently typed this way throughout the codebase.

**Recommendation:**
- Ensure consistent use of `readonly` for immutable data
- Consider using `ReadonlyArray<T>` or `readonly T[]` consistently

### Missing Type Exports
**Priority: LOW**

The library exports the component but not all useful types.

**Recommendation:**
Add an export file `src/index.ts` that exports everything users might need:
```typescript
export { MarkdownTable } from './index';
export type { 
  MarkdownTableProps, 
  Alignment, 
  InputData,
  TableConfig 
} from './types';
export { MarkdownTableError } from './validation';
```

---

## 5. Testing Enhancements

### Skipped Test
**Priority: MEDIUM**

There's a skipped test in `src/tests/index.test.tsx:72` for error re-throwing.

**Recommendation:**
- Either fix the test or remove it if it's not needed
- If the test is too flaky, consider documenting why it's skipped

### Missing Tests
**Priority: LOW**

Consider adding tests for:
- Edge cases with extremely wide columns
- Performance testing with very large datasets
- Memory leak testing for component unmounting
- Accessibility testing (ARIA attributes, keyboard navigation)

---

## 6. Documentation Improvements

### Missing Files
**Priority: MEDIUM**

The following files would improve the project:
- `LICENSE` - No license file found
- `CONTRIBUTING.md` - Guidelines for contributors
- `CHANGELOG.md` - Track version changes
- `.npmignore` or proper `files` field in package.json

**Recommendation:**

Add to `package.json`:
```json
{
  "files": [
    "dist",
    "README.md"
  ],
  "license": "MIT"
}
```

### API Documentation
**Priority: LOW**

While the README is comprehensive, consider:
- Adding JSDoc comments to all exported functions
- Creating an interactive documentation site (e.g., using Docusaurus)
- Adding more usage examples for complex scenarios

---

## 7. Build & Deployment

### Missing Build Configuration
**Priority: HIGH**

The `vite.config.ts` is minimal and doesn't configure library mode.

**Current:**
```typescript
export default defineConfig({
  plugins: [react()],
})
```

**Recommendation:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'ReactMarkdownTableTS',
      formats: ['es', 'cjs'],
      fileName: (format) => `react-markdown-table-ts.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'prismjs'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          prismjs: 'Prism'
        }
      }
    }
  }
})
```

### Pre-commit Hooks
**Priority: MEDIUM**

No pre-commit hooks are configured to ensure code quality.

**Recommendation:**
```json
{
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

Then run:
```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

---

## 8. Accessibility

### ARIA Attributes
**Priority: MEDIUM**

The component uses `role="code"` on the code element, but could benefit from more ARIA attributes.

**Recommendation:**
```typescript
<code 
  className="language-markdown" 
  role="code"
  aria-label="Generated markdown table"
  aria-live="polite" // Announce changes to screen readers
>
  {markdownTableSyntax}
</code>
```

---

## 9. Error Handling

### Validation Could Be More Comprehensive
**Priority: LOW**

The `validateInputData` function only checks basic structure, not cell content types.

**Current validation:**
- Checks if data is an array
- Checks if array is not empty

**Missing validation:**
- Doesn't verify all cells are strings
- Doesn't check for null/undefined cells
- No validation for column alignments

**Recommendation:**
```typescript
export function validateInputData(inputData: unknown): void {
  if (inputData === null || !Array.isArray(inputData)) {
    throw new MarkdownTableError("The 'data' prop must be a two-dimensional array.");
  }

  if (inputData.length === 0) {
    throw new MarkdownTableError("The 'data' array must contain at least one row.");
  }

  // Validate all rows are arrays
  for (let i = 0; i < inputData.length; i++) {
    if (!Array.isArray(inputData[i])) {
      throw new MarkdownTableError(`Row ${i} must be an array.`);
    }
  }
}

export function validateColumnAlignments(
  alignments: readonly unknown[]
): void {
  const validAlignments = ['left', 'right', 'center', 'none'];
  
  for (let i = 0; i < alignments.length; i++) {
    if (!validAlignments.includes(alignments[i] as string)) {
      throw new MarkdownTableError(
        `Invalid alignment at index ${i}: ${alignments[i]}. ` +
        `Must be one of: ${validAlignments.join(', ')}`
      );
    }
  }
}
```

---

## 10. Security

### Dependency Audit
**Priority: HIGH**

Run regular security audits:

```bash
npm audit
npm audit fix
```

Add to `.github/workflows/test.yml`:
```yaml
- name: Security audit
  run: npm audit --audit-level=moderate
```

---

## 11. Package.json Improvements

### Missing Fields
**Priority: MEDIUM**

The `package.json` is missing some recommended fields:

```json
{
  "license": "MIT",
  "author": "Keith Walsh <email@example.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/keithwalsh/react-markdown-table-ts.git"
  },
  "engines": {
    "node": ">=20.0.0"
  },
  "type": "module",
  "main": "./dist/react-markdown-table-ts.cjs.js",
  "module": "./dist/react-markdown-table-ts.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/react-markdown-table-ts.es.js",
      "require": "./dist/react-markdown-table-ts.cjs.js",
      "types": "./dist/index.d.ts"
    }
  },
  "sideEffects": false
}
```

---

## Priority Summary

### High Priority (Do First)
1. Add ESLint configuration
2. Fix Vite build configuration for library mode
3. Add missing package.json fields
4. Run security audit

### Medium Priority (Do Soon)
1. Fix unused imports in src/index.tsx
2. Add LICENSE file
3. Fix or remove skipped test
4. Add pre-commit hooks
5. Improve accessibility

### Low Priority (Nice to Have)
1. Performance optimizations
2. Enhanced type safety
3. Additional tests
4. Documentation enhancements
5. Extended validation

---

## Conclusion

This is a well-structured library with good fundamentals. The main improvements needed are around:
1. **Development tooling** (ESLint, Prettier, pre-commit hooks)
2. **Build configuration** (proper library mode setup)
3. **Documentation** (LICENSE, CONTRIBUTING.md)
4. **Accessibility** (better ARIA support)

The code quality is generally high, with good separation of concerns, comprehensive tests, and proper TypeScript usage. These improvements will make the library more maintainable and professional.
