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
import { ColumnCase } from '@/components/DatabaseView2/DatabaseViewTypes'

export const DefaultColumnCase = {
	id: {
		Icon: HiHashtag
	},
	number: {
		Icon: TbSquareRoundedNumber7Filled
	},
	text: {
		Icon: IoText
	},
	json: {
		Icon: TbJson
	},
	email: {
		Icon: MdAlternateEmail
	},
	phone: {
		Icon: HiPhone
	},
	url: {
		Icon: FaLink
	},
	image: {
		Icon: FaImage
	},
	file: {
		Icon: FaFileAlt
	},
	checkbox: {
		Icon: IoMdCheckboxOutline
	},
	country: {
		Icon: FaLandmarkFlag
	},
	country_multiply: {
		Icon: FaLandmarkFlag
	},
	country_name: {
		Icon: FaLandmarkFlag
	},
	person: {
		Icon: IoPersonCircleSharp
	},
	password: {
		Icon: RiLockPasswordFill
	},
	dateView: {
		Icon: BsCalendar2Date
	},
	timeView: {
		Icon: MdOutlineAccessTime
	},
	createdBy: {
		Icon: FaUser
	},
	updatedBy: {
		Icon: FaUserCog
	},
	createdAt: {
		Icon: GrDocumentUpdate
	},
	updatedAt: {
		Icon: MdUpdate
	},
} satisfies ColumnCase
