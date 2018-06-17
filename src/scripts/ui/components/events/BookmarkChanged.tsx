import * as React from 'react';

import { BookmarkChangedV1 } from 'scripts/events';
import EventHeader from './EventHeader';
import BookmarkLocation from './BookmarkLocation';

import changedIconUrl from 'assets/icons/icon-changed.svg';
import './styles/Event';

interface IBookmarkChangedProps {
    event: BookmarkChangedV1;
}

function shouldDisplayOldTitle(event: BookmarkChangedV1) {
    return event.newInfo.title !== event.oldInfo.title;
}

function renderOldTitle(event: BookmarkChangedV1) {
    return (
        <li className="property">
            Old title: <b>{event.oldInfo.title}</b>
        </li>
    );
}

function shouldDisplayUrlChanges(event: BookmarkChangedV1) {
    return event.newInfo.url !== event.oldInfo.url;
}

function renderUrlChanges(event: BookmarkChangedV1) {
    return (
        <>
            <li className="property">
                Location: <BookmarkLocation location={event.branchInfo} />
            </li>
            <li className="property">
                Old url: <a href={event.oldInfo.url}>{event.oldInfo.url}</a>
            </li>
            <li className="property">
                New url: <a href={event.newInfo.url}>{event.newInfo.url}</a>
            </li>
        </>
    );
}

export default function BookmarkChanged({ event }: IBookmarkChangedProps) {
    return (
        <li className="event-container">
            <EventHeader
                icon={changedIconUrl}
                eventDisplayName="changed"
                bookmarkTitle={event.newInfo.title}
                timestamp={event.timestamp}
            />
            <ul className="properties">
                {shouldDisplayOldTitle(event) && renderOldTitle(event)}
                {shouldDisplayUrlChanges(event) && renderUrlChanges(event)}
            </ul>
        </li>
    );
}
