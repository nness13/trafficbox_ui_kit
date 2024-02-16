import React from 'react'
import { z } from 'zod'
import { Input } from '@material-tailwind/react'
import { LightBlueTag } from '@/components/Buttons/LightBlueTag'
import { SimpleLightButton } from '@/components/Buttons/SimpleLightButton'
import { HiEllipsisVertical, HiTrash } from 'react-icons/hi2'

type props_type = {
	filter: any,
	update_filter: (filter: any) => void
	delete_filter: (id: string) => void
}
export function FilterEditorSwitcher (props: props_type) {
	switch (props.filter.column.type.type) {
		case "text":
			return <TextFilterEditor {...props}/>;
		case "createdAt":
		case "updatedAt":
		case "dateView":
			return <DateFilterEditor {...props}/>;
		case "select":
			return <SelectFilterEditor {...props}/>;
		default:
			return <TextFilterEditor {...props}/>
	}
}


export function TextFilterEditor (props: props_type) {
	const filter = props.filter as any

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-2 items-center">
					<div>{filter.column.label}</div>
					<LightBlueTag>{filter.condition}</LightBlueTag>
					<div>{filter.value}</div>
				</div>
				<div className="flex flex-row">
					<SimpleLightButton>
						<HiEllipsisVertical className="h-5 w-5"/>
					</SimpleLightButton>
					<SimpleLightButton onClick={() => props.delete_filter(filter._id)}>
						<HiTrash className="h-5 w-5"/>
					</SimpleLightButton>
				</div>
			</div>
			<Input
				type="search"
				name="search"
				value={filter.value as string}
				onInput={(e) => props.update_filter({_id: filter._id, value: e.currentTarget.value })}
				label="change_value"
				crossOrigin={undefined}
			/>
		</div>
	)
}

export function DateFilterEditor (props: props_type) {
	const filter = props.filter
	const condition_options: Array<any> = [
		'is', 'is not', 'within'
	].map(condition => ({
		key: condition,
		value: condition,
		label: condition,
	}))

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-2 items-center">
					<div>{filter.column.label}</div>
					{/*<SelectWithBorder*/}
					{/*	multiply={false}*/}
					{/*	options={condition_options}*/}
					{/*	value={condition_options.filter(c => c.key === filter.condition)}*/}
					{/*	onSelect={(data) => {*/}
					{/*		props.update_filter({_id: filter._id, condition: (data[0]?.key as typeof filter.condition) || "is" })*/}
					{/*	}}*/}
					{/*/>*/}
				</div>
				<div className="flex flex-row">
					<SimpleLightButton>
						<HiEllipsisVertical className="h-5 w-5"/>
					</SimpleLightButton>
					<SimpleLightButton onClick={() => props.delete_filter(filter._id)}>
						<HiTrash className="h-5 w-5"/>
					</SimpleLightButton>
				</div>
			</div>

			{filter.condition === "within"
				? <div>
					{/*<DateInputView*/}
					{/*	label={"from"}*/}
					{/*	value={filter.from}*/}
					{/*	onEdit={(data) => props.update_filter({_id: filter._id, from: data}) }*/}
					{/*/>*/}
					{/*<DateInputView*/}
					{/*	label={"to"}*/}
					{/*	value={filter.to}*/}
					{/*	onEdit={(data) => props.update_filter({_id: filter._id, to: data}) }*/}
					{/*/>*/}
			</div>
				: <div>
					{/*<DateInputView*/}
					{/*	value={filter.value}*/}
					{/*	onEdit={(data) => props.update_filter({_id: filter._id, value: data}) }*/}
					{/*/>*/}
				</div>
			}

		</div>
	)
}

export function SelectFilterEditor (props: props_type) {
	const filter = props.filter

	const options = filter.column.options?.map((option: any) => ({
		key: option.value,
		value: option.value,
		label: option.label,
	})) || []
	const onUpdate =  ( data: any[] ) => {
		props.update_filter({
			_id: filter._id,
			value: data.map(el => el.value as string)
		})
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-2 items-center">
					<div>{filter.column.label}</div>
					<LightBlueTag>{filter.condition}</LightBlueTag>
				</div>
				<div className="flex flex-row">
					<SimpleLightButton>
						<HiEllipsisVertical className="h-5 w-5"/>
					</SimpleLightButton>
					<SimpleLightButton onClick={() => props.delete_filter(filter._id)}>
						<HiTrash className="h-5 w-5"/>
					</SimpleLightButton>
				</div>
			</div>
			{/*<SelectWithBorder*/}
			{/*	multiply={false}*/}
			{/*	options={options}*/}
			{/*	value={options.filter(o =>*/}
			{/*		Array.isArray(filter.value)*/}
			{/*			? filter.value.find((value: string | number) => value === o.value)*/}
			{/*			: false*/}
			{/*	)}*/}
			{/*	onSelect={onUpdate}*/}
			{/*/>*/}

		</div>
	)
}