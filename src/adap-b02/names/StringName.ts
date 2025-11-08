import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if (typeof source !== "string") throw new TypeError("Invalid source");
        if (delimiter) this.delimiter = delimiter;
        this.name = source;
        this.noComponents = this.split(source).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter === this.delimiter) return this.name;
        const comps = this.split(this.name);
        return comps.join(delimiter);
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        const comps = this.split(this.name);
        if (x < 0 || x >= comps.length) throw new RangeError("Index out of bounds");
        return comps[x];
    }

    public setComponent(n: number, c: string): void {
        const comps = this.split(this.name);
        if (n < 0 || n >= comps.length) throw new RangeError("Index out of bounds");
        comps[n] = c;
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    public insert(n: number, c: string): void {
        const comps = this.split(this.name);
        if (n < 0 || n > comps.length) throw new RangeError("Index out of bounds");
        comps.splice(n, 0, c);
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    public append(c: string): void {
        const comps = this.split(this.name);
        comps.push(c);
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    public remove(n: number): void {
        const comps = this.split(this.name);
        if (n < 0 || n >= comps.length) throw new RangeError("Index out of bounds");
        comps.splice(n, 1);
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    public concat(other: Name): void {
        const comps = this.split(this.name);
        for (let i = 0; i < other.getNoComponents(); i++) {
            comps.push(other.getComponent(i));
        }
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    private split(s: string): string[] {
        if (s.length === 0) return [];
        const result: string[] = [];
        let current = "";
        let i = 0;
        while (i < s.length) {
            const ch = s[i];
            if (ch === ESCAPE_CHARACTER && i + 1 < s.length) {
                current += s[i + 1];
                i += 2;
            } else if (ch === this.delimiter) {
                result.push(current);
                current = "";
                i++;
            } else {
                current += ch;
                i++;
            }
        }
        result.push(current);
        return result;
    }

}