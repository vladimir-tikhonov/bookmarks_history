import * as React from 'react';

import { BookmarkCreatedV1, BookmarkRemovedV1, BookmarkChangedV1, BookmarkMovedV1 } from 'scripts/events';
import { BookmarkCreated, BookmarkRemoved, BookmarkChanged, BookmarkMoved } from 'scripts/ui/components/events';
import { SerializableEvent } from 'scripts/serialization';

import './styles/EventList';

interface IEventListProps {
    events: SerializableEvent[];
}

function renderEvent(event: SerializableEvent) {
    if (event instanceof BookmarkCreatedV1) {
        return <BookmarkCreated key={event.getId()} event={event} />;
    }

    if (event instanceof BookmarkRemovedV1) {
        return <BookmarkRemoved key={event.getId()} event={event} />;
    }

    if (event instanceof BookmarkChangedV1) {
        return <BookmarkChanged key={event.getId()} event={event} />;
    }

    if (event instanceof BookmarkMovedV1) {
        return <BookmarkMoved key={event.getId()} event={event} />;
    }

    throw new Error('Unknown type of event.');
}

export default function EventList(props: IEventListProps) {
    if (props.events.length === 0) {
        return <h1 className="empty-placeholder">Nothing here yet :)</h1>;
    }

    return (
        <section className="event-list">
            <ul className="list">
                {props.events.map(renderEvent)}
            </ul>
        </section>
    );
}
