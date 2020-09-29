import type { AppProps /*, AppContext */ } from 'next/app'
import React from 'react'
import '../styles/main.sass'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
