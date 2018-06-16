import uuidGenerator from 'uuid/v4';

export default class BaseEvent {
    private uuid: string;

    public constructor() {
        this.uuid = uuidGenerator();
    }

    public getId() {
        return this.uuid;
    }
}
