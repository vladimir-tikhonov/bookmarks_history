import * as React from 'react';

import { BookmarkMovedV1 } from 'scripts/events';

interface IBookmarkMovedProps {
    event: BookmarkMovedV1;
}

export default function BookmarkMoved({ event }: IBookmarkMovedProps) {
    return (
        <div>
            <span>Event: BookmarkMoved</span>
            <span>Id: {event.getId()}</span>
            <span>Title: {event.info.title}</span>
            <span>Url: {event.info.url}</span>
        </div>
    );
}
