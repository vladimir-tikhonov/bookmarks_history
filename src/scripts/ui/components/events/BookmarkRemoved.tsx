import * as React from 'react';

import { BookmarkRemovedV1 } from 'scripts/events';

interface IBookmarkRemovedProps {
    event: BookmarkRemovedV1;
}

export default function BookmarkRemoved({ event }: IBookmarkRemovedProps) {
    return (
        <div>
            <span>Event: BookmarkRemoved</span>
            <span>Id: {event.getId()}</span>
            <span>Title: {event.info.title}</span>
            <span>Url: {event.info.url}</span>
        </div>
    );
}
