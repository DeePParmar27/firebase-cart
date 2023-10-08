import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref , push , onValue , remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyBAdcOV-HXxQPHCL2eiAmCRzMxxTkgfz6U",
  authDomain: "shoppingcart-1fb9f.firebaseapp.com",
  databaseURL: "https://shoppingcart-1fb9f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppingcart-1fb9f",
  storageBucket: "shoppingcart-1fb9f.appspot.com",
  messagingSenderId: "333578290916",
  appId: "1:333578290916:web:33954582c61f950cd70ef1",
  measurementId: "G-L3YPJ58Q0L"
};

//initialization of firebase
const app = initializeApp(firebaseConfig); 
const database = getDatabase(app)

const shoppingListInDB = ref(database, "shoppingList")

const inputfieldEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
const shoppingItems =document.getElementById("shopping-list")

addBtn.addEventListener("click",function()
{
    const inputValue = inputfieldEl.value
     push(shoppingListInDB,inputValue)
     clearInputField();
})


function clearInputField()
{
  inputfieldEl.value = ""
}

function clearShoppingList()
{
  shoppingItems.innerHTML = ""
}

function appendingItems(item)
{
  //shoppingItems.innerHTML += `<li>${itemvalue}</li>`

  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")
  newEl.textContent = itemValue
  shoppingItems.append(newEl)

  newEl.addEventListener("click" , function()
  {
    console.log(itemID)
    let excatlocationinDB = ref(database ,`shoppingList/${itemID}`)
    remove(excatlocationinDB)
  })

}

onValue(shoppingListInDB , function(snapshot)
{

    if(snapshot.exists())
    {

    let shoppingListArray = Object.entries(snapshot.val())
    clearShoppingList()                                            //Clear The list  before reprinting it

    for(let i = 0  ; i < shoppingListArray.length ; i++)
    {
      let currentItem = shoppingListArray[i]

      let currentItemValue = currentItem[1]
      let currentItemkeys = currentItem[0]

      appendingItems(currentItem) 

    }

  }

  else{
    shoppingItems.innerHTML = "please Add some items.......here"
  }

})
