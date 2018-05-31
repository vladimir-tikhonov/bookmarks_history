import { IBookmarkBasicInfo } from 'scripts/bookmarks';

export default class BookmarkMovedV1 {
    public static handle = 'BookmarkMovedV1';

    public constructor(
        public info: IBookmarkBasicInfo,
        public oldBranchInfo: IBookmarkBasicInfo[],
        public newBranchInfo: IBookmarkBasicInfo[],
        public timestamp: number,
    ) {}

    public getHandle() {
        return BookmarkMovedV1.handle;
    }
}
