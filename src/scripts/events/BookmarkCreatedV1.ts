import { IBookmarkBranch } from 'scripts/bookmarks';

export default class BookmarkCreatedV1 {
    public static handle = 'BookmarkCreatedV1';

    public constructor(
        public id: string,
        public title: string,
        public timestamp: number,
        public branch: IBookmarkBranch,
    ) {}

    public getHandle() {
        return BookmarkCreatedV1.handle;
    }
}
