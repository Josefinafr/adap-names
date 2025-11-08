import { File } from "./File";

export class ObjFile implements File {

  protected data: Object[] = [];
  protected length: number = 0;
  private openFlag = false
  private deleted = false

  public isEmpty(): boolean {
    return this.length == 0;
  }

  public isOpen(): boolean {
    return this.openFlag && !this.deleted;
  }

  public isClosed(): boolean {
    return !this.openFlag && !this.deleted;
  }

  public open(): void {
    this.assertIsClosedFile();
    this.openFlag = true;
  }

  public read(): Object[] {
    this.assertIsOpenFile();
    return [...this.data];
  }

  public write(data: Object[]): void {
    this.assertIsOpenFile();
    this.data.push(...data);
    this.length = this.data.length;
  }

  public close(): void {
    this.assertIsOpenFile();
    this.openFlag = false;
  }

  public delete(): void {
    this.assertIsClosedFile();
    this.deleted = true;
    this.data = [];
    this.length = 0;
  }

  protected assertIsOpenFile(): void {
    if (!this.openFlag || this.deleted) throw new Error("file is not open");
  }

  protected assertIsClosedFile(): void {
    if (this.openFlag || this.deleted) throw new Error("file is not closed");
  }

}