import * as React from 'react';

import { BookmarkChangedV1 } from 'scripts/events';

interface IBookmarkChangedProps {
    event: BookmarkChangedV1;
}

export default function BookmarkChanged({ event }: IBookmarkChangedProps) {
    return (
        <div>
            <span>Event: BookmarkChanged</span>
            <span>Id: {event.getId()}</span>
            <span>Old title: {event.oldInfo.title}</span>
            <span>Old url: {event.oldInfo.url}</span>
            <span>New title: {event.newInfo.title}</span>
            <span>New url: {event.newInfo.url}</span>
        </div>
    );
}
