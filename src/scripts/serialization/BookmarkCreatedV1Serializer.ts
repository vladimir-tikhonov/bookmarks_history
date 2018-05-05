import { BookmarkCreatedV1 } from 'scripts/events';

export function serialize(event: BookmarkCreatedV1) {
    return {
        info: event.info,
        branchInfo: event.branchInfo,
        timestamp: event.timestamp,
    };
}

export function deserialize(payload: any) {
    return new BookmarkCreatedV1(
        payload.info,
        payload.branchInfo,
        payload.timestamp,
    );
}
