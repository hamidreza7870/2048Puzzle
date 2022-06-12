function gameBoard() {
	let size = 4;
	let board = document.createElement('div');
	board.className = 'grid';
	board.dataset.value = 0;
	board.id = " ";
	for (let i = 0; i < size; i++) {
		let row = document.createElement('div');
		board.appendChild(row);
		row.id = 'row' + (i);
		row.className = 'grid_row';
		for (let j = 0; j < size; j++) {
			let col = document.createElement('div');
			col.id = '' + (i + 1) + (j + 1);
			col.className = 'grid_cell';
			row.appendChild(col);
		}
		document.body.appendChild(board);
	}
	return board;
}

function randomNumber(k, time) {
	for (let i = 0; i < k; i++) {
		for (let value = 1; value < 2; value++) {
			var randomX = Math.floor((Math.random() * 4) + 1);
			var randomY = Math.floor((Math.random() * 4) + 1);
			let checker = document.getElementById('' + randomX + randomY);
			if (checker.innerHTML != '') {
				value = 0;
			}
		}
		let randomValue = Math.floor(Math.random()) > 0.8 ? 4 : 2;
		let position = document.getElementById('' + randomX + randomY);
		let tile = document.createElement('div');
		position.appendChild(tile);
		tile.innerHTML = '' + randomValue;
		colorSet(randomValue, tile);
		tile.data = '' + randomValue;
		tile.id = 'tile_' + randomX + randomY;
		position.classList += " active";
		tile.dataset.value = '' + randomValue;
		if (time == 0) {
			tile.classList = 'tile ' + randomValue;
		} else {
			setTimeout(function () {
				tile.className = 'tile ' + randomValue;
			}, 30);
		}
	}
}

function reset() {
	for (let x = 1; x < 5; x++) {
		for (let y = 1; y < 5; y++) {
			let resetter = document.getElementById('' + x + y);
			if (resetter.className == 'grid_cell active') {
				let tile = document.getElementById('tile_' + x + y);
				resetter.removeChild(tile);
			}
		}
	}
	document.getElementById('status').className = '';
	document.getElementById(' ').dataset.value = 0;
	score();
	cellReset();
	randomNumber(2, 0);
}

document.onkeydown = directions;
function directions(e) {
	e = window.event;
	//up
	// let d = 0;
	if (e.keyCode == '38') {
		let count = 2;
		for (let x = 2; x > 1; x--) {
			for (let y = 1; y < 5; y++) {
				moveTilesMain(x, y, -1, 0, 1, 0);
			}
			if (x == 2) {
				x += count;
				count++;
			}
			if (count > 4) {
				break;
			}
		}
		cellReset();
	}
	//down
	else if (e.keyCode == '40') {
		let count = -2;
		let test = 1;
		for (let x = 3; x < 4; x++) {
			for (let y = 1; y < 5; y++) {
				moveTilesMain(x, y, 1, 0, 4, 0);
			}
			if (x == 3) {
				x += count;
				count--;
			}
			if (count < -4) {
				break;
			}
		}
		cellReset();
	}
	// left
	else if (e.keyCode == '37') {
		let count = 2;
		let test = 1;
		for (let x = 2; x > 1; x--) {
			for (let y = 1; y < 5; y++) {
				moveTilesMain(y, x, 0, -1, 0, 1);
			}
			if (x == 2) {
				x += count;
				count++;
			}
			if (count > 4) {
				break;
			}
		}
		cellReset();
	}
	//right
	else if (e.keyCode == '39') {
		let count = -2;
		let c = 1;
		let d = 0;
		for (let x = 3; x < 4; x++) {
			for (let y = 1; y < 5; y++) {
				moveTilesMain(y, x, 0, 1, 0, 4, c, d);
			}
			if (x == 3) {
				x += count;
				count--;
			}
			if (count < -4) {
				break;
			}
		}
		cellReset();
	}
}

function moveTilesMain(x, y, X, Y, xBorder, yBorder, c, d) {
	let tile = document.getElementById('tile_' + x + y);
	let checker = document.getElementById('' + x + y);
	let xAround = x + X;
	let yAround = y + Y;
	if (xAround > 0 && xAround < 5 && yAround > 0 && yAround < 5 && checker.className == 'grid_cell active') {
		let around = document.getElementById('' + xAround + yAround);
		if (around.className == 'grid_cell active') {
			let aroundTile = document.getElementById('tile_' + xAround + yAround);
			if (aroundTile.innerHTML == tile.innerHTML) {
				let value = tile.dataset.value * 2;
				aroundTile.dataset.value = '' + value;
				aroundTile.className = 'tile ' + value;
				aroundTile.innerHTML = '' + value;
				colorSet(value, aroundTile);
				checker.removeChild(tile);
				checker.className = 'grid_cell';
				around.className = 'grid_cell active merged';
				document.getElementsByClassName('grid').id = 'moved';
				document.getElementsByClassName('grid').className = 'grid ' + value;
				let grid = document.getElementById(' ');
				let scoreValue = parseInt(grid.dataset.value);
				let newScore = value + scoreValue;
				grid.dataset.value = newScore;
				let score = document.getElementById('value');
				score.innerHTML = '' + newScore;
				// if (document.getElementById('valueHigh').innerHTML < newScore) {
				// 	document.getElementById('valueHigh').innerHTML = Math.max(newScore)
				// }
			}
		} else if (around.className == 'grid_cell') {
			around.appendChild(tile);
			around.className = 'grid_cell active';
			tile.id = 'tile_' + xAround + yAround;
			checker.className = 'grid_cell';
			document.getElementsByClassName('grid').id = 'moved';
		}
	}
}

function cellReset() {
	let count = 0;
	let a = document.getElementsByClassName('grid').id;
	for (let x = 1; x < 5; x++) {
		for (let y = 1; y < 5; y++) {
			let resetter = document.getElementById('' + x + y);
			if (resetter.innerHTML != '') {
				count++;
			}
			if (resetter.innerHTML == '') {
				resetter.className = 'grid_cell';
			}
			if (resetter.className == 'grid_cell active merged') {
				resetter.className = 'grid_cell active'
			}
		}
	}
	if (count == 16) {
		document.getElementById('status').className = 'lose';
	} else if (document.getElementsByClassName('grid').id == 'moved') {
		randomNumber(1, 1);
	}
	document.getElementsByClassName('grid').id = ' ';
}

function score() {
	let grid = document.getElementById(' ');
	let value = grid.dataset.value;
	document.getElementById('value').innerHTML = '' + value;
} 

function colorSet(value, tile) {
	switch (value) {
		case 2:
			tile.style.background = '#eee4da';
			tile.style.color = '#776e65';
			break;
		case 4:
			tile.style.background = '#ece0c8';
			tile.style.color = '#776e65';
			scale(tile);
			break;
		case 8:
			tile.style.background = '#f2b179';
			tile.style.color = 'white';
			scale(tile);
			break;
		case 16:
			tile.style.background = '#f59563';
			tile.style.color = 'white';
			scale(tile);
			break;
		case 32:
			tile.style.background = '#f57c5f';
			tile.style.color = 'white';
			scale(tile);
			break;
		case 64:
			tile.style.background = '#f65d3b';
			tile.style.color = 'white';
			scale(tile);
			break;
		case 128:
			tile.style.background = '#edce71';
			tile.style.color = 'white';
			tile.style.fontSize = '50px';
			scale(tile);
			break;
		case 256:
			tile.style.background = '#edcc61';
			tile.style.color = 'white';
			tile.style.fontSize = '50px';
			scale(tile);
			break;
		case 512:
			tile.style.background = '#ecc850';
			tile.style.color = 'white';
			tile.style.fontSize = '50px';
			scale(tile);
			break;
		case 1024:
			tile.style.background = '#edc53f';
			tile.style.color = 'white';
			tile.style.fontSize = '40px';
			scale(tile);
			break;
		case 2048:
			tile.style.background = '#f6c82f';
			tile.style.color = 'white';
			tile.style.fontSize = '40px';
			document.getElementById('status').className = 'win';
			scale(tile);
			break;
		case 4096:
			tile.style.background = '#468499';
			tile.style.color = 'white';
			tile.style.fontSize = '40px';
			scale(tile);
			break;
		case 8192:
			tile.style.background = '#0E2F44';
			tile.style.color = 'white';
			tile.style.fontSize = '40px';
			scale(tile);
			break;
	}
}

function scale(tile) {
	tile.style.animation = 'mix 200ms ease 100ms backwards';
	setTimeout(() => {
	}, 400);
}

function refresh() {
	document.getElementsByClassName('.reset').onclick = location.reload(true)
	if (document.getElementById('valueHigh').innerHTML < newScore) {
		document.getElementById('valueHigh').innerHTML = Math.max(newScore)
	}
}
window.onload = function () {
	gameBoard();
	randomNumber(2, 0);
	directions();
	score(0);
};