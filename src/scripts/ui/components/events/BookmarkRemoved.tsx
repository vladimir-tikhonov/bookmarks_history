import * as React from 'react';

import { BookmarkRemovedV1 } from 'scripts/events';
import EventHeader from './EventHeader';
import BookmarkLocation from './BookmarkLocation';

import './styles/Event';

interface IBookmarkRemovedProps {
    event: BookmarkRemovedV1;
}

export default function BookmarkRemoved({ event }: IBookmarkRemovedProps) {
    return (
        <li className="event-container">
            <EventHeader eventDisplayName="removed" bookmarkTitle={event.info.title} timestamp={event.timestamp} />
            <ul className="properties">
                <li className="property">
                    Location: <BookmarkLocation location={event.branchInfo} />
                </li>
                <li className="property">
                    Url: <a href={event.info.url}>{event.info.url}</a>
                </li>
            </ul>
        </li>
    );
}
