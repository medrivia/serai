#!/usr/bin/env bun
if (typeof Bun === "undefined" || !process.versions.bun) {
  throw new Error("This app needs to be executed with Bun.");
}
// id:assert-bun-runtime
// #tag: detection
// @see https://bun.sh/guides/util/detect-bun
//
import path from "node:path";
import readline from "node:readline";

const exit = () => {
  console.log("Closing...");
  process.exit(0);
};
process.on("SIGINT", () => {
    // exit()
});

(() => {
  const missing = ["fzf", "less"].filter((exe) => !Bun.which(exe));
  if (missing.length > 0) {
    throw new Error("Missing these executables: " + missing);
  }
})();
// id:assert-executables

// id:closing
console.log("Thanks for using Serai!");
// #tag: message

// Bun.spawn(['fzf', '--no-hscroll'])

console.log(Bun.env.PWD)

const setPrompt = async () => {
    // @see https://bun.sh/guides/process/stdin
    const prompt = "Type something: ";
    process.stdout.write(prompt);
    for await (const line of console) {
        console.log(`You typed: ${line}`);
        process.stdout.write(prompt);
    }
}
process.stdin.setRawMode(true)
const DIR = import.meta.dir;
const MAN_DIR = path.join(DIR.slice(0, DIR.lastIndexOf("/bin")), "man");
const MAN_FILE = path.join(MAN_DIR, "man1/serai.1");
console.log(MAN_FILE);

const pager = Bun.spawn(["man", MAN_FILE], { stdout: 'inherit' });
await pager.exited
process.stdin.setRawMode(false)
