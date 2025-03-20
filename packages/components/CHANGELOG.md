# @glasshouse/components

## 0.9.5

### Patch Changes

- Use css module instead of inline styles for data table container max height

## 0.9.4

### Patch Changes

- Bump dependencies version
  - @glasshouse/utils@0.3.4

## 0.9.3

### Patch Changes

- Fix on clearing select value user can't input new search

## 0.9.2

### Patch Changes

- Add additional layers of hooks for useDataTable hook

## 0.9.1

### Patch Changes

- Fix missing exports
- Updated dependencies
  - @glasshouse/utils@0.3.4

## 0.9.0

### Minor Changes

- `@glasshouse/components`: expose data table instance via hooks
- `@glasshouse/utils`: add utils for creating compound components

### Patch Changes

- Updated dependencies
  - @glasshouse/utils@0.3.3

## 0.8.3

### Patch Changes

- fix: cell padding now accept string and number and object of x and y padding
- chore: multiselect text display mode tooltip now show all selected values

## 0.8.2

### Patch Changes

- Minor linting fixes
- Updated dependencies
  - @glasshouse/utils@0.3.2

## 0.8.1

### Patch Changes

- Fix minor code style errors
- Updated dependencies
  - @glasshouse/utils@0.3.1

## 0.8.0

### Minor Changes

- Bump dependencies version, raise React minimum version to 19 and Next's to 15

### Patch Changes

- Updated dependencies
  - @glasshouse/utils@0.3.0

## 0.7.5

### Patch Changes

- fix(components/combobox): infinite loop caused by virtual items

## 0.7.4

### Patch Changes

- feat(components/list): add `measureElements` prop for dynamic size list items

## 0.7.3

### Patch Changes

- chore(components/multi-select): add `maxDisplayedValuesSeparator` prop for joined text values

## 0.7.2

### Patch Changes

- Downgrade deps version

## 0.7.1

### Patch Changes

- fix(components): ensure combobox item is not undefined, add virtualizer options prop

## 0.7.0

### Minor Changes

- feat: add virtualization to select and multiselect dropdown options list
- refactor: use intersection observer instead of scroll handler for next page query fetching
- fix: add another values array for referencing labels when data changes
- chore: tweak data table loading

## 0.6.26

### Patch Changes

- Fix table draggable header cell overlap resize handle

## 0.6.25

### Patch Changes

- Fix table storage set function missing storage key

## 0.6.24

### Patch Changes

- feat(data-table): add onDataFetch callback

## 0.6.23

### Patch Changes

- fix(components): radius props for list and grid
- chore(components): tweak data table loading states and visuals

## 0.6.22

### Patch Changes

- Remove console logs

## 0.6.21

### Patch Changes

- Fix search value not reset to current selected option.

## 0.6.20

### Patch Changes

- Fix combobox dropdown create new option function cause underlying form to submit

## 0.6.19

### Patch Changes

- Updated dependencies
  - @glasshouse/utils@0.2.10

## 0.6.18

### Patch Changes

- Refactor select and multiselect loading, tweak multiselect max displayed values.

## 0.6.17

### Patch Changes

- Fix a bug where search value is not return to previous value on blur
  Fix a bug where searching with query causes search value to return to previous value on due to empty data
- Updated dependencies
  - @glasshouse/utils@0.2.9

## 0.6.16

### Patch Changes

- fix: omit infinite from props passed down to input element in combobox components

## 0.6.15

### Patch Changes

- Raise css styles specificity

## 0.6.14

### Patch Changes

- Updated dependencies
  - @glasshouse/utils@0.2.8

## 0.6.13

### Patch Changes

- Add deprecated `bordered` props for backward compatibility

## 0.6.12

### Patch Changes

- Add disabled prop for input component in SelectBase

## 0.6.11

### Patch Changes

- Tweak multiselect, fix scrollshadow type
  - @glasshouse/utils@0.2.7

## 0.6.10

### Patch Changes

- feat(components): multi select can show tooltip for remaining values when max displayed values used

## 0.6.9

### Patch Changes

- Fix tailwind css file export

## 0.6.8

### Patch Changes

- Fix `Grid` polymorphic types not exported correctly, `Select` search query

## 0.6.7

### Patch Changes

- Add missing export for scrollshadow

## 0.6.6

### Patch Changes

- Fix list group header style

## 0.6.5

### Patch Changes

- Fix group header css data attribute

## 0.6.4

### Patch Changes

- Updated dependencies
  - @glasshouse/utils@0.2.7

## 0.6.3

### Patch Changes

- Update scroll shadow types

## 0.6.2

### Patch Changes

- Add virtualized props to `List` for disabling virtualization.

## 0.6.1

### Patch Changes

- Update package info
- Updated dependencies
  - @glasshouse/utils@0.2.6

## 0.6.0

### Minor Changes

- Refactor list component to use mantine utilities

## 0.5.0

### Minor Changes

- Remove table actions column shadow
- New component: ScrollShadow and ScrollShadow.Autosized

### Patch Changes

- Updated dependencies
  - @glasshouse/utils@0.2.5

## 0.4.7

### Patch Changes

- Remove unused peer dependencies

## 0.4.6

### Patch Changes

- Update peer dependencies

## 0.4.5

### Patch Changes

- Add option to remove root border

## 0.4.4

### Patch Changes

- Fix prop does not recognize on a DOM element error

## 0.4.3

### Patch Changes

- Tweak tsup config, build script

## 0.4.2

### Patch Changes

- feat(grid): refactor grid to use mantine core utilities and theming, moving away from using tailwind
- chore(grid): apply border radius, cell padding styles; additional stories for new props

## 0.4.1

### Patch Changes

- Bump dependencies version
- Updated dependencies
  - @glasshouse/utils@0.2.4

## 0.4.0

### Minor Changes

- feat(grid): refactor grid to use mantine core utilities and theming, moving away from using tailwind

## 0.3.16

### Patch Changes

- - Update logic for "Select All" option
  - Auto focus on text area input when editing a cell

## 0.3.15

### Patch Changes

- chore: some updates for Select

## 0.3.14

### Patch Changes

- components

## 0.3.13

### Patch changes

- Fix input height when multiselect mode is text and floating input is set to true

## 0.3.12

### Patch Changes

- Fix issue: Select dropdown is closed when clicking 'Add new' option

## 0.3.11

### Patch Changes

- update combobox

## 0.3.10

### Patch Changes

- feat(components): pass Autocomplete's original query data to onOptionSubmit

## 0.3.9

### Patch Changes

- feat(components): pass Autocomplete's options to onOptionSubmit

## 0.3.8

### Patch Changes

- Hide text container if there is no value

## 0.3.7

### Patch Changes

- Additional props for multiselect for changing value display mode, floating search input, values line clamp

## 0.3.6

### Patch Changes

- Tweak dropdown option active style

## 0.3.5

### Patch Changes

- - Add option to select all in MultiSelect component

## 0.3.4

### Patch Changes

- - Add missing props to Cell Edit component

## 0.3.3

### Patch Changes

- - Export data-table styles

## 0.3.2

### Patch Changes

- - Add inline editing using text area
  - Add an option to trigger infinite loading by clicking a button
  - Export component data-table's types

## 0.3.1

### Patch Changes

- Add tsup loader for css modules compiling.

## 0.3.0

### Minor Changes

- Add gvs prefix to tailwind classes.

## 0.2.11

### Patch Changes

- Export grid types.

## 0.2.10

### Patch Changes

- Grid restrict responsive prop fallbacks.

## 0.2.9

### Patch Changes

- Compile and export tailwind styles

## 0.2.8

### Patch Changes

- fix(components): use internal useProps hook instead of mantine

## 0.2.7

### Patch Changes

- chore(components): add missing lodash.isfunction

## 0.2.6

### Patch Changes

- chore(components): restructure package.json

## 0.2.5

### Patch Changes

- fix(components): add 'use client' to combobox components entry point

## 0.2.4

### Patch Changes

- Update readme
- Updated dependencies
  - @glasshouse/utils@0.2.3

## 0.2.3

### Patch Changes

- Add missing exports.

## 0.2.2

### Patch Changes

- Update readme
- Updated dependencies
  - @glasshouse/utils@0.2.2

## 0.2.1

### Patch Changes

- Minor tweaks
- Updated dependencies
  - @glasshouse/utils@0.2.1

## 0.2.0

### Minor Changes

- `Grid` component.
  `Select` component.
  `MultiSelect` component.
  `Autocomplete` component.

### Patch Changes

- Updated dependencies
  - @glasshouse/utils@0.2.0

## 0.1.0

### Minor Changes

- List component
- DataList component
- DataTable component

### Patch Changes

- Updated dependencies
  - @glasshouse/utils@0.1.0
