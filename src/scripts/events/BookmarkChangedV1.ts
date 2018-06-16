import BaseEvent from './BaseEvent';
import { IBookmarkBasicInfo } from 'scripts/bookmarks';

export default class BookmarkChangedV1 extends BaseEvent {
    public static handle = 'BookmarkChangedV1';

    public constructor(
        public newInfo: IBookmarkBasicInfo,
        public oldInfo: IBookmarkBasicInfo,
        public branchInfo: IBookmarkBasicInfo[],
        public timestamp: number,
    ) {
        super();
    }

    public getHandle() {
        return BookmarkChangedV1.handle;
    }
}
