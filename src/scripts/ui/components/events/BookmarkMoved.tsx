import * as React from 'react';

import { BookmarkMovedV1 } from 'scripts/events';
import EventHeader from './EventHeader';
import BookmarkLocation from './BookmarkLocation';

import movedIconUrl from 'assets/icons/icon-moved.svg';
import './styles/Event';

interface IBookmarkMovedProps {
    event: BookmarkMovedV1;
}

export default function BookmarkMoved({ event }: IBookmarkMovedProps) {
    return (
        <li className="event-container">
            <EventHeader
                icon={movedIconUrl}
                eventDisplayName="moved"
                bookmarkTitle={event.info.title}
                isFolder={event.info.isFolder}
                timestamp={event.timestamp}
            />
            <ul className="properties">
                <li className="property">
                    Old location: <BookmarkLocation location={event.oldBranchInfo} />
                </li>
                <li className="property">
                    New location: <BookmarkLocation location={event.newBranchInfo} />
                </li>
            </ul>
        </li>
    );
}
