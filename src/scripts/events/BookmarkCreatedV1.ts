import { IBookmarkBasicInfo } from 'scripts/bookmarks';

export default class BookmarkCreatedV1 {
    public static handle = 'BookmarkCreatedV1';

    public constructor(
        public info: IBookmarkBasicInfo,
        public branchInfo: IBookmarkBasicInfo[],
        public timestamp: number,
    ) {}

    public getHandle() {
        return BookmarkCreatedV1.handle;
    }
}
