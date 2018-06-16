import BaseEvent from './BaseEvent';
import { IBookmarkBasicInfo } from 'scripts/bookmarks';

export default class BookmarkCreatedV1 extends BaseEvent {
    public static handle = 'BookmarkCreatedV1';

    public constructor(
        public info: IBookmarkBasicInfo,
        public branchInfo: IBookmarkBasicInfo[],
        public timestamp: number,
    ) {
        super();
    }

    public getHandle() {
        return BookmarkCreatedV1.handle;
    }
}
