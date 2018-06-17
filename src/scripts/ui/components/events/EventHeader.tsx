import * as React from 'react';

import './styles/EventHeader';

interface IEventHeaderProps {
    icon: string;
    eventDisplayName: string;
    bookmarkTitle: string;
    timestamp: number;
}

export default function EventHeader(props: IEventHeaderProps) {
    const formattedDatetime = new Date(props.timestamp).toLocaleString();

    return (
        <header className="event-header">
            <img className="icon" src={props.icon} />
            <span className="description">
                <time className="time">{formattedDatetime}</time>:
                <span className="title"> "{props.bookmarkTitle}" </span>
                was {props.eventDisplayName}.
            </span>
        </header>
    );
}
