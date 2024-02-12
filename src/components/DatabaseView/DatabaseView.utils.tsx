// type generateGroupRowType = {
// 	children: groupByGroupsType["values"]
// 	[k: string]: any
// }
// function generateGroupRow (columns: column_zod_schema_type[], children: groupByGroupsType, parent?: string ): generateGroupRowType {
// 	const parent_text = parent ? parent+">" : ""
// 	return columns.reduce(
// 		(def_row, column) => {
// 			const def = def_row.children.every(el => el[column.key] === def_row.children[0][column.key])
// 				? def_row.children[0]
// 				: false
//
// 			switch (column.type.type){
// 				case "ID":
// 					def_row[column.key] = `${parent_text}${children.by!}>${children.group}`; break;
// 				case "select":
// 					def_row[column.key] = def ? def[column.key] : ""; break;
// 				case "checkbox":
// 					def_row[column.key] = def ? def[column.key] : false; break;
// 				case "relation_id":
// 					def_row[column.key] = def ? Number.parseInt(def[column.key]) : null; break;
// 				case "number":
// 					def_row[column.key] = def_row.children.reduce((accum, row) => accum+row[column.key as any] || 0, 0); break;
// 				case "country":
// 				case "country_name":
// 					def_row[column.key] = def ? def[column.key] : ""; break;
// 				case "sum":
// 					def_row[column.key] = def_row.children.reduce((accum, row) => accum+row[column.key as any] || 0, 0); break;
// 				default: {
// 					def_row[column.key] = def ? def[column.key] : def_row.children.length
// 				}
// 			}
//
// 			return def_row
// 		},
// 		{
// 			children:
// 				children.nextIsGroup
// 					? children.values.map(row => generateGroupRow( columns, row, `${parent_text}${children.by}>` ) )
//
// 					: children.values
// 		} as generateGroupRowType
// 	)
// }

// function groupByGroups(groups: group_zod_schema_type[], rows: any): groupByGroupsType[] {
// 	const [group, next_group] = groups
//
// 	return _(rows)
// 		.groupBy(row => row[group.column.key])
// 		.map((values, key) => ({
// 			by: group.column.key,
// 			group: key,
// 			nextIsGroup: !!next_group,
// 			values: next_group
// 				? groupByGroups(groups.slice(1), values)
// 				: values
// 		}))
// 		.value() as groupByGroupsType[]
// }


export function getAllCount(data: any[], index: number): number {
	return data?.reduce(
		(accum, element) => {
			if(!element.hasOwnProperty('children')) accum += 1
			else accum += getAllCount(element.children, index+1)
			return accum
		},
		0
	);
}
export function getTrustItemID(data: any[], index: number): number[] {
	return data.reduce(
		(accum, element) => {
			if(!element.hasOwnProperty('children')) accum.push(element.id)
			else {
				accum.push(element.id)
				accum.push(
					...getTrustItemID(element.children, index + 1)
				)
			}
			return accum
		},
		[]
	);
}