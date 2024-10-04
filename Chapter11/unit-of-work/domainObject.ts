import {UnitOfWork} from "./unitOfWork";

class DomainObject {
    protected markNew(): void {
        UnitOfWork.getCurrent().registerNew(this);
    }
}
