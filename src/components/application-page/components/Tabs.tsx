import React from 'react';

export default class Tabs extends React.Component<any,any>{
	tabs = new Map()
	
	constructor(props: any) {
		super(props)


		/* 
		
		TO NIE JEST SKONCZONE, NIE DOKONCZE TEGO NARAZIE BO JESTEM NA WYJEZDZIE, A NIE CHCE MARNOWAC ROAMINU NA LOADING FONTA, DOKONCZE TO Z ILYA JAK PRZYJADE DO DOMU

			------ ZAMYSL WSTEPNY JEST TAKI JAK PONIZEJ ------

														~ Filip

		*/

		this.tabs.set(
			"interests",
				<div className="interests tab fadeIn">
					<div className="interests-span">Wybierz zainteresowanie nauczania:</div>
					<form id="interests-form">
							<div>
								<input type="radio" name="interests" id="coding-applications"/>
								<label htmlFor="coding-applications">Programowanie aplikacji</label>
							</div>
							<div>
								<input type="radio" name="interests" id="network-administration"/>
								<label htmlFor="network-administration">Administracja sieci</label>
							</div>
							<div>
								<input type="radio" name="interests" id="computer-graphics"/>
								<label htmlFor="computer-graphics">Grafika komputerowa</label>
							</div>
							<div>
								<input type="radio" name="interests" id="web-development"/>
								<label htmlFor="web-development">Web Development</label>
							</div>
					</form>
				</div>
		);
		this.tabs.set("interests.onchange", () => {

			if (this.tabs.get("interests-form.values") !== undefined) {
				for (let i = 0; i < document.querySelectorAll("form#interests-form input").length; i++) {
					console.error(this.tabs.get("interests-form.values")[i]);
					if (this.tabs.get("interests-form.values")[i] !== false){
						document.querySelectorAll("form#interests-form input")[i].setAttribute("checked", this.tabs.get("interests-form.values")[i]);
					}
				}
			}

			this.setState({
				interests_form_eventListener: (h:any) => {
					console.error(h.currentTarget.id);
					let arr = new Array();
					document.querySelectorAll(`form#${h.currentTarget.id} input`).forEach((b) => arr.push(b.matches(":checked")));
					this.tabs.set(`${h.currentTarget.id}.values`, arr);
					console.log(arr);
	
					if (this.state.tabTimeout)
						clearTimeout(this.state.tabTimeout);
	
					document.querySelectorAll(`div#personal-data`)[0].classList.remove('disabled');
	
					this.setState({
						tabTimeout: setTimeout(() => this.changeTab("personal-data"), 250)
					});
				}
			})

			document.querySelectorAll("form#interests-form")[0].addEventListener("change", (h) => this.state.interests_form_eventListener(h));
		});
		this.tabs.set("interests.beforeunmount", () => {
			console.warn("interests.beforeunmount();");
			document.querySelectorAll("form#interests-form")[0].removeEventListener("change", (h) => this.state.interests_form_eventListener(h));
		});

		this.tabs.set(
			"personal-data",
				<div className="personal-data tab fadeIn">
					<span>Podaj dane przyszłego ucznia:</span>
					<form id="personal-data__form">
						<input type="text" name="first-name" placeholder="Imię ucznia"/>
						<input type="text" name="last-name" placeholder="Nazwisko ucznia"/><br/>

						<input type="text" name="postal-code" placeholder="Kod pocztowy"/>
						<input type="text" name="city" placeholder="Miejscowość"/><br/>

						<input type="text" name="street" placeholder="Ulica"/>
						<input type="text" name="email" placeholder="Adres e-mailowy"/><br/>
						<input type="text" name="phone-number" placeholder="Numer telefonu"/>
					</form>
				</div>,
		);
		this.tabs.set("personal-data.onchange", () => console.log());

		this.tabs.set(
			"summary",
				<div className="summary tab fadeIn">
					<span>"summary"</span>
				</div>
		);
		this.tabs.set("summary.onchange", () => alert(1));


		this.state = {
			selectedTab: this.tabs.get("interests"),
			selectedTabId: "interests"
		}

	}

	componentDidMount = () => this.tabs.get(`interests.onchange`)()

	changeTab(tabToChange:string) {
		if (tabToChange === this.state.selectedTabId) return;

		if (this.tabs.get(`${this.state.selectedTabId}.beforeunmount`) !== undefined)
			this.tabs.get(`${this.state.selectedTabId}.beforeunmount`)();

		if (document.querySelectorAll(`div#${tabToChange}`)[0].classList.contains("disabled")) return;

		document.querySelectorAll(`div.${this.state.selectedTabId}`)[0].classList.add('fadeOut');
		document.querySelectorAll(`div#${tabToChange}`)[0].classList.add('active');
		document.querySelectorAll(`div#${this.state.selectedTabId}`)[0].classList.remove('active');
		setTimeout(async () => {
			this.setState({
				selectedTab: this.tabs.get(tabToChange),
				selectedTabId: tabToChange
			});
			this.tabs.get(`${tabToChange}.onchange`)();
		}, 375);
	}


	render() {
		return (
			<div id="tabs">
				<div className="tab-selectors">
					<div className="tab-selector active" id="interests" onClick={() => this.changeTab('interests')}>
						Zainteresowania
					</div>
					<div className="tab-selector disabled" id="personal-data" onClick={() => this.changeTab('personal-data')}>
						Dane Osobowe
					</div>
					<div className="tab-selector disabled" id="summary" onClick={() => this.changeTab('summary')}>
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