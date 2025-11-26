import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);

        IllegalArgumentException.assert(
            source !== null && source !== undefined,
            "source must not be null or undefined"
        );

        this.name = source;

        const components = this.parseComponents();
        this.noComponents = components.length;

        this.assertInvariant();
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
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
        return this.noComponents;
    }

    //------------------------------------------------------------------

    protected parseComponents(): string[] {
        if (this.name.length === 0) {
            return [];
        }

        const result: string[] = [];
        let current = "";

        for (let i = 0; i < this.name.length; i++) {
            const ch = this.name.charAt(i);

            if (ch === ESCAPE_CHARACTER && i + 1 < this.name.length) {
                // Escape-Zeichen bleibt Teil der Komponente – Komponenten bleiben "maskiert"
                const nextCh = this.name.charAt(i + 1);
                current += ESCAPE_CHARACTER + nextCh;
                i++;
            } else if (ch === this.delimiter) {
                result.push(current);
                current = "";
            } else {
                current += ch;
            }
        }

        result.push(current);
        return result;
    }

    protected updateFromComponents(components: string[]): void {
        this.noComponents = components.length;
        // Komponenten sind bereits korrekt maskiert – einfach zusammenfügen
        this.name = components.join(this.delimiter);
        this.assertInvariant();
    }

    protected assertValidIndex(i: number, allowEnd: boolean = false): void {
        const upper = allowEnd ? this.noComponents : this.noComponents - 1;
        IllegalArgumentException.assert(
            Number.isInteger(i) && i >= 0 && i <= upper,
            "index out of range"
        );
    }

    //------------------------------------------------------------------

    public getComponent(i: number): string {
        const components = this.parseComponents();
        this.assertValidIndex(i, false);
        return components[i];
    }

    public setComponent(i: number, c: string) {
        const components = this.parseComponents();
        this.assertValidIndex(i, false);
        IllegalArgumentException.assert(
            typeof c === "string",
            "component must be a string"
        );

        components[i] = c;
        this.updateFromComponents(components);

        MethodFailedException.assert(
            this.getComponent(i) === c,
            "setComponent failed"
        );
    }

    public insert(i: number, c: string) {
        const components = this.parseComponents();
        const oldNo = components.length;

        this.assertValidIndex(i, true);
        IllegalArgumentException.assert(
            typeof c === "string",
            "component must be a string"
        );

        components.splice(i, 0, c);
        this.updateFromComponents(components);

        MethodFailedException.assert(
            this.getNoComponents() === oldNo + 1,
            "insert did not increase component count"
        );
    }

    public append(c: string) {
        const components = this.parseComponents();
        const oldNo = components.length;

        IllegalArgumentException.assert(
            typeof c === "string",
            "component must be a string"
        );

        components.push(c);
        this.updateFromComponents(components);

        MethodFailedException.assert(
            this.getNoComponents() === oldNo + 1,
            "append did not increase component count"
        );
    }

    public remove(i: number) {
        const components = this.parseComponents();
        const oldNo = components.length;

        this.assertValidIndex(i, false);

        components.splice(i, 1);
        this.updateFromComponents(components);

        MethodFailedException.assert(
            this.getNoComponents() === oldNo - 1,
            "remove did not decrease component count"
        );
    }

    public concat(other: Name): void {
        super.concat(other);
    }

}