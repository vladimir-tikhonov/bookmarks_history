import BaseEvent from './BaseEvent';
import { IBookmarkBasicInfo } from 'scripts/bookmarks';

export default class BookmarkRemovedV1 extends BaseEvent {
    public static handle = 'BookmarkRemovedV1';

    public constructor(
        public info: IBookmarkBasicInfo,
        public branchInfo: IBookmarkBasicInfo[],
        public timestamp: number,
    ) {
        super();
    }

    public getHandle() {
        return BookmarkRemovedV1.handle;
    }
}
