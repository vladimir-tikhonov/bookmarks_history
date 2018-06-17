import * as React from 'react';

import { BookmarkRemovedV1 } from 'scripts/events';
import EventHeader from './EventHeader';
import BookmarkLocation from './BookmarkLocation';

import removedIconUrl from 'assets/icons/icon-removed.svg';
import './styles/Event';

interface IBookmarkRemovedProps {
    event: BookmarkRemovedV1;
}

function renderUrl(event: BookmarkRemovedV1) {
    return (
        <li className="property">
            Url: <a href={event.info.url}>{event.info.url}</a>
        </li>
    );
}

export default function BookmarkRemoved({ event }: IBookmarkRemovedProps) {
    return (
        <li className="event-container">
            <EventHeader
                icon={removedIconUrl}
                eventDisplayName="removed"
                bookmarkTitle={event.info.title}
                isFolder={event.info.isFolder}
                timestamp={event.timestamp}
            />
            <ul className="properties">
                <li className="property">
                    Location: <BookmarkLocation location={event.branchInfo} />
                </li>
                {!event.info.isFolder && renderUrl(event)}
            </ul>
        </li>
    );
}
