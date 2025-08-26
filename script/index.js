console.log(" hello DOM");

function getElement(id) {
    const element = document.getElementById(id)
    return element
}


// // Event                   Delegation                          technique  

getElement("product-box").addEventListener("click", function (e) {
    if (e.target.className.includes("cart-btn")) {
        const btn = e.target;

        const productImg = btn.parentNode.parentNode.parentNode.children[0].children[0].src
        const productTitle = btn.parentNode.parentNode.children[0].innerText
        const productPrice = btn.parentNode.parentNode.children[2].children[0].innerText


        const totalPrice = getElement("total-price").innerText


        let currentPrice = Number(productPrice) + Number(totalPrice)


        getElement("total-price").innerText = currentPrice.toFixed(2)




        const cartContainer = getElement("cart-container")
        cartContainer.classList.add("block")

        const newCart = document.createElement("div")

        newCart.innerHTML = `  <div class="flex justify-between rounded-xl  bg-gray-200 p-4 ">
                    
                            <img src="${productImg}" alt="" class="w-10">
                
                        <div>
                            <h2 class="font-bold"> ${productTitle}</h2>
                            <h2 class="font-bold"> ${productPrice} TK</h2>
                        </div>
                       </div>`



        cartContainer.append(newCart)

        const quantity = getElement("total-quantity").innerText;

        getElement("total-quantity").innerText = Number(quantity) + 1





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