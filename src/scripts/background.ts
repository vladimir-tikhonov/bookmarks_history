chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.extension.getURL('history.html') });
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    window.console.log(['onCreated', id, bookmark]);
});

chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
    window.console.log(['onRemoved', id, removeInfo]);
});

chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
    window.console.log(['onChanged', id, changeInfo]);
});

chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
    window.console.log(['onMoved', id, moveInfo]);
});

chrome.bookmarks.onChildrenReordered.addListener((id, reorderInfo) => {
    window.console.log(['onChildrenReordered', id, reorderInfo]);
});
