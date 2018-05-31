import { BookmarkMovedV1 } from 'scripts/events';

export function serialize(event: BookmarkMovedV1) {
    return {
        info: event.info,
        oldBranchInfo: event.oldBranchInfo,
        newBranchInfo: event.newBranchInfo,
        timestamp: event.timestamp,
    };
}

export function deserialize(payload: any) {
    return new BookmarkMovedV1(
        payload.info,
        payload.oldBranchInfo,
        payload.newBranchInfo,
        payload.timestamp,
    );
}
