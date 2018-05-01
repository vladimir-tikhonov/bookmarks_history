import { BookmarkCreatedV1, BookmarkRemovedV1 } from 'scripts/events';
import * as bookmarkCreatedV1Serializer from './BookmarkCreatedV1Serializer';
import * as bookmarkRemovedV1Serializer from './BookmarkRemovedV1Serializer';

const HANDLE_TO_SERIALIZER = {
    [BookmarkCreatedV1.handle]: bookmarkCreatedV1Serializer,
    [BookmarkRemovedV1.handle]: bookmarkRemovedV1Serializer,
};

export function serialize(event: BookmarkCreatedV1 | BookmarkRemovedV1) {
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

export function deserialize(data: any) {
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
