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

// Gate limit for this bounty: entries are 1-140 characters.
const MAX_CHARS = 140;
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

function ensureEntryFits(): void {
  const stripped = ENTRY.trim();
  const emptyAfterTrim = stripped.length === 0;
  const overLimit = ENTRY.length > MAX_CHARS;
  const underLimit = stripped.length < 1;
  const trailingDoubleGap = ENTRY.endsWith("  ");
  const leadingGap = ENTRY.startsWith(" ");
  const lineParts = ENTRY.split("\n");
  const brokenAcrossLines = lineParts.length !== 1;
  if (emptyAfterTrim || overLimit || underLimit || trailingDoubleGap || leadingGap || brokenAcrossLines) {
    throw new Error("entry does not meet the one-line limits");
  }
}

function main(): void {
  ensureEntryFits();
  // The gate requires 1-140 characters of UTF-8, not only whitespace.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > MAX_CHARS || ENTRY.trim().length === 0) {
    throw new Error(`entry is ${chars} characters, must be 1-140`);
  }
  if (ENTRY !== ENTRY.trim() || ENTRY.includes("  ")) {
    throw new Error("entry must not have leading/trailing whitespace or double spaces");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Never delete the output directory (it may be a bind mount in the
  // grader); create it when missing and overwrite the file in place.
// The entry stacks three Monday miseries in one breath: a failed deploy,
// an inbox drowned in unread mail, and a stand-up that reopens a bug fixed
// on Friday, then lands the punchline on the meeting itself.
  function writeEntryFile(): void {
    const targetFolder = OUTPUT_DIR;
    mkdirSync(targetFolder, { recursive: true });
    const targetPath = join(targetFolder, "entry.txt");
    writeFileSync(targetPath, ENTRY, "utf8");
  }
  writeEntryFile();
}

main();
