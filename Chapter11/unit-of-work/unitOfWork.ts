export class UnitOfWork {
    private newObjects: [] = [];
    private dirtyObjects: [] = [];
    private removedObjects: [] = [];

    public registerNew(obj: DomainObject) {
        this.newObjects.add(obj);
    }
}
