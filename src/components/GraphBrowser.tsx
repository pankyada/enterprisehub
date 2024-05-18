import React, { useEffect, useRef } from 'react';

interface GraphBrowserProps {
    host: string;
    port: number;
    cypherQuery: string;
}

const GraphBrowser: React.FC<GraphBrowserProps> = ({ host, port, cypherQuery }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const encodedQuery = encodeURIComponent(cypherQuery);
        const url = `http://${host}:${port}/graphQuery.html`;

        // const onLoad = () => {
        //     if (iframeRef.current) {
        //         const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
        //         if (iframeDocument) {
        //             const connectButton = iframeDocument.querySelector<HTMLButtonElement>('[data-testid="connect"]');
        //             if (connectButton) {
        //                 connectButton.click();
        //             } else {
        //                 console.error('Connect button not found');
        //             }
        //         }
        //     }
        // };

        if (iframeRef.current) {
            iframeRef.current.src = url;
            // iframeRef.current.onload = onLoad;
        }
    }, [host, port, cypherQuery]);

    return (

        <iframe
            ref={iframeRef}
            title="Neo4j Browser"
            width="100%"
            height="100%"
            style={{ border: 'none', marginTop: '20px', borderRadius: '16px' }}
        ></iframe>
    );
};

export default GraphBrowser;
