import { BookmarkChangedV1 } from 'scripts/events';

export function serialize(event: BookmarkChangedV1) {
    return {
        newInfo: event.newInfo,
        oldInfo: event.oldInfo,
        branchInfo: event.branchInfo,
        timestamp: event.timestamp,
    };
}

export function deserialize(payload: any) {
    return new BookmarkChangedV1(
        payload.newInfo,
        payload.oldInfo,
        payload.branchInfo,
        payload.timestamp,
    );
}
