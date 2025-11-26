import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);

        IllegalArgumentException.assert(
            Array.isArray(source),
            "source must be an array"
        );

        this.components = [];
        for (const c of source) {
            IllegalArgumentException.assert(
                typeof c === "string",
                "components must be strings"
            );
            this.components.push(c);
        }

        this.assertInvariant();
    }

    public clone(): Name {
        return new StringArrayName(this.components.slice(), this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return super.asString(delimiter);
    }

    public asDataString(): string {
        return super.asDataString();
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other);
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    protected assertValidIndex(i: number, allowEnd: boolean = false): void {
        const upper = allowEnd ? this.components.length : this.components.length - 1;
        IllegalArgumentException.assert(
            Number.isInteger(i) && i >= 0 && i <= upper,
            "index out of range"
        );
    }

    public getComponent(i: number): string {
        this.assertValidIndex(i, false);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertValidIndex(i, false);
        IllegalArgumentException.assert(
            typeof c === "string",
            "component must be a string"
        );

        this.components[i] = c;
        this.assertInvariant();

        // Postcondition: Komponente wurde gesetzt
        MethodFailedException.assert(
            this.components[i] === c,
            "setComponent failed"
        );
    }

    public insert(i: number, c: string) {
        const oldNo = this.getNoComponents();

        this.assertValidIndex(i, true);
        IllegalArgumentException.assert(
            typeof c === "string",
            "component must be a string"
        );

        this.components.splice(i, 0, c);
        this.assertInvariant();

        MethodFailedException.assert(
            this.getNoComponents() === oldNo + 1,
            "insert did not increase component count"
        );
    }

    public append(c: string) {
        const oldNo = this.getNoComponents();

        IllegalArgumentException.assert(
            typeof c === "string",
            "component must be a string"
        );

        this.components.push(c);
        this.assertInvariant();

        MethodFailedException.assert(
            this.getNoComponents() === oldNo + 1,
            "append did not increase component count"
        );
    }

    public remove(i: number) {
        const oldNo = this.getNoComponents();

        this.assertValidIndex(i, false);

        this.components.splice(i, 1);
        this.assertInvariant();

        MethodFailedException.assert(
            this.getNoComponents() === oldNo - 1,
            "remove did not decrease component count"
        );
    }

    public concat(other: Name): void {
        super.concat(other);
    }
}