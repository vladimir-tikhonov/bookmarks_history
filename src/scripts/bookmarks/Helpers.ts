import bookmarksApi from './Api';

export type IBookmarkBranch = IBookmarkBranchEntry[];

interface IBookmarkBranchEntry {
    id: string;
    title: string;
}

export async function getBranch(nodeId: string | undefined) {
    const branch: IBookmarkBranch = [];

    let currentNodeId = nodeId;
    while (currentNodeId && currentNodeId !== '0') {
        const [parentNode] = await bookmarksApi.get(currentNodeId);
        branch.push({ id: parentNode.id, title: parentNode.title });
        currentNodeId = parentNode.parentId;
    }

    return branch;
}
