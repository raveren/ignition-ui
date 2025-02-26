import React, {useContext} from 'react';
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
import ContextSections from './ContextSections';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faExchangeAlt,
    faQuestionCircle,
    faCode,
    faFile,
    faHourglassHalf,
    faCookieBite,
    faRandom,
    faPaintRoller,
    faUser,
    faCodeBranch,
    faSatelliteDish,
    faTh,
    faSlidersH,
    faAsterisk,
    faBomb,
} from '@fortawesome/free-solid-svg-icons';
import InViewContextProvider from '../../contexts/InViewContextProvider';
import LiveWireIcon from 'components/ui/icons/LivewireIcon';
import ErrorBoundary from '../ui/ErrorBoundary';
import Custom from "components/context/sections/Custom";
import startCase from 'lodash/startCase';

export default function Context() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const context = errorOccurrence.context_items;
    const requestData = context.request_data;

    return (
        <ErrorBoundary>
            <div className="flex items-stretch">
                <InViewContextProvider>
                    <ContextSections>
                        {context.request_data && context.request && context.headers && (
                            <ContextGroup title="Request" anchor="request">
                                <Request
                                    request={context.request}
                                    requestData={context.request_data}
                                    headers={context.headers}
                                />
                                <ContextSection
                                    title="Headers"
                                    anchor="request-headers"
                                    icon={<FontAwesomeIcon fixedWidth icon={faExchangeAlt}/>}
                                    children={<Headers headers={context.headers}/>}
                                />
                                {!!Object.values(context.request_data.queryString || []).length && (
                                    <ContextSection
                                        title="Query String"
                                        anchor="request-query-string"
                                        icon={<FontAwesomeIcon fixedWidth icon={faQuestionCircle}/>}
                                        children={<QueryString requestData={context.request_data}/>}
                                    />
                                )}
                                <ContextSection
                                    title="Body"
                                    anchor="request-body"
                                    icon={<FontAwesomeIcon fixedWidth icon={faCode}/>}
                                    children={<Body/>}
                                />
                                {!!requestData?.files?.length && (
                                    <ContextSection
                                        title="Files"
                                        anchor="request-files"
                                        icon={<FontAwesomeIcon fixedWidth icon={faFile}/>}
                                        children={<Files/>}
                                    />
                                )}
                                {!!context.session?.length && (
                                    <ContextSection
                                        title="Session"
                                        anchor="request-session"
                                        icon={<FontAwesomeIcon fixedWidth icon={faHourglassHalf}/>}
                                        children={<Session session={context.session}/>}
                                    />
                                )}
                                {!!context.cookies?.length && (
                                    <ContextSection
                                        title="Cookies"
                                        anchor="request-cookies"
                                        icon={<FontAwesomeIcon fixedWidth icon={faCookieBite}/>}
                                        children={<Cookies cookies={context.cookies}/>}
                                    />
                                )}
                            </ContextGroup>
                        )}
                        {(context.route || context.view) && (
                            <ContextGroup title="App" anchor="app">
                                {context.route && (
                                    <ContextSection
                                        title="Routing"
                                        anchor="app-routing"
                                        icon={<FontAwesomeIcon fixedWidth icon={faRandom}/>}
                                        children={<Routing route={context.route}/>}
                                    />
                                )}
                                {context.view && (
                                    <ContextSection
                                        title="Views"
                                        anchor="app-views"
                                        icon={<FontAwesomeIcon fixedWidth icon={faPaintRoller}/>}
                                        children={<View/>}
                                    />
                                )}
                            </ContextGroup>
                        )}
                        {context.livewire && (
                            <ContextGroup title="Livewire" anchor="livewire">
                                <ContextSection
                                    title="Component"
                                    anchor="livewire-component"
                                    icon={<LiveWireIcon className="svg-inline--fa fa-w-16 fa-fw"/>}
                                    children={<LivewireComponent/>}
                                />
                                <ContextSection
                                    title="Updates"
                                    anchor="livewire-updates"
                                    icon={<FontAwesomeIcon fixedWidth icon={faSatelliteDish}/>}
                                    children={<LivewireUpdates/>}
                                />
                                <ContextSection
                                    title="Data"
                                    anchor="livewire-data"
                                    icon={<FontAwesomeIcon fixedWidth icon={faTh}/>}
                                    children={<LivewireData/>}
                                />
                            </ContextGroup>
                        )}
                        <ContextGroup title="Context" anchor="context">
                            {context.user && (
                                <ContextSection
                                    title="User"
                                    anchor="user-user"
                                    icon={<FontAwesomeIcon fixedWidth icon={faUser}/>}
                                    children={<User user={context.user}/>}
                                />
                            )}
                            {context.git && (
                                <ContextSection
                                    title="Git"
                                    anchor="context-git"
                                    icon={<FontAwesomeIcon fixedWidth icon={faCodeBranch}/>}
                                    children={<Git git={context.git}/>}
                                />
                            )}
                            <ContextSection
                                title="Versions"
                                anchor="context-versions"
                                icon={<FontAwesomeIcon fixedWidth icon={faSlidersH}/>}
                                children={<Versions env={context.env || {}}/>}
                            />
                            {context.exception && (
                                <ContextSection
                                    title="Exception"
                                    anchor="context-exception"
                                    icon={<FontAwesomeIcon fixedWidth icon={faBomb}/>}
                                    children={<Custom items={context.exception || {}}/>}
                                />
                            )}
                        </ContextGroup>
                        {errorOccurrence.custom_context_items?.length > 0 && (
                            <ContextGroup title="Custom" anchor="custom-context">
                                {errorOccurrence.custom_context_items.map((group) => (
                                    <ContextSection
                                        key={group.name}
                                        title={startCase(group.name)}
                                        anchor={`custom-context-${group.name}`}
                                        icon={<FontAwesomeIcon fixedWidth icon={faAsterisk}/>}
                                        children={<Custom items={group.items}/>}
                                    />
                                ))}
                            </ContextGroup>
                        )}
                    </ContextSections>
                </InViewContextProvider>
            </div>
        </ErrorBoundary>
    );
}
