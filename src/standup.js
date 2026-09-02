export function parseStandup(text) {
  const sections = { done: [], next: [], blocked: [] };
  let current = null;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const heading = line.toLowerCase().replace(/:$/, "");
    if (heading in sections) {
      current = heading;
      continue;
    }
    if (current && line.startsWith("-")) sections[current].push(line.slice(1).trim());
  }
  return sections;
}

export function summarize(entries) {
  const totals = { done: 0, next: 0, blocked: 0 };
  for (const entry of entries) {
    totals.done += entry.done.length;
    totals.next += entry.next.length;
    totals.blocked += entry.blocked.length;
  }
  return totals;
}
