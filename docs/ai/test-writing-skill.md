# Hook Table Test-Writing Skill

Use this when adding tests in the hook-table repo.

## Framework and imports

- Import test helpers from `vite-plus/test`.
- Prefer `describe`, `it`, and `expect`; add `vi` only when mocking is needed.
- Do not import from `vitest` directly.

## File placement and naming

- Co-locate tests with the implementation.
- Use `*.test.ts` for utility tests.
- Mirror the source filename, for example `getCellValue.ts` to `getCellValue.test.ts`.

## Describe and test naming

- Prefer concise `describe` labels matching current style, usually `utils - <name>`.
- Test names should describe behavior, not implementation details.
- Keep one behavior per `it` block.

## Test structure

- Use inline Arrange-Act-Assert inside each test instead of shared fixtures unless repetition is substantial.
- Keep tests independent; avoid `beforeEach` unless it removes real duplication.
- Prefer small literal inputs declared inside the test.
- Never use type casting in new tests.

## Assertion style used in this repo

- Use `toBe` for primitives and identity-like expectations.
- Use `toEqual` for arrays and plain objects.
- Use `toThrow` with the exact message when public errors are intentional.
- For spies or mocks, use `vi.fn(...)` and assert calls with `toHaveBeenCalledWith`.

## Coverage expectations from existing tests

- Cover the happy path first.
- Add edge cases for empty input, nullish values, and unsupported runtime inputs.
- For defensive utility functions, prefer inputs that satisfy the declared types naturally; if a guard cannot be exercised without a cast, do not add that case.
- When the function accepts React elements, use `createElement` directly instead of render helpers unless DOM behavior is actually under test.

## Style constraints

- Keep tests minimal and explicit.
- Avoid snapshots.
- Avoid overly broad table-driven tests when 3 to 6 explicit cases are clearer.
- Match the existing formatting and assertion granularity in nearby tests.
- Run `vp fmt` on newly created test files before finalizing them.

## Validation workflow

- After writing tests, run the narrowest relevant test file first.
- Run a typecheck that includes the new tests, and fix any errors before finishing.
- In this repo, prefer `vp test <path>` when a single file can be targeted; otherwise run `vp test`.
- Prefer a narrow typecheck when possible, otherwise use `vp run tsc --noEmit`.
- If behavior is ambiguous, check a neighboring test before introducing a new pattern.

## Local examples from this repo

- `getCellValue.test.ts`: exact thrown-message assertions, `vi.fn`, primitive versus invalid input coverage.
- `getChildrenProps.test.ts`: inline React `createElement` setup and array filtering assertions.
- `compact.test.ts`: runtime invalid-input coverage, but do not copy its cast-based pattern into new tests.
- `deepGet.test.ts`: multiple explicit path-shape cases instead of parameterized tests.
