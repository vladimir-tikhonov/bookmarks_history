import chromep from 'chrome-promise';

const ROOT_NODE_ID = '0';

export interface IBookmarkBasicInfo {
    id: string;
    title: string;
    url?: string;
    parentId?: string;
    isFolder: boolean;
}

export function getBasicInfo(bookmarkNode: chrome.bookmarks.BookmarkTreeNode): IBookmarkBasicInfo {
    return {
        id: bookmarkNode.id,
        title: bookmarkNode.title,
        url: bookmarkNode.url,
        parentId: bookmarkNode.parentId,
        isFolder: !bookmarkNode.url,
    };
}

export async function getBasicInfoById(bookmarkNodeId: string) {
    const bookmarkNode = await getBookmarkNodeById(bookmarkNodeId);
    return getBasicInfo(bookmarkNode);
}

export async function getBranchBasicInfoByLeafId(leafNodeId: string) {
    const branch: IBookmarkBasicInfo[] = [];

    let currentNodeId = leafNodeId;
    while (true) {
        const currentNode = await getBookmarkNodeById(currentNodeId);
        branch.push(getBasicInfo(currentNode));
        if (!currentNode.parentId || currentNode.parentId === ROOT_NODE_ID) {
            break;
        }

        currentNodeId = currentNode.parentId;
    }

    return branch;
}

export async function getBasicInfoForTheEntireTree() {
    const [rootNode] = await chromep.bookmarks.getTree();
    const allNodes = flattenBookmarkTree(rootNode);

    return allNodes.map((bookmarkNode) => getBasicInfo(bookmarkNode));
}

async function getBookmarkNodeById(bookmarkNodeId: string) {
    const [bookmarkNode] = await chromep.bookmarks.get(bookmarkNodeId);
    return bookmarkNode;
}

function flattenBookmarkTree(rootNode: chrome.bookmarks.BookmarkTreeNode) {
    if (!rootNode.children) {
        return [rootNode];
    }

    const result = [rootNode];
    for (const childNode of rootNode.children) {
        result.push(...flattenBookmarkTree(childNode));
    }

    return result;
}
