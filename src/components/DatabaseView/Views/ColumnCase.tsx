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
import {ColumnCaseHandlers, filterType, RowType} from '@/components/DatabaseView/DatabaseViewTypes'
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

export const DefaultColumnCase = {
	id: {
		Icon: HiHashtag,
		filter: DefaultFilter
	},
	number: {
		Icon: TbSquareRoundedNumber7Filled,
		filter: DefaultFilter
	},
	text: {
		Icon: IoText,
		filter: DefaultFilter
	},
	json: {
		Icon: TbJson,
		filter: DefaultFilter
	},
	email: {
		Icon: MdAlternateEmail,
		filter: DefaultFilter
	},
	phone: {
		Icon: HiPhone,
		filter: DefaultFilter
	},
	url: {
		Icon: FaLink,
		filter: DefaultFilter
	},
	image: {
		Icon: FaImage,
		filter: DefaultFilter
	},
	file: {
		Icon: FaFileAlt,
		filter: DefaultFilter
	},
	checkbox: {
		Icon: IoMdCheckboxOutline,
		filter: DefaultFilter
	},
	country: {
		Icon: FaLandmarkFlag,
		filter: DefaultFilter
	},
	country_multiply: {
		Icon: FaLandmarkFlag,
		filter: DefaultFilter
	},
	country_name: {
		Icon: FaLandmarkFlag,
		filter: DefaultFilter
	},
	person: {
		Icon: IoPersonCircleSharp,
		filter: DefaultFilter
	},
	password: {
		Icon: RiLockPasswordFill,
		filter: DefaultFilter
	},
	dateView: {
		Icon: BsCalendar2Date,
		filter: DefaultFilter
	},
	timeView: {
		Icon: MdOutlineAccessTime,
		filter: DefaultFilter
	},
	createdBy: {
		Icon: FaUser,
		filter: DefaultFilter
	},
	updatedBy: {
		Icon: FaUserCog,
		filter: DefaultFilter
	},
	createdAt: {
		Icon: GrDocumentUpdate,
		filter: DefaultFilter
	},
	updatedAt: {
		Icon: MdUpdate,
		filter: DefaultFilter
	},
} satisfies ColumnCaseHandlers
