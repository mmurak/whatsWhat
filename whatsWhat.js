class GlobalManager {
	constructor() {
		this.prePostAmbles = document.getElementById("PrePostAmbles");
		this.firstSelector = document.getElementById("FirstSelector");
		this.Name = 0;
		this.Phono = 1;
		this.English = 2;
		this.Page = 3;
		this.Children = 4;
		this.areaArray = [];
		this.areaArray.push(document.getElementById("FirstArea"));
		this.areaArray.push(document.getElementById("SecondArea"));
		this.areaArray.push(document.getElementById("ThirdArea"));
		this.openPageButton = document.getElementById("OpenPageButton");
		this.openPageButton.disabled = true;
		this.baseURL = "https://dl.ndl.go.jp/pid/12579871/1/";
	}
}
const G = new GlobalManager();

createSelector(0, tocData);

function createSelAndHeader() {
	const sel = document.createElement("select");
	const opt = document.createElement("option");
	opt.innerHTML = " - select theme - ";
	opt.value = -1;
	sel.appendChild(opt);
	return sel;
}

function combineName(entry) {
	const name = entry[G.Name];
	const eName = entry[G.English];
	const comment = (eName != "") ? "（" + eName + "）" : "";
	return name + comment;
}

function createSelector(level, tocSubArray) {
	for (let i = level; i < G.areaArray.length; i++) {
		G.areaArray[i].innerHTML = "";
	}
	const sel = createSelAndHeader();
	for(let i = 0; i < tocSubArray.length; i++) {
		const opt = document.createElement("option");
		opt.innerHTML = combineName(tocSubArray[i]);
		opt.value = i;
		sel.appendChild(opt);
	}
	sel.addEventListener("change", (evt) => {
		G.prePostAmbles.selectedIndex = 0;
		const selIdx = evt.target.value;
		if (selIdx == -1) return;
		if (tocSubArray[selIdx][G.Page] != null) {
			G.openPageButton.innerHTML = "Open: " + combineName(tocSubArray[selIdx]);
			G.openPageButton.disabled = false;
			G.openPageButton.pValue = tocSubArray[selIdx][G.Page];
		} else {
			G.openPageButton.innerHTML = "Standing by...";
			G.openPageButton.disabled = true;
		}
		if (tocSubArray[selIdx][G.Children].length > 0) {
			createSelector(level+1, tocSubArray[selIdx][G.Children]);
		}
	});
	G.areaArray[level].appendChild(sel);
}

G.openPageButton.addEventListener("click", (evt) => {
	const realPage = Math.trunc(evt.target.pValue / 2) + 12;
	window.open(G.baseURL + realPage, "検索結果");
});

G.prePostAmbles.addEventListener("change", (evt) => {
	if (evt.target.value == 0) return;
	window.open(G.baseURL + evt.target.value, "検索結果");
});
