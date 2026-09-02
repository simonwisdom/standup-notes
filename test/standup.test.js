import test from "node:test";
import assert from "node:assert/strict";
import { parseStandup, summarize } from "../src/standup.js";

test("parses the three standard sections", () => {
  const result = parseStandup(`Done:\n- shipped login\nNext:\n- write docs\nBlocked:\n- waiting on API key`);
  assert.deepEqual(result, {
    done: ["shipped login"],
    next: ["write docs"],
    blocked: ["waiting on API key"],
  });
});

test("ignores lines outside a section", () => {
  const result = parseStandup(`hello team\nDone:\n- a`);
  assert.deepEqual(result.done, ["a"]);
});

test("summarize counts across entries", () => {
  const totals = summarize([
    { done: ["a", "b"], next: [], blocked: ["c"] },
    { done: [], next: ["d"], blocked: [] },
  ]);
  assert.deepEqual(totals, { done: 2, next: 1, blocked: 1 });
});

test("accepts headings with asterisks or trailing spaces", () => {
  const result = parseStandup(`**Done:**\n- a\n**Blocked:**  \n- b`);
  assert.deepEqual(result, { done: ["a"], next: [], blocked: ["b"] });
});
