import React, { useEffect, useRef } from 'react';

interface GraphBrowserProps {
    host: string;
    port: number;
    cypherQuery: string;
}

const GraphBrowser: React.FC<GraphBrowserProps> = ({ host, port, cypherQuery }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [encodedQuery, setEncodedQuery] = React.useState<string>(() => cypherQuery);

    useEffect(() => {
        console.log(cypherQuery);
        setEncodedQuery(encodeURIComponent(cypherQuery));
        console.log(encodedQuery);
        const url = `http://${host}:${port}/graphQuery.html?query=${encodedQuery}`;
        if (iframeRef.current) {
            iframeRef.current.src = url;
            // iframeRef.current.onload = onLoad;
        }
    }, [cypherQuery]);

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
