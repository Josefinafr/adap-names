import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.setDelimiter(delimiter);
    }

    protected setDelimiter(delimiter: string): void {
        if (delimiter == null || delimiter == undefined || delimiter.length !== 1) {
            throw new RangeError("Delimiter must be a single character");
        }
        if (delimiter === ESCAPE_CHARACTER) {
            throw new RangeError("Delimiter must not be the escape character");
        }
        this.delimiter = delimiter;
    }

    protected abstract doClone(): Name;
    public clone(): Name {
        return this.doClone();
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter == null || delimiter == undefined || delimiter.length !== 1) {
            throw new RangeError("Delimiter must be a single character");
        }

        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return parts.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.escapeComponent(this.getComponent(i)));
        }
        return parts.join(DEFAULT_DELIMITER);
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

    protected escapeComponent(component: string): string {
        let result = "";
        for (let i = 0; i < component.length; i++) {
            const ch = component.charAt(i);
            if (ch === ESCAPE_CHARACTER || ch === DEFAULT_DELIMITER) {
                result += ESCAPE_CHARACTER;
            }
            result += ch;
        }
        return result;
    }

    protected parseDataString(data: string): string[] {
        const components: string[] = [];
        let current = "";
        let escaping = false;

        for (let i = 0; i < data.length; i++) {
            const ch = data.charAt(i);
            if (escaping) {
                current += ch;
                escaping = false;
            } else if (ch === ESCAPE_CHARACTER) {
                escaping = true;
            } else if (ch === DEFAULT_DELIMITER) {
                components.push(current);
                current = "";
            } else {
                current += ch;
            }
        }
        components.push(current);
        return components;
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i: number = 0; i < s.length; i++) {
            const c: number = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
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
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}