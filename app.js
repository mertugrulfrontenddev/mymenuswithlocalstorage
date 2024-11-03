let myUl = document.querySelector(".myUl");

let myForm = document.querySelector(".content");

let items = JSON.parse(localStorage.getItem("items")) || [];

function addItems(e) {
  e.preventDefault();

  let text = this.querySelector("[name=text]").value;

  let item = {
    text,

    done: false,
  };

  items.push(item);

 
  populateList(items, myUl);

  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

 /*   this function will be populate with mapping 
our items array to create our ul li element and checkbox and label
 */


function populateList(plates = [], platesList) {
  let myPlates = plates
    .map((plate, index) => {
      let upperPlateText =
        plate.text.charAt(0).toUpperCase() + plate.text.slice(1).toLowerCase();
      return `

            <li>

            <div class="content_ul">
            <input type="checkbox" data-index=${index} id="item${index}" ${
        plate.done ? "checked" : ""
      }/>
           <label for="item${index}"> ${upperPlateText}</label>
           <span > <a href="#" data-index=${index} class="deleteLink" ><i class="fa-regular fa-square-minus"></i></a></span>

           </div>
            </li>
        
        `;
    })
    .join("");

  platesList.innerHTML = myPlates;
}
//end




//this function manage checkboxes check status
function toggleDone(e) {
  if (e.target.tagName === "INPUT") {
    let checkBox = e.target;

    let checkBoxIndex = checkBox.dataset.index;

    items[checkBoxIndex].done = !items[checkBoxIndex].done;
    localStorage.setItem("items", JSON.stringify(items));

    populateList(items, myUl);
  }
}
//end



//this function is used for delete one item from our array.
function deleteItem(e) {
  console.log(e.target);
  if (e.target.tagName === "I") {
    console.log(e.target);
    let linkIndex = e.target.dataset.index;

    items.splice(linkIndex, 1);
    localStorage.setItem("items", JSON.stringify(items));

    populateList(items, myUl);
  }
}

//end

myForm.addEventListener("submit", addItems);//this eventlistener for our form 

myUl.addEventListener("click", deleteItem);// this eventlistener for our Ul element
myUl.addEventListener("click", toggleDone);// this eventlistener for our Ul element for toggleDOne 
myUl.addEventListener("click", deleteItem);//this eventlistener for manage deleting item from ullist

populateList(items, myUl);
