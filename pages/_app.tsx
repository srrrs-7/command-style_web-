import '../src/styles/globals.scss';
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/lib/theme';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export default class MyApp extends App {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }

    render() {
        const {
            Component,
            pageProps: { session, ...pageProps },
        } = this.props;

        return (
            <>
                <Head>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
                    <meta name='theme-color' content={theme.palette.primary.main} />
                    <title>Command Style</title>
                </Head>

                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <RecoilRoot>
                            <CssBaseline />
                            <Component {...pageProps} />
                        </RecoilRoot>
                    </ThemeProvider>
                </QueryClientProvider>
            </>
        );
    }
}
