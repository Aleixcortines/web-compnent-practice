const template = document.createElement("template");
template.innerHTML = `
  <style>
  .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: green 5px solid;
	}

	.user-card img {
		width: 100%;
	}

	.user-card button {
		cursor: pointer;
		background: green;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 5px 10px;
  }
  .box-price{
    display: flex;
  }
  </style>
  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
      <div class="box-price">Original price: 
        <div id='initial'></div> 
      </div>

      <div class="box-price">Modified price: 
        <div id='modified'></div> 
      </div>
      <form> 
        <input type="number" id='input'> </input>
        <button id='edit'>Edit</button>
        <button id='clean'>Clean</button>
      </form>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("#initial").innerText = this.getAttribute(
      "initial"
    );
    this.shadowRoot.querySelector("#modified").innerText = this.getAttribute(
      "modified"
    );
    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector(".info");
    const toggleBtn = this.shadowRoot.querySelector("#toggle-info");

    if (this.showInfo) {
      info.style.display = "block";
      toggleBtn.innerText = "Hide Info";
    } else {
      info.style.display = "none";
      toggleBtn.innerText = "Show Info";
    }
  }

  edit(e) {
    e.preventDefault();
    const value = this.shadowRoot.querySelector("#input").value;
    const initialValue = this.getAttribute("initial");
    const modifiedValue = this.getAttribute("modified");
    const modifiedValueTag = this.shadowRoot.querySelector("#modified");

    console.log(modifiedValue);
    console.log(initialValue);

    modifiedValueTag.innerHTML = value * modifiedValue;
  }

  clean() {
    this.shadowRoot.querySelector("#input").innerHTML = "";
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle-info")
      .addEventListener("click", () => this.toggleInfo());

    this.shadowRoot
      .querySelector("#edit")
      .addEventListener("click", (event) => this.edit(event));

    this.shadowRoot
      .querySelector("#clean")
      .addEventListener("click", () => this.clean());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener();
    this.shadowRoot.querySelector("#edit").removeEventListener();
    this.shadowRoot.querySelector("#clean").removeEventListener();
  }
}

window.customElements.define("user-card", UserCard);
