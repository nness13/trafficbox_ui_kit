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
import { TextValueCase } from '@/components/DatabaseView/Views/ColumnCase/ColumnValueCase/TextValueCase'
import { BooleanValueCase } from '@/components/DatabaseView/Views/ColumnCase/ColumnValueCase/BooleanValueCase'
import { NumberValueCase } from '@/components/DatabaseView/Views/ColumnCase/ColumnValueCase/NumberValueCase'
import { IdValueCase } from '@/components/DatabaseView/Views/ColumnCase/ColumnValueCase/IdValueCase'
import { DatetimeValueCase } from '@/components/DatabaseView/Views/ColumnCase/ColumnValueCase/DatetimeValueCase'
import {
	DatetimePickerValueCase
} from '@/components/DatabaseView/Views/ColumnCase/ColumnValueCase/DatetimePickerValueCase'

export const DefaultColumnCase = {
	id: {
		Icon: HiHashtag,
		ValueCase: IdValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	relation_id: {
		Icon: HiHashtag,
		ValueCase: IdValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	number: {
		Icon: TbSquareRoundedNumber7Filled,
		ValueCase: NumberValueCase,
		filter: DefaultFilter,
		sort: NumberSort,
		search: TextSearch,
	},
	text: {
		Icon: IoText,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	json: {
		Icon: TbJson,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	email: {
		Icon: MdAlternateEmail,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	phone: {
		Icon: HiPhone,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	url: {
		Icon: FaLink,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	image: {
		Icon: FaImage,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	file: {
		Icon: FaFileAlt,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	checkbox: {
		Icon: IoMdCheckboxOutline,
		ValueCase: BooleanValueCase,
		filter: DefaultFilter,
		sort: BooleanSort,
		search: TextSearch,
	},
	country: {
		Icon: FaLandmarkFlag,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	country_multiply: {
		Icon: FaLandmarkFlag,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: ArraySort,
		search: TextSearch,
	},
	country_name: {
		Icon: FaLandmarkFlag,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	person: {
		Icon: IoPersonCircleSharp,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	password: {
		Icon: RiLockPasswordFill,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	dateView: {
		Icon: BsCalendar2Date,
		ValueCase: DatetimePickerValueCase,
		filter: DefaultFilter,
		sort: DatetimeSort,
		search: TextSearch,
	},
	timeView: {
		Icon: MdOutlineAccessTime,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: DatetimeSort,
		search: TextSearch,
	},
	createdBy: {
		Icon: FaUser,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	updatedBy: {
		Icon: FaUserCog,
		ValueCase: TextValueCase,
		filter: DefaultFilter,
		sort: TextSort,
		search: TextSearch,
	},
	createdAt: {
		Icon: GrDocumentUpdate,
		ValueCase: DatetimeValueCase,
		filter: DefaultFilter,
		sort: DatetimeSort,
		search: TextSearch,
	},
	updatedAt: {
		Icon: MdUpdate,
		ValueCase: DatetimeValueCase,
		filter: DefaultFilter,
		sort: DatetimeSort,
		search: TextSearch,
	},
} satisfies ColumnCaseHandlers
