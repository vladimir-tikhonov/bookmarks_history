import { BookmarkRemovedV1 } from 'scripts/events';

export function serialize(event: BookmarkRemovedV1) {
    return {
        id: event.id,
        title: event.title,
        timestamp: event.timestamp,
        branch: event.branch,
    };
}

export function deserialize(payload: any) {
    return new BookmarkRemovedV1(
        payload.id,
        payload.title,
        payload.timestamp,
        payload.branch,
    );
}
