import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter.length !== 1) {
            throw new Error("Delimiter must be a single character");
        }
        this.delimiter = delimiter;
    }

    public clone(): Name {
        const copy = this.createEmptySameType();
        for (let i = 0; i < this.getNoComponents(); i++) {
            copy.append(this.getComponent(i));
        }
        return copy;
    }

    protected abstract createEmptySameType(): Name;

    public asString(delimiter: string = this.delimiter): string {
        const comps: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            comps.push(this.getComponent(i));
        }
        return comps.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }

        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }

        return true;
    }

    public getHashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.getNoComponents(); i++) {
            const comp = this.getComponent(i);
            for (let j = 0; j < comp.length; j++) {
                hash = ((hash << 5) - hash) + comp.charCodeAt(j);
                hash |= 0; // force into 32bit
            }
        }
        return hash;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        const n = other.getNoComponents();
        for (let i = 0; i < n; i++) {
            this.append(other.getComponent(i));
        }
    }

}