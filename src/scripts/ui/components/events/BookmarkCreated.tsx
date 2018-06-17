import * as React from 'react';

import { BookmarkCreatedV1 } from 'scripts/events';
import EventHeader from './EventHeader';
import BookmarkLocation from './BookmarkLocation';

import createdIconUrl from 'assets/icons/icon-created.svg';
import './styles/Event';

interface IBookmarkCreatedProps {
    event: BookmarkCreatedV1;
}

export default function BookmarkCreated({ event }: IBookmarkCreatedProps) {
    return (
        <li className="event-container">
            <EventHeader
                icon={createdIconUrl}
                eventDisplayName="created"
                bookmarkTitle={event.info.title}
                timestamp={event.timestamp}
            />
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
