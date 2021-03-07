import React from "react";

const Options = ({ prepareItems, startSorting, setHowMany, setSortType, setSpeed, howMany, sortType, speed, sortingRunning }) => {
	return (
		<aside className="options-container">
			<nav>
				<div className="burger-menu">
					<div className="burger-1"></div>
					<div className="burger-2"></div>
					<div className="burger-3"></div>
				</div>
			</nav>
			<div className="options">
				<form>
					<input
						type="number"
						id="howMany"
						value={howMany}
						name="howMany"
						placeholder="How many elements"
						onChange={e => {
							if (!sortingRunning) {
								setHowMany(e.target.value);
								prepareItems(e.target.value);
							}
						}}
					/>
					<select name="sortType" id="sortType" value={sortType} onChange={e => setSortType(e.target.value)}>
						<option value="bubble">Bubble sort</option>
						<option value="gnome">Gnome sort</option>
						<option value="bogo">Bogo sort</option>
					</select>
					<select name="speed" id="speed" value={speed} onChange={e => setSpeed(e.target.value)}>
						<option value="slow">Slow</option>
						<option value="normal">Normal</option>
						<option value="fast">Fast</option>
					</select>
					<button onClick={startSorting}>Start</button>
				</form>
			</div>
		</aside>
	)
}

export default Options