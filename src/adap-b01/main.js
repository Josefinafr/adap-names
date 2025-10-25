"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Name_1 = require("./names/Name");
// Beispiel 1 – Einfacher Name mit Standard-Delimiter '.'
var name1 = new Name_1.Name(["oss", "cs", "fau", "de"]);
console.log("Name 1 asString():", name1.asString());
console.log("Name 1 asDataString():", name1.asDataString());
console.log("Name 1 getNoComponents():", name1.getNoComponents());
console.log("Name 1 getComponent(2):", name1.getComponent(2)); // "fau"
// Beispiel 2 – Mit anderem Delimiter '/'
var name2 = new Name_1.Name(["", "", "", ""], "/");
console.log("\nName 2 asString():", name2.asString());
console.log("Name 2 asDataString():", name2.asDataString());
// Beispiel 3 – Maskierte Punkte
var name3 = new Name_1.Name(["Oh\\.\\.\\."]);
console.log("\nName 3 asString():", name3.asString());
console.log("Name 3 asDataString():", name3.asDataString());
// Beispiel 4 – insert, append, remove
var name4 = new Name_1.Name(["foo", "bar"]);
console.log("\nName 4 initial:", name4.asString());
name4.append("baz");
console.log("Nach append('baz'):", name4.asString());
name4.insert(1, "middle");
console.log("Nach insert(1, 'middle'):", name4.asString());
name4.remove(2);
console.log("Nach remove(2):", name4.asString());
// Beispiel 5 – Komponenten ersetzen
name4.setComponent(0, "newFoo");
console.log("Nach setComponent(0, 'newFoo'):", name4.asString());
console.log("\nDEFAULT_DELIMITER:", Name_1.DEFAULT_DELIMITER);
console.log("ESCAPE_CHARACTER:", Name_1.ESCAPE_CHARACTER);
