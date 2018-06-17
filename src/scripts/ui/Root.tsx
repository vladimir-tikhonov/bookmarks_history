import * as React from 'react';

import { getAllEvents } from 'scripts/storage';
import { deserializeEvent, SerializableEvent } from 'scripts/serialization';
import EventList from './components/EventList';

import './styles/global';
import './styles/Root';

interface IRootComponentState {
    events: SerializableEvent[];
    isInitialized: boolean;
}

export default class Root extends React.PureComponent<{}, IRootComponentState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            events: [],
            isInitialized: false,
        };
    }

    public async componentDidMount() {
        const eventsData = await getAllEvents();
        const events = eventsData.map((eventData) => deserializeEvent(eventData));
        const sortedEvents = events.sort((e1, e2) => e2.timestamp - e1.timestamp);
        this.setState({ events: sortedEvents, isInitialized: true });
    }

    public render() {
        return (
            <main className="ui-page">
                <EventList events={this.state.events} />
            </main>
        );
    }
}
