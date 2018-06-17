import * as React from 'react';

import { IBookmarkBasicInfo } from 'scripts/bookmarks';

interface IBookmarkLocationProps {
    location: IBookmarkBasicInfo[];
}

function getLocationUrl(elementInfo: IBookmarkBasicInfo) {
    return `chrome://bookmarks/?id=${elementInfo.id}`;
}

function renderLocationElement(elementInfo: IBookmarkBasicInfo, isLastElement: boolean) {
    return (
        <React.Fragment key={elementInfo.id}>
            <a href={getLocationUrl(elementInfo)}>{elementInfo.title}</a>
            {!isLastElement && <span className="separator"> / </span>}
        </React.Fragment>
    );
}

export default function BookmarkLocation({ location }: IBookmarkLocationProps) {
    return (
        <span className="bookmark-path">
            {location.map((pathElement, i) => renderLocationElement(pathElement, i === location.length - 1))}
        </span>
    );
}
