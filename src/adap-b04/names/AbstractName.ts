import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assert(
            delimiter.length === 1,
            "delimiter must be a single character"
        );

        this.delimiter = delimiter;

        this.assertInvariant();
    }

    public abstract clone(): Name;

    /*public clone(): Name {
        throw new Error("needs implementation or deletion");
    }*/

    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assert(
            delimiter.length === 1,
            "delimiter must be a single character"
        );

        this.assertInvariant();

        if (this.isEmpty()) {
            const result = "";
            MethodFailedException.assert(
                result.length === 0,
                "asString failed for empty name"
            );
            return result;
        }

        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            const maskedComponent = this.getComponent(i);
            parts.push(this.unescapeComponent(maskedComponent));
        }

        const result = parts.join(delimiter);

        const delimCount = (result.split(delimiter).length - 1);
        MethodFailedException.assert(
            delimCount === Math.max(0, this.getNoComponents() - 1),
            "asString produced wrong number of delimiters"
        );

        this.assertInvariant();
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        this.assertInvariant();

        if (this.isEmpty()) {
            const result = "";
            MethodFailedException.assert(
                result.length === 0,
                "asDataString failed for empty name"
            );
            return result;
        }

        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }

        const result = parts.join(DEFAULT_DELIMITER);

        this.assertInvariant();
        return result;
    }

    public isEqual(other: Name): boolean {
        IllegalArgumentException.assert(
            other != null,
            "other must not be null"
        );

        this.assertInvariant();

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
        const s: string = this.asDataString();
        let hashCode: number = 0;

        for (let i = 0; i < s.length; i++) {
            const c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }

        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        this.assertInvariant();
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        IllegalArgumentException.assert(
            other != null,
            "other must not be null"
        );

        this.assertInvariant();

        const oldNo = this.getNoComponents();
        const toAdd = other.getNoComponents();

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }

        MethodFailedException.assert(
            this.getNoComponents() === oldNo + toAdd,
            "concat failed to add all components"
        );

        this.assertInvariant();
    }

    // ---------- Helper ----------

    protected assertInvariant(): void {
        InvalidStateException.assert(
            this.delimiter.length === 1,
            "invalid delimiter length"
        );

        InvalidStateException.assert(
            this.getNoComponents() >= 0,
            "negative number of components"
        );
    }

    protected unescapeComponent(component: string): string {
        let result = "";
        for (let i = 0; i < component.length; i++) {
            const ch = component.charAt(i);
            if (ch === ESCAPE_CHARACTER && i + 1 < component.length) {
               i++;
                result += component.charAt(i);
            } else {
                result += ch;
            }
        }
        return result;
    }

}