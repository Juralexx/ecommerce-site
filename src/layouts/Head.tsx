import React from 'react'

interface Props {
    datas?: Record<string, any>;
    title?: string;
    description?: string;
    image?: string;
}

const HeadProvider = ({ datas, title, description, image }: Props) => {
    const root = typeof window !== 'undefined' ? window.location.href : 'string'
    const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

    const metadatas = {
        site_name: root,
        title: title || 'E-commerce site',
        description: description || 'The Limequat e-commerce site',
        image: `https://${root}/${image || 'img/og.jpg'}`,
        url: `${root}${pathname}`
    }

    return (
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />

            <meta name="description" content={metadatas.description} />
            <meta name="image" content={metadatas.image} />

            <title>{metadatas.title}</title>

            <meta id="og-locale" property="og:locale" content="fr_FR" key="locale" />
            <meta property="og:site_name" content={metadatas.site_name} />
            <meta property="og:title" content={metadatas.title} />
            <meta property="og:description" content={metadatas.description} />
            <meta property="og:image" content={metadatas.image} />
            <meta property="og:image:width" content="600" />
            <meta property="og:image:height" content="314" />
            <meta id="og-image-secure_url" property="og:image:secure_url" content={metadatas.image} />
            <meta property="og:url" content={metadatas.url} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadatas.title} />
            <meta name="twitter:description" content={metadatas.description} />
            <meta name="twitter:image" content={metadatas.image} />
            <meta name="twitter:site" content={metadatas.site_name} />
        </head>
    )
}

export default HeadProvider