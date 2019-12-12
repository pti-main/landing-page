import React from 'react';

export default class Tabs extends React.Component<any,any>{
	tabs = new Map()
	
	constructor(props: any) {
		super(props)

		this.tabs.set(
			"interests",
				<div className="interests tab fadeIn">
					<span>"interests"</span>
				</div>
		);

		this.tabs.set(
			"personal-data",
				<div className="personal-data tab fadeIn">
					<span>"personal-data"</span>
				</div>,
		);

		this.tabs.set(
			"summary",
				<div className="summary tab fadeIn">
					<span>"summary"</span>
				</div>
		);

		this.state = {
			selectedTab: this.tabs.get("interests"),
			selectedTabId: "interests"
		}

	}

	changeTab(tabToChange:string) {
		if (tabToChange === this.state.selectedTabId) return;

		document.querySelectorAll(`div.${this.state.selectedTabId}`)[0].classList.add('fadeOut');
		document.querySelectorAll(`div#${this.state.selectedTabId}`)[0].classList.remove('active');
		setTimeout(async () => {
			this.setState({
				selectedTab: this.tabs.get(tabToChange),
				selectedTabId: tabToChange
			});
			document.querySelectorAll(`div#${tabToChange}`)[0].classList.add('active');
		}, 375);
	}


	render() {
		return (
			<div id="tabs">
				<div className="tab-selectors">
					<div className="tab-selector active" id="interests" onClick={() => this.changeTab('interests')}>
						Zainteresowania
					</div>
					<div className="tab-selector" id="personal-data" onClick={() => this.changeTab('personal-data')}>
						Dane Osobowe
					</div>
					<div className="tab-selector" id="summary" onClick={() => this.changeTab('summary')}>
						Podsumowanie
					</div>
				</div>
				<div className="tab-view">
					{this.state.selectedTab}
				</div>
			</div>
		)
	}
}