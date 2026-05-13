---
'@glasshouse/components': patch
---

Fix React 19 `forwardRef` warning in `Select` and properly forward `ref` to the DOM.

`SelectBaseComponent`'s render function only accepted `props`, which triggered React 19's "forwardRef render functions accept exactly two parameters: props and ref" warning. The consumer's `ref` was also being silently dropped — never reaching the underlying `InputBase` — despite the public type advertising `RefAttributes<HTMLInputElement>`.

- `SelectBaseComponent` now accepts `(props, ref)` and uses `useMergedRef` to combine the forwarded ref with the internal `inputRef` used for `.focus()`, wiring it to both the searchable input and the non-searchable button branches.
- The `Select` dispatcher now also forwards `ref` through the `SelectWithQuery` and `SelectWithInfiniteQuery` branches (previously dropped when `queryOptions`/`infinite` was used).
