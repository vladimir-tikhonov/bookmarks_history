import { BookmarkRemovedV1 } from 'scripts/events';

export function serialize(event: BookmarkRemovedV1) {
    return {
        info: event.info,
        branchInfo: event.branchInfo,
        timestamp: event.timestamp,
    };
}

export function deserialize(payload: any) {
    return new BookmarkRemovedV1(
        payload.info,
        payload.branchInfo,
        payload.timestamp,
    );
}
