import moment from 'moment'
import { date_format } from '@/config/consts'

export function DateView (props: { date: string | number | null, date_format: string }) {
	if(!props.date) return null
	if(typeof props.date === "string" && props.date.length === 0) return null
	return moment(props.date).format(date_format)
}