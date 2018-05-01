import { BookmarkCreatedV1 } from 'scripts/events';

export function serialize(event: BookmarkCreatedV1) {
    return {
        id: event.id,
        title: event.title,
        timestamp: event.timestamp,
        branch: event.branch,
    };
}

export function deserialize(payload: any) {
    return new BookmarkCreatedV1(
        payload.id,
        payload.title,
        payload.timestamp,
        payload.branch,
    );
}
