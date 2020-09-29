/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import s from './Dump.module.sass'

const getCircularReplacer = () => {
	const seen = new WeakSet()
	return (_: string | number, value: any) => {
		if (typeof value === 'object' && value !== null) {
			if (seen.has(value)) {
				return '#CYCLIC_VALUE#'
			}
			seen.add(value)
		}
		return value
	}
}

export function dump(value: any) {
	return JSON.stringify(value, getCircularReplacer(), 2)
}

export function Dump({ data }: { data?: any }) {
	return <pre className={s.Dump}>{dump(data)}</pre>
}
