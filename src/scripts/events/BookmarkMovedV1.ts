import BaseEvent from './BaseEvent';
import { IBookmarkBasicInfo } from 'scripts/bookmarks';

export default class BookmarkMovedV1 extends BaseEvent {
    public static handle = 'BookmarkMovedV1';

    public constructor(
        public info: IBookmarkBasicInfo,
        public oldBranchInfo: IBookmarkBasicInfo[],
        public newBranchInfo: IBookmarkBasicInfo[],
        public timestamp: number,
    ) {
        super();
    }

    public getHandle() {
        return BookmarkMovedV1.handle;
    }
}
