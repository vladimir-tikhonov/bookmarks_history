import { IBookmarkBasicInfo } from 'scripts/bookmarks';

export default class BookmarkRemovedV1 {
    public static handle = 'BookmarkRemovedV1';

    public constructor(
        public info: IBookmarkBasicInfo,
        public branchInfo: IBookmarkBasicInfo[],
        public timestamp: number,
    ) {}

    public getHandle() {
        return BookmarkRemovedV1.handle;
    }
}
