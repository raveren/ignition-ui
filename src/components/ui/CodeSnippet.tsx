import React, {useEffect, useRef, useState} from 'react';
import {copyToClipboard} from "../../util";

type Props = {
    value: string;
    limitHeight?: boolean;
};

// TODO: Json/Curl editor?

export default function CodeSnippet({value, limitHeight = true}: Props) {
    const [copied, setCopied] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(limitHeight);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (ref.current) {
            setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
        }
    }, [ref.current, isCollapsed, value, limitHeight]);

    useEffect(() => {
        let timeout: number;

        if (copied) {
            timeout = window.setTimeout(() => setCopied(false), 3000);
        }

        return () => window.clearTimeout(timeout);
    }, [copied]);

    function copy() {
        copyToClipboard(value);
        setCopied(true);
    }

    // TODO: Handle empty values? E.g. content-length header

    return (
        <div className="group ~bg-gray-500/5">
            <pre
                ref={ref}
                className={`px-4 py-2 mask-fade-x overflow-x-scroll scrollbar-hidden-x
                    ${isCollapsed ? 'overflow-y-hidden max-h-32' : ''}
                    ${isOverflowing ? 'mask-fade-y cursor-pointer' : ''}
                `}
                onClick={() => {isOverflowing ? setIsCollapsed(false) : null }}
            >
                <code className="font-mono leading-relaxed text-sm font-normal">
                    {value}
                </code>
            </pre>
            <button
                onClick={copy}
                title="Copy to clipboard"
                className={`absolute top-2 right-2 ~text-gray-500 hover:text-indigo-500 opacity-0 transform scale-80 transition-animation delay-100 ${
                    copied ? '' : 'group-hover:opacity-100 group-hover:scale-100'
                }`}
            >
                <i className="far fa-copy"/>
            </button>
            {copied && (
                <p
                    className="hidden z-10 shadow-md sm:block absolute top-2 right-2 px-2 py-1 -mt-1 ml-1 bg-white text-sm text-emerald-500 whitespace-nowrap"
                    onClick={() => setCopied(false)}
                >
                    Copied!
                </p>
            )}
            {isOverflowing && (
                <button
                    onClick={() => setIsCollapsed(false)}
                    className="absolute -bottom-3 left-1/2 w-6 h-6 -translate-x-1/2 rounded-full flex items-center justify-center 
                    text-xs ~bg-white text-indigo-500 hover:shadow-lg
                    opacity-0 transform scale-80 transition-animation delay-100 shadow-md 
                    group-hover:opacity-100 group-hover:scale-100 
                    active:shadow-sm active:translate-y-px"
                >
                    <i className="fas fa-angle-down"/>
                </button>
            )}
        </div>
    )
}
