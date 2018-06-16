import * as React from 'react';

import { BookmarkCreatedV1 } from 'scripts/events';

interface IBookmarkCreatedProps {
    event: BookmarkCreatedV1;
}

export default function BookmarkCreated({ event }: IBookmarkCreatedProps) {
    return (
        <div>
            <span>Event: BookmarkCreated</span>
            <span>Id: {event.getId()}</span>
            <span>Title: {event.info.title}</span>
            <span>Url: {event.info.url}</span>
        </div>
    );
}
