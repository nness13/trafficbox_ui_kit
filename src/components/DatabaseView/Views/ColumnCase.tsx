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
import { ColumnCaseHandlers } from '@/components/DatabaseView/DatabaseViewTypes'
import { DefaultFilter } from '@/components/DatabaseView/ViewPanel/filter/filter.case.utils'
import {
	ArraySort,
	BooleanSort,
	DatetimeSort,
	NumberSort,
	TextSort
} from '@/components/DatabaseView/ViewPanel/sort/sort.case.utils'
import { TextSearch } from '@/components/DatabaseView/ViewPanel/search/search.case.utils'

export const DefaultColumnCase = {
	id: {
		Icon: HiHashtag,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	relation_id: {
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
