import { IBookmarkBranch } from 'scripts/bookmarks';

export default class BookmarkRemovedV1 {
    public static handle = 'BookmarkRemovedV1';

    public constructor(
        public id: string,
        public title: string,
        public timestamp: number,
        public branch: IBookmarkBranch,
    ) {}

    public getHandle() {
        return BookmarkRemovedV1.handle;
    }
}
