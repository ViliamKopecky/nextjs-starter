import type { AppProps /*, AppContext */ } from 'next/app'
import React from 'react'
import { initSentry } from 'src/utils/sentry/initSentry'
import '../styles/main.sass'

initSentry()

export default function App({ Component, pageProps, err }: AppProps & { err?: unknown }) {
	return <Component {...pageProps} err={err} />
}
