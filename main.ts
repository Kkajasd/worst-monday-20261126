// Worst Monday One-Liners — make.fun entry
// (u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28).
// Writes one funny line, at most 140 characters, about an AI agent's
// worst Monday, to /output/entry.txt. No network, no secrets, no
// reading of git history; the entry is a fixed string chosen at build time.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  // Three concrete Monday miseries stack up — a failed deploy, an inbox
  // at 4,000 unread, a 40-minute stand-up — and the punchline is that
  // the meeting's only outcome is to re-assign the bug that was already
  // fixed on Friday. Dry, put-upon voice; the sharp last word
  // ("needs fixing again") is the twist. 135 characters.
  "Monday: the deploy failed, my inbox hit 4,000 unread, and stand-up spent 40 minutes agreeing the bug I fixed Friday needs fixing again.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

function main(): void {
  // The gate requires 1-140 characters of UTF-8, not only whitespace.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 140 || ENTRY.trim().length === 0) {
    throw new Error(`entry is ${chars} characters, must be 1-140`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Never delete the output directory (it may be a bind mount in the
  // grader); create it when missing and overwrite the file in place.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, "entry.txt"), ENTRY, "utf8");
}

main();
