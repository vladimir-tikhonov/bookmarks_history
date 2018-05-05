import { BookmarkCreatedV1, BookmarkRemovedV1, BookmarkChangedV1 } from 'scripts/events';
import * as bookmarkCreatedV1Serializer from './BookmarkCreatedV1Serializer';
import * as bookmarkRemovedV1Serializer from './BookmarkRemovedV1Serializer';
import * as bookmarkChangedV1Serializer from './BookmarkChangedV1Serializer';

type SerializableEvent = BookmarkCreatedV1 | BookmarkRemovedV1 | BookmarkChangedV1;
interface ISerializer {
    serialize(event: SerializableEvent): object;
    deserialize(data: object): SerializableEvent;
}

interface ISerializedEvent {
    eventHandle: string;
    payload: any;
}

const HANDLE_TO_SERIALIZER: Record<string, ISerializer> = {
    [BookmarkCreatedV1.handle]: bookmarkCreatedV1Serializer,
    [BookmarkRemovedV1.handle]: bookmarkRemovedV1Serializer,
    [BookmarkChangedV1.handle]: bookmarkChangedV1Serializer,
};

export function serializeEvent(event: SerializableEvent): ISerializedEvent {
    const eventHandle = event.getHandle();
    const serializer = HANDLE_TO_SERIALIZER[eventHandle];
    if (!serializer) {
        throw new Error(`Unknown eventHandle: ${eventHandle}.`);
    }

    return {
        eventHandle,
        payload: serializer.serialize(event),
    };
}

export function deserializeEvent(data: ISerializedEvent) {
    const { eventHandle, payload } = data;
    if (!eventHandle || !payload) {
        throw new Error(`Corrupted data: ${JSON.stringify(data)}.`);
    }

    const serializer = HANDLE_TO_SERIALIZER[eventHandle];
    if (!serializer) {
        throw new Error(`Unknown eventHandle: ${eventHandle}.`);
    }

    return serializer.deserialize(payload);
}
