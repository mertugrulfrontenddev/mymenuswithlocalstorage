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

  /*   this function will be populate with mapping 
our items array to create our ul li element and checkbox and label
 */

  populateList(items, myUl);

  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  let myPlates = plates
    .map((plate, index) => {
      return `

            <li>

            <div class="content_ul">
            <input type="checkbox" data-index=${index} id="item${index}" ${
        plate.done ? "checked" : ""
      }/>
           <label for="item${index}"> ${plate.text}</label>
           <span > <a href="#" data-index=${index} class="deleteLink" ><i class="fa-regular fa-square-minus"></i></a></span>

           </div>
            </li>
        
        `;
    })
    .join("");

  platesList.innerHTML = myPlates;
}

function toggleDone(e) {
  if (e.target.tagName === "INPUT") {
    let checkBox = e.target;

    let checkBoxIndex = checkBox.dataset.index;

    items[checkBoxIndex].done = !items[checkBoxIndex].done;
    localStorage.setItem("items", JSON.stringify(items));

    populateList(items, myUl);
  }
}


function deleteItem(e){

  console.log(e.target);
  if(e.target.tagName==="I"){


    console.log(e.target);
    let linkIndex=e.target.dataset.index;

    items.splice(linkIndex,1);
    localStorage.setItem("items", JSON.stringify(items));

    populateList(items, myUl);


  }


}


myForm.addEventListener("submit", addItems);

myUl.addEventListener("click", deleteItem);
myUl.addEventListener("click", toggleDone);
myUl.addEventListener("click", deleteItem);



populateList(items, myUl);
