import React, { useContext } from 'react';
import ContextGroup from './ContextGroup';
import ContextSection from './ContextSection';
import Request from './sections/Request';
import Headers from './sections/Headers';
import QueryString from './sections/QueryString';
import Body from './sections/Body';
import Files from './sections/Files';
import Session from './sections/Session';
import Cookies from './sections/Cookies';
import LivewireData from './sections/LivewireData';
import LivewireComponent from './sections/LivewireComponent';
import LivewireUpdates from './sections/LivewireUpdates';
import ErrorOccurrenceContext from '../../contexts/ErrorOccurrenceContext';
import Routing from './sections/Routing';
import View from './sections/View';
import User from './sections/User';
import Git from './sections/Git';
import Versions from './sections/Versions';
import { getContextValues } from '../../util';
import ContextSections from './ContextSections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faQuestionCircle, faCode, faFile, faHourglassHalf, faCookieBite, faRandom, faPaintRoller, faWindowMaximize, faUser, faCodeBranch, faInfoCircle, faEye, faSatelliteDish, faTh } from '@fortawesome/free-solid-svg-icons';
import InViewContextProvider from '../../contexts/InViewContextProvider';
import LiveWireIcon from 'components/ui/icons/LivewireIcon';

export default function Context() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const context = errorOccurrence.context_items;
    const files = getContextValues(errorOccurrence, 'files');
    const requestData = getContextValues(errorOccurrence, 'request_data');

    return (
        <div className="flex items-stretch">
            <InViewContextProvider>
                <ContextSections>
                    <ContextGroup title="Request" anchor="request">
                        <Request />
                        <ContextSection
                            title="Headers"
                            anchor="request-headers"
                            icon={<FontAwesomeIcon fixedWidth icon={faExchangeAlt} />}
                            children={<Headers />}
                        />
                        {!!requestData.queryString.length && (
                            <ContextSection
                                title="Query String"
                                anchor="request-query-string"
                                icon={<FontAwesomeIcon fixedWidth icon={faQuestionCircle} />}
                                children={<QueryString />}
                            />
                        )}
                        <ContextSection title="Body" anchor="request-body" icon={<FontAwesomeIcon fixedWidth icon={faCode} />} children={<Body />} />
                        {!!files.length && <ContextSection title="Files" anchor="request-files" icon={<FontAwesomeIcon fixedWidth icon={faFile} />} children={<Files />} />}
                        <ContextSection title="Session" anchor="request-session" icon={<FontAwesomeIcon fixedWidth icon={faHourglassHalf} />} children={<Session />} />
                        <ContextSection title="Cookies" anchor="request-cookies" icon={<FontAwesomeIcon fixedWidth icon={faCookieBite} />} children={<Cookies />} />

                    </ContextGroup>
                    <ContextGroup title="App" anchor="app">
                        {context.route && (
                            <ContextSection title="Routing" anchor="app-routing" icon={<FontAwesomeIcon fixedWidth icon={faRandom} />} children={<Routing />} />
                        )}
                        {context.view && (
                            <ContextSection title="Views" anchor="app-views" icon={<FontAwesomeIcon fixedWidth icon={faPaintRoller} />} children={<View />} />
                        )}
                    </ContextGroup>
                    {context.livewire && (
                        <ContextGroup title="Livewire" anchor="livewire">
                            <ContextSection title="Component" anchor="livewire-component" icon={<LiveWireIcon className="svg-inline--fa fa-w-16 fa-fw" />} children={<LivewireComponent />} />
                            <ContextSection title="Updates" anchor="livewire-updates" icon={<FontAwesomeIcon fixedWidth icon={faSatelliteDish} />} children={<LivewireUpdates />} />
                            <ContextSection title="Data" anchor="livewire-data" icon={<FontAwesomeIcon fixedWidth icon={faTh} />} children={<LivewireData />} />
                        </ContextGroup>
                    )}
                    <ContextGroup title="User" anchor="user">
                        {context.user && <ContextSection title="User" anchor="user-user" icon={<FontAwesomeIcon fixedWidth icon={faUser} />} children={<User />} />}
                        <ContextSection title="Client" anchor="user-client" icon={<FontAwesomeIcon fixedWidth icon={faWindowMaximize} />} children={<div>Client</div>} />
                    </ContextGroup>
                    <ContextGroup title="Context" anchor="context">
                        {context.git && <ContextSection title="Git" anchor="context-git" icon={<FontAwesomeIcon fixedWidth icon={faCodeBranch} />} children={<Git />} />}
                        <ContextSection title="Versions" anchor="context-versions" icon={<FontAwesomeIcon fixedWidth icon={faInfoCircle} />} children={<Versions />} />
                    </ContextGroup>
                </ContextSections>
            </InViewContextProvider>
        </div>
    );
}
