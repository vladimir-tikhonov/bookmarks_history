import * as React from 'react';

import './styles/EventHeader';

interface IEventHeaderProps {
    eventDisplayName: string;
    bookmarkTitle: string;
    timestamp: number;
}

export default function EventHeader(props: IEventHeaderProps) {
    const formattedDatetime = new Date(props.timestamp).toLocaleString();

    return (
        <header className="event-header">
            <time className="time">{formattedDatetime}</time>:
            <span className="title"> "{props.bookmarkTitle}" </span>
            was {props.eventDisplayName}.
        </header>
    );
}
