import React from "react";

const SortContainer = ({items, color, target}) => {
	return(
		<main className = "sort-container">
			{
				items.map((value, index) => {
					return(
						<div 
							key = {value} 
							style = {(target.indexOf(index) === -1)?{height: `${value}%`}: {height: `${value}%`, backgroundColor: color}}
						>
							{value}
						</div>
					)
					
				})
			}
		</main> 
	);
}

export default SortContainer;