#!/usr/bin/env bun
if (typeof Bun === "undefined" || !process.versions.bun) {
    throw new Error("This app needs to be executed with Bun.")
}
// id:assert-bun-runtime
// #tag: detection
// @see https://bun.sh/guides/util/detect-bun

(() => {
    const missing = ['fzf', 'less'].filter(exe => !Bun.which(exe))
    if (missing.length > 0) {
        throw new Error("Missing these executables: " + missing)
    }}
)()
// id:assert-executables

// id:closing
console.log("Thanks for using Serai!")
// #tag: message

Bun.spawn(['fzf', '--no-hscroll'])
