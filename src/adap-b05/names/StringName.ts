import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.computeNoComponents();
    }

    protected createEmptySameType(): Name {
        return new StringName("", this.delimiter);
    }

        protected splitComponents(): string[] {
        if (this.name === "") return [];
        return this.name.split(this.delimiter);
    }

    protected rebuildName(comps: string[]): void {
        this.name = comps.join(this.delimiter);
        this.noComponents = comps.length;
    }

    protected computeNoComponents(): number {
        if (this.name === "") return 0;
        return this.name.split(this.delimiter).length;
    }


    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        const comps = this.splitComponents();
        return comps.join(delimiter);
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

        for (let i = 0; i < this.name.length; i++) {
            hash = ((hash << 5) - hash) + this.name.charCodeAt(i);
            hash |= 0;
        }

        return hash;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        return this.splitComponents()[i];
    }

    public setComponent(i: number, c: string) {
        const comps = this.splitComponents();
        comps[i] = c;
        this.rebuildName(comps);
    }

    public insert(i: number, c: string) {
        const comps = this.splitComponents();
        comps.splice(i, 0, c);
        this.rebuildName(comps);
    }

    public append(c: string) {
        const comps = this.splitComponents();
        comps.push(c);
        this.rebuildName(comps);
    }

    public remove(i: number) {
        const comps = this.splitComponents();
        comps.splice(i, 1);
        this.rebuildName(comps);
    }

    public concat(other: Name): void {
        const comps = this.splitComponents();
        for (let i = 0; i < other.getNoComponents(); i++) {
            comps.push(other.getComponent(i));
        }
        this.rebuildName(comps);
    }

}