import * as React from 'react';

import { getAllEvents } from 'scripts/storage';
import { deserializeEvent, SerializableEvent } from 'scripts/serialization';
import EventList from './components/EventList';

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
        this.setState({ events, isInitialized: true });
    }

    public render() {
        return (
            <main>
                <EventList events={this.state.events} />
            </main>
        );
    }
}
