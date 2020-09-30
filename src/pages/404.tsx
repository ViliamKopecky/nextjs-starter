import Error from 'next/error'
import React from 'react'

export default function Error404Page() {
	return <Error statusCode={404} />
}
