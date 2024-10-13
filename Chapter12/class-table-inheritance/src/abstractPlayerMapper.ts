export abstract class AbstractPlayerMapper {
    abstract get typeCode(): string;

    protected static TABLENAME: string = "Players";
}
