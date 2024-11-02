let myUl = document.querySelector(".myUl");

let myForm = document.querySelector(".content");

let items = [];

function addItems(e) {
  e.preventDefault();

  let text = this.querySelector("[name=text]").value;

  let item = {
    text,

    done: false,
  };

  items.push(item);

  /*   this function will be populate with mapping 
our items array to create our ul li element and checkbox and label
 */

  populateList(items, myUl);

  this.reset();
}

function populateList(plates = [], platesList) {
  let myPlates = plates
    .map((plate, index) => {
     
     return   `

            <li>
            <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? "checked" :""}/>
           <label for="item${index}"> ${plate.text}</label>
            </li>
        
        `;
    })
    .join("");

  platesList.innerHTML = myPlates;
}
myForm.addEventListener("submit", addItems);
