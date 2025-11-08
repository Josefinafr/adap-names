import { StringArrayName } from "./names/StringArrayName";
import { StringName } from "./names/StringName";

function main(): void {
    console.log("=== TEST: StringArrayName ===");
    const name1 = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    console.log("asString():", name1.asString());
    console.log("asDataString():", name1.asDataString());
    console.log("getNoComponents():", name1.getNoComponents());
    console.log("getComponent(2):", name1.getComponent(2));

    name1.setComponent(1, "informatik");
    console.log("after setComponent:", name1.asString());

    name1.append("uni");
    console.log("after append:", name1.asString());

    name1.remove(0);
    console.log("after remove:", name1.asString());

    const other = new StringArrayName(["campus", "de"], ".");
    name1.concat(other);
    console.log("after concat:", name1.asString());

    console.log("\n=== TEST: StringName ===");
    const name2 = new StringName("oss.cs.fau.de", ".");
    console.log("asString():", name2.asString());
    console.log("asDataString():", name2.asDataString());
    console.log("getNoComponents():", name2.getNoComponents());
    console.log("getComponent(1):", name2.getComponent(1));

    name2.setComponent(2, "informatik");
    console.log("after setComponent:", name2.asString());

    name2.insert(4, "uni");
    console.log("after insert:", name2.asString());

    name2.remove(0);
    console.log("after remove:", name2.asString());

    const other2 = new StringName("campus.de", ".");
    name2.concat(other2);
    console.log("after concat:", name2.asString());
}

main();
