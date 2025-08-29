console.log(" hello DOM");

function getElement(id) {
    const element = document.getElementById(id)
    return element
}


// // Event                   Delegation                          technique  

const cartContainer = getElement("cart-container")

getElement("product-box").addEventListener("click", function (e) {
    if (e.target.className.includes("cart-btn")) {
        const btn = e.target;

        const productImg = btn.parentNode.parentNode.parentNode.children[0].children[0].src
        const productTitle = btn.parentNode.parentNode.children[0].innerText
        const productPrice = btn.parentNode.parentNode.children[2].children[0].innerText
        // console.log(productTitle)


        //         const totalPrice = getElement("total-price").innerText
        //         let currentPrice = Number(productPrice) + Number(totalPrice)
        // getElement("total-price").innerText = currentPrice.toFixed(2)

        const cartHtmlCollection = document.getElementsByClassName("cart-product-title")
        const arrayOfTitle = Array.from(cartHtmlCollection)
        const isItemInCart = arrayOfTitle.find(item => item.innerText.trim() === productTitle);
        // console.log(isItemInCart)
        // console.log(isItemInCart)

        if (isItemInCart) {
            const currentItemDiv = isItemInCart.parentNode.parentNode
            const quantitySpan = currentItemDiv.querySelector(".product-quantity")
            const nowQuantity = parseInt(quantitySpan.innerText) + parseInt(1);
            quantitySpan.innerText = nowQuantity;
            const priceSpan = currentItemDiv.querySelector(".totalCostForOneItem")
            const nowPrice = productPrice * nowQuantity
            priceSpan.innerText = nowPrice.toFixed(2)
            updateTotalPrice();
            updateQuantity()
        }
        else {

            const newCart = document.createElement("div")

            newCart.innerHTML = `            <div class="flex justify-between rounded-xl  bg-gray-200 p-4">
                          
                                  <img src="${productImg}" alt="" class="w-10">
      
                          <div>
                              <div> <button class="product-minus  "> - </button> <span class="product-quantity my-2"> 1 </span> <button class="product-add"> + </button></div>
                              <div class="hidden"> <span > ${productPrice}</span> TK </div>
                          </div>
                      
                              <div>
                                  <h2 class="font-bold cart-product-title"> ${productTitle}</h2>
                                  <h2 class="font-bold"> <span class="totalCostForOneItem">${productPrice}</span> TK</h2>
                              </div>
                             </div>`



            cartContainer.append(newCart)
            updateTotalPrice();
            updateQuantity()
        }


        // const quantity = getElement("total-quantity").innerText;

        // getElement("total-quantity").innerText = Number(quantity) + 1





        const clear = getElement("delete-btn")

        clear.addEventListener("click", function () {
            const cartContainer = getElement("cart-container")
            cartContainer.innerHTML = "";
            const totalPrice = getElement("total-price")
            totalPrice.innerText = Number(0)
            const quantity = getElement("total-quantity")
            quantity.innerText = Number(0)

        })


    }

})

cartContainer.addEventListener("click", (e) => {
    if (e.target.className.includes("product-minus")) {
        const button = e.target;
        const quantity = button.parentNode.children[1]
        const price = button.parentNode.parentNode.children[1].children[0].innerText
        const nowQuantity = Number(quantity.innerText) - Number(1);
        if (nowQuantity < 0) {
            return
        }
        quantity.innerText = nowQuantity;
        const nowPrice = button.parentNode.parentNode.parentNode.children[2].children[1].children[0]
        nowPrice.innerText = (price * nowQuantity).toFixed(2)
        updateTotalPrice();
        updateQuantity()

    }
    if (e.target.className.includes("product-add")) {
        const button = e.target;
        const quantity = button.parentNode.children[1]
        const price = button.parentNode.parentNode.children[1].children[0].innerText
        const nowQuantity = Number(quantity.innerText) + Number(1)
        quantity.innerText = nowQuantity;
        const nowPrice = button.parentNode.parentNode.parentNode.children[2].children[1].children[0]
        nowPrice.innerText = (price * nowQuantity).toFixed(2)
        updateTotalPrice();
        updateQuantity()
    }
})



function updateQuantity() {
    const quantityElement = cartContainer.querySelectorAll(".product-quantity")
    let totalQuantity = 0
    quantityElement.forEach(el => {
        totalQuantity += Number(el.innerText)
    })
    getElement("total-quantity").innerText = Number(totalQuantity)
}

function updateTotalPrice() {
    const priceElement = cartContainer.querySelectorAll(".totalCostForOneItem")
    let totalPrice = 0
    priceElement.forEach(el => {
        totalPrice += Number(el.innerText)
    })
    getElement("total-price").innerText = Number(totalPrice).toFixed(2)
}