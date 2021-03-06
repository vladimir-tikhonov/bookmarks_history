import {
    getBasicInfo,
    getBasicInfoById,
    getBranchBasicInfoByLeafId,
    getBasicInfoForTheEntireTree,
} from 'scripts/bookmarks';
import { BookmarkCreatedV1, BookmarkRemovedV1, BookmarkChangedV1, BookmarkMovedV1 } from 'scripts/events';
import { serializeEvent } from 'scripts/serialization';
import {
    appendEvent as appendEventToStorage,
    setTreeDump as setTreeDumpInStorage,
    getTreeDump as getTreeDumpFromStorage,
} from 'scripts/storage';

chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.extension.getURL('ui.html') });
});

chrome.bookmarks.onCreated.addListener(async (_newBookmarkId, newBookmarkNode) => {
    await dumpTheEntireBookmarkTree();
    const bookmarkInfo = await getBasicInfoById(newBookmarkNode.id);
    const branchInfo = await getBranchBasicInfoByLeafId(newBookmarkNode.parentId!);
    const event = new BookmarkCreatedV1(bookmarkInfo, branchInfo, Date.now());
    const serializedData = serializeEvent(event);
    return appendEventToStorage(serializedData);
});

chrome.bookmarks.onRemoved.addListener(async (_removedBookmarkId, removeInfo) => {
    await dumpTheEntireBookmarkTree();
    const bookmarkInfo = getBasicInfo(removeInfo.node);
    const branchInfo = await getBranchBasicInfoByLeafId(removeInfo.parentId);

    const event = new BookmarkRemovedV1(bookmarkInfo, branchInfo, Date.now());
    const serializedData = serializeEvent(event);
    return appendEventToStorage(serializedData);
});

chrome.bookmarks.onChanged.addListener(async (changedBookmarkId, _changeInfo) => {
    const treeDump = await getTreeDumpFromStorage();
    const previousBookmarkInfo = treeDump.find((oldBookmarkInfo) => oldBookmarkInfo.id === changedBookmarkId);
    if (!previousBookmarkInfo) {
        // tslint:disable-next-line no-console
        console.warn(`There is no data for the bookmark ${changedBookmarkId} in the dump.`);
        return;
    }
    await dumpTheEntireBookmarkTree();
    const bookmarkInfo = await getBasicInfoById(changedBookmarkId);
    const branchInfo = await getBranchBasicInfoByLeafId(bookmarkInfo.parentId!);

    const event = new BookmarkChangedV1(bookmarkInfo, previousBookmarkInfo, branchInfo, Date.now());
    const serializedData = serializeEvent(event);
    return appendEventToStorage(serializedData);
});

chrome.bookmarks.onMoved.addListener(async (id, moveInfo) => {
    const bookmarkInfo = await getBasicInfoById(id);
    const oldBranchInfo = await getBranchBasicInfoByLeafId(moveInfo.oldParentId);
    const newBranchInfo = await getBranchBasicInfoByLeafId(moveInfo.parentId);

    const event = new BookmarkMovedV1(bookmarkInfo, oldBranchInfo, newBranchInfo, Date.now());
    const serializedData = serializeEvent(event);
    return appendEventToStorage(serializedData);
});

async function dumpTheEntireBookmarkTree() {
    const bookmarkTreeInfo = await getBasicInfoForTheEntireTree();
    return setTreeDumpInStorage(bookmarkTreeInfo);
}

dumpTheEntireBookmarkTree();
