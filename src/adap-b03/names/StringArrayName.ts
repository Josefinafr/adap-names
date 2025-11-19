import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        super(delimiter ?? DEFAULT_DELIMITER);
        this.components = source.slice();
    }
    protected doClone(): Name {
        return new StringArrayName(this.components.slice(), this.delimiter);
    }

    public clone(): Name {
        return super.clone();
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

    public getComponent(i: number): string {
        this.assertIndexInRange(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertIndexInRange(i);
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        if (i < 0 || i > this.components.length) {
            throw new RangeError("Index out of range");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        this.assertIndexInRange(i);
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        super.concat(other);
    }

    private assertIndexInRange(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index out of range");
        }
    }
}