import { getBranch as getBookmarkBranch } from 'scripts/bookmarks';
import { BookmarkCreatedV1, BookmarkRemovedV1 } from 'scripts/events';
import { serialize as serializeEvent } from 'scripts/serialization';
import { append as appendToStorage } from 'scripts/storage';

chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.extension.getURL('history.html') });
});

chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {
    const branch = await getBookmarkBranch(bookmark.parentId);
    const event = new BookmarkCreatedV1(id, bookmark.title, Date.now(), branch);
    const serializedData = serializeEvent(event);
    return appendToStorage(serializedData);
});

chrome.bookmarks.onRemoved.addListener(async (id, removeInfo) => {
    const removedNode = removeInfo.node;
    const branch = await getBookmarkBranch(removeInfo.parentId);
    const event = new BookmarkRemovedV1(id, removedNode.title, Date.now(), branch);
    const serializedData = serializeEvent(event);
    return appendToStorage(serializedData);
});

chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
    window.console.log(['onChanged', id, changeInfo]);
});

chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
    window.console.log(['onMoved', id, moveInfo]);
});
