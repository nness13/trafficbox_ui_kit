import { HiHashtag, HiPhone } from 'react-icons/hi2'
import { TbJson, TbSquareRoundedNumber7Filled } from 'react-icons/tb'
import { IoPersonCircleSharp, IoText } from 'react-icons/io5'
import { MdAlternateEmail, MdOutlineAccessTime, MdUpdate } from 'react-icons/md'
import { FaFileAlt, FaLink, FaUserCog } from 'react-icons/fa'
import { FaImage, FaLandmarkFlag, FaUser } from 'react-icons/fa6'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'
import { BsCalendar2Date } from 'react-icons/bs'
import { GrDocumentUpdate } from 'react-icons/gr'
import {ColumnCaseHandlers, filterType, RowType, sortType} from '@/components/DatabaseView/DatabaseViewTypes'
import moment from "moment";

export const DefaultFilter: ColumnCaseHandlers[string]["filter"] = (row, filter)=> {
	const value = row[filter.column.key]
	switch (filter.condition) {
		case "is": return value === filter.value
		case "is_not": return value !== filter.value
		case "contain": return value.includes(filter.value)
		case "is_not_contain": return !value.includes(filter.value)
		case "within": return moment(value).isBetween(moment(filter.from), moment(filter.to))
	}
}
export const TextSort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
	return rows.sort((a, b) => {
		const a_value = sort.value === "ascending" ? a[sort.column.key] : b[sort.column.key]
		const b_value = sort.value === "ascending" ? b[sort.column.key] : a[sort.column.key]

		if(a_value < b_value) return -1
		if(a_value > b_value) return 1
		return 0
	})
}
export const NumberSort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
	return rows.sort((a, b) => {
		const a_value = sort.value === "ascending" ? a[sort.column.key] : b[sort.column.key]
		const b_value = sort.value === "ascending" ? b[sort.column.key] : a[sort.column.key]

		return a_value-b_value
	})
}
export const ArraySort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
	return rows.sort((a, b) => {
		const a_value = sort.value === "ascending" ? a[sort.column.key] : b[sort.column.key]
		const b_value = sort.value === "ascending" ? b[sort.column.key] : a[sort.column.key]

		return a_value.length-b_value.length
	})
}
export const BooleanSort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
	return rows.sort((a, b) => {
		const a_value = sort.value === "ascending" ? a[sort.column.key] : b[sort.column.key]
		const b_value = sort.value === "ascending" ? b[sort.column.key] : a[sort.column.key]

		if(a_value && !b_value) return -1
		if(!a_value && b_value) return 1
		return 0
	})
}
export const DatetimeSort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
	return rows.sort((a, b) => {
		const a_value = sort.value === "ascending" ? moment(a[sort.column.key]) : moment(b[sort.column.key])
		const b_value = sort.value === "ascending" ? moment(b[sort.column.key]) : moment(a[sort.column.key])

		return a_value.diff(b_value)
	})
}
export const TextSearch: ColumnCaseHandlers[string]["search"] = (rowValue: string, searchValue) => {
	return rowValue.includes(searchValue)
}

export const DefaultColumnCase = {
	id: {
		Icon: HiHashtag,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	number: {
		Icon: TbSquareRoundedNumber7Filled,
		filter: DefaultFilter,
		sort: NumberSort,
		search: TextSearch,
	},
	text: {
		Icon: IoText,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	json: {
		Icon: TbJson,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	email: {
		Icon: MdAlternateEmail,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	phone: {
		Icon: HiPhone,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	url: {
		Icon: FaLink,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	image: {
		Icon: FaImage,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	file: {
		Icon: FaFileAlt,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	checkbox: {
		Icon: IoMdCheckboxOutline,
		filter: DefaultFilter,
		sort: BooleanSort,
		search: TextSearch,
	},
	country: {
		Icon: FaLandmarkFlag,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	country_multiply: {
		Icon: FaLandmarkFlag,
		filter: DefaultFilter,
		sort: ArraySort,
		search: TextSearch,
	},
	country_name: {
		Icon: FaLandmarkFlag,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	person: {
		Icon: IoPersonCircleSharp,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	password: {
		Icon: RiLockPasswordFill,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	dateView: {
		Icon: BsCalendar2Date,
		filter: DefaultFilter,
		sort: DatetimeSort,
		search: TextSearch,
	},
	timeView: {
		Icon: MdOutlineAccessTime,
		filter: DefaultFilter,
		sort: DatetimeSort,
		search: TextSearch,
	},
	createdBy: {
		Icon: FaUser,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	updatedBy: {
		Icon: FaUserCog,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	createdAt: {
		Icon: GrDocumentUpdate,
		filter: DefaultFilter,
		sort: DatetimeSort,
		search: TextSearch,
	},
	updatedAt: {
		Icon: MdUpdate,
		filter: DefaultFilter,
		sort: DatetimeSort,
		search: TextSearch,
	},
} satisfies ColumnCaseHandlers
