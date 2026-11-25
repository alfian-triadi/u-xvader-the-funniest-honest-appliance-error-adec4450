// The Funniest Honest Appliance Error — writes one original line to /output/entry.txt
// The machine is a washing machine, speaking in its own flat error-code voice:
// it confesses the fault (it ate a sock) and the joke lands on the surviving sock.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "ERROR E07: I ate one sock. The other is in the drum, alone, judging you. Do not open the door — it knows what you did.";

// Local gate: the scorer requires 1-200 UTF-8 characters, not only whitespace.
// Count code points, so multi-byte characters are counted as the scorer does.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200 || LINE.trim().length === 0) {
  throw new Error(
    `Line length ${charCount} is outside the 1-200 character gate.`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Self-check: what was written must be byte-identical to the line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line.");
}
console.log(`Wrote ${charCount} characters to /output/entry.txt`);
