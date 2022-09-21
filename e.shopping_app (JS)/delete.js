
let productList = [];
let trashList = [];

const init = () => {
    if(localStorage.productData || localStorage.trashData){
        productList = JSON.parse(localStorage.productData);
        console.log(productList);
        trashList = JSON.parse(localStorage.trashData);
        console.log(trashList);
        
        trashList.forEach((value, index) => {
            console.log(index, value);

            let productContent = document.createElement("div");
            productContent.setAttribute("id",`productContaint${index}`);
            productContent.setAttribute("class", "card");

            let productBtnContent = document.createElement("div");
            productBtnContent.setAttribute("id", "btnContent");

            let productAnchorDetails = document.createElement("A");
            productAnchorDetails.setAttribute("id", "achorDetails");
            //productAnchorDetails.setAttribute("href", "./details.html");

            let productImg = document.createElement("img");
            productImg.setAttribute("id", "proImg");

            let productTitle = document.createElement("H3");
            productTitle.setAttribute("id","proTitle");

            let productAboutData = document.createElement("p");
            productAboutData.setAttribute("id","proData");
                        
            let productPrice = document.createElement("H5");
            productPrice.setAttribute("id","proPrice");

            let productRestore = document.createElement("button");
            productRestore.setAttribute("id","proRestore");
            productRestore.setAttribute("class","btn btn-info btn-lg");
            let btnRestore = document.createTextNode("Restore");
            productRestore.appendChild(btnRestore);

           /* let productEdit = document.createElement("button");
            productEdit.setAttribute("id","proEdit");
            productEdit.setAttribute("class","btn btn-primary btn-lg");
            let btnEdit = document.createTextNode("Edit");
            productEdit.appendChild(btnEdit);*/

            let productRemove = document.createElement("button");
            productRemove.setAttribute("id","proRemove");
            productRemove.setAttribute("class","btn btn-danger btn-lg");
            let btnRemove = document.createTextNode("Remove");
            productRemove.appendChild(btnRemove);
            document.querySelector("#containt").appendChild(productContent);
            document.querySelector(`#productContaint${index}`).appendChild(productAnchorDetails);
            document.querySelector(`#productContaint${index}`).appendChild(productTitle);
            document.querySelector(`#productContaint${index}`).appendChild(productImg);
            document.querySelector(`#productContaint${index}`).appendChild(productAboutData);
            document.querySelector(`#productContaint${index}`).appendChild(productPrice);
            document.querySelector(`#productContaint${index}`).appendChild(productBtnContent);
            document.querySelector(`#productContaint${index}`).appendChild(productRestore);
           // document.querySelector(`#productContaint${index}`).appendChild(productEdit);
            document.querySelector(`#productContaint${index}`).appendChild(productRemove);

            productTitle.innerHTML = value.productName;
            productAboutData.innerHTML = value.descProduct;
            productImg.setAttribute("src", value.productImage);
            productImg.innerHTML;
            productPrice.innerHTML = value.productPrice;
            
            productRestore.onclick = function(){
                if(confirm("Are you sure to move/restore  this record to Main Product List?")){
                    //let i = productList.length + 1;
                    productList.push(trashList[index]);
                    console.log(trashList);
                    trashList.pop(trashList);
                    console.log(productList);
                    localStorage.setItem("trashData", JSON.stringify(trashList));
                    localStorage.setItem("productData", JSON.stringify(productList));

                    document.location.href = "./index.html";
                }
            }

            productRemove.onclick = function(){
                if(confirm("Are you sure to move this record to Trash?")){
                    
                    trashList.pop;
                    localStorage.removeItem("trashData");
                    console.log(trashtList);
                    localStorage.setItem("trashData", JSON.stringify(trashList));
                    document.location.href = "./trash.html";
                }
                
                }
            
        });


    }
    
}
init();

const readFormData = () => {
    let productData = {} ;
    let inputCheckBox = [],inputRadio = [], checkedRadio = [], checkedBox = [];
    productData["productName"] = document.getElementById("PName").value;
    productData["productImage"] = document.getElementById("Pimage").value;
    productData["descProduct"] = document.getElementById("descProduct").value;
    inputCheckBox = document.querySelectorAll('input[type = "checkbox"]');
    inputCheckBox.forEach((input) => {
        if(input.checked == true){
            checkedBox.push({id: input.id, checked: input.checked});
        }
    });
    productData["productLocation"] = checkedBox;
    inputRadio = document.querySelectorAll('input[type = "radio"]');
    inputRadio.forEach((inradio) => {
        if(inradio.checked == true){
            checkedRadio.push({id: inradio.id, checked: inradio.checked});
        }
    });
    productData["productStock"] = checkedRadio;
    productData["productPrice"] = document.getElementById("Price").value;
    productList.push(productData);
    localStorage.productData = JSON.stringify(productList);
    //localStorage.setItem("productData", JSON.stringify(productjsonObj));
    //console.log(productjsonObj);
    console.log(productList);
    return productData;
    
}
//let productData = readFormData();


