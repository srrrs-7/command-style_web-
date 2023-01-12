module.exports = {
    output: 'standalone',
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        forceSwcTransforms: true,
        externalDir: true | {
            enabled: true,
            silent: true,
        },
    },
};