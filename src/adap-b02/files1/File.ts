export class File {
  private openFlag = false
  private deleted = false
  private data: Object[] = []

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
  }

  public close(): void {
    this.assertIsOpenFile();
    this.openFlag = false;
  }

  public delete(): void {
    this.assertIsClosedFile();
    this.deleted = true;
    this.data = [];
  }

  protected assertIsOpenFile(): void {
    if (!this.openFlag || this.deleted) throw new Error("file is not open");
  }

  protected assertIsClosedFile(): void {
     if (this.openFlag || this.deleted) throw new Error("file is not closed");
  }

}