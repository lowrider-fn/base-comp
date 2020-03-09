import IMask,{ createMask } from 'imask'
import { defaultTo } from 'ramda'
export { IMask,createMask }
type Range = {
	from?: number
	to?: number
}

export const time = ({
	hh,
	mm,
}: {
	hh?: Range
	mm?: Range
} = {}) => ({
	mask: 'hh:mm',
	placeholderChar: '_',
	lazy: false,
	blocks: {
		hh: {
			mask: IMask.MaskedRange,
			from: defaultTo(0, hh?.from),
			to: defaultTo(23, hh?.to),
			maxLength: 2,
		},
		mm: {
			mask: IMask.MaskedRange,
			from: defaultTo(0, mm?.from),
			to: defaultTo(59, mm?.to),
			maxLength: 2,
		},
	},
})

export const datePeriod = {
	mask: 'from - to',
	blocks: {
		from: {
			mask: Date,
		},
		to: {
			mask: Date, 
		},
	},
	thousandsSeparator: '-',
}

export const date = {
	mask: Date,
}

export const number = {
	mask: Number,
}
