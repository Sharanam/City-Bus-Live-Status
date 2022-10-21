export default function getDateInFormat(date, options = {}) {
  if (options.counter) {
    return getTotalDays(date);
  }
  date = new Date(date);
  return /invalid/gi.test(date.toString())
    ? ""
    : date.toLocaleDateString("en-CA").toString().replace(/-/gi, "/");
}

function getTotalDays(date) {
  const formatter = new Intl.RelativeTimeFormat("en", {
    // style: "narrow",
    // numeric: "auto",
    // type: "integer",
    // localeMatcher: "best fit",
  });
  const diff = new Date() - new Date(date);
  let x = formatter.format(-diff / (1000 * 60 * 60 * 24), "day");
  if (!parseInt(x.split(" ")[0]))
    x = formatter.format(-diff / (1000 * 60 * 60), "hours");
  if (!parseInt(x.split(" ")[0]))
    x = formatter.format(-diff / (1000 * 60), "minutes");
  x = x.replace(/\.\d+/, "");
  return x;
}

export function toDateFrom(time) {
  let d = new Date();
  return new Date(d.toString().split(":")[0].slice(0, -2) + time);
}

export function toTimeFrom(date) {
  return new Date(date).toTimeString().slice(0, 8);
}