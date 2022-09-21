// product management
//let selectRow, row;
//const formSave = document.getElementById("form");

const onFormSubmit =() => {
        if(document.getElementById("PName").value == "" || document.getElementById("descProduct").value == "" ){
            if(document.getElementById("descProduct").value){
                    alert("Description of Product is Required.");
            }
            else{
                    alert("Name of Product is Required.");
            }
        }
        else{
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
                console.log(productData);
                productList.push(productData);
                localStorage.productData = JSON.stringify(productList);
                //localStorage.setItem("productData", JSON.stringify(productjsonObj));
                //console.log(productjsonObj);
                console.log(productList);
                return productData;
            }
            
            readFormData();
            
            const resetForm = () => {
                document.getElementById("PName").value = "";
                document.getElementById("Pimage").value = "";
                document.getElementById("descProduct").value = "";
                document.getElementById("a'bad").checked = false;
                document.getElementById("baroda").checked = false;
                document.getElementById("surat").checked = false;
                document.getElementById("rajkot").checked = false;
                document.getElementById("g'nagar").checked = false;
                document.getElementById("Price").value = "";

            }
            resetForm();
        }
    
}

let productList = [];
let trashList = [];

const init = () => {
    if(localStorage.productData){
        productList = JSON.parse(localStorage.productData);
        console.log(productList);
        
        productList.forEach((value, index) => {
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

            let productView = document.createElement("button");
            productView.setAttribute("id","proView");
            productView.setAttribute("class","btn btn-info btn-lg");
            let btnView = document.createTextNode("View");
            productView.appendChild(btnView);

            let productEdit = document.createElement("button");
            productEdit.setAttribute("id","proEdit");
            productEdit.setAttribute("class","btn btn-primary btn-lg");
            let btnEdit = document.createTextNode("Edit");
            productEdit.appendChild(btnEdit);

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
            document.querySelector(`#productContaint${index}`).appendChild(productView);
            document.querySelector(`#productContaint${index}`).appendChild(productEdit);
            document.querySelector(`#productContaint${index}`).appendChild(productRemove);

            productTitle.innerHTML = value.productName;
            productAboutData.innerHTML = value.descProduct;
            productImg.setAttribute("src", value.productImage);
            productImg.innerHTML;
            productPrice.innerHTML = value.productPrice;
            
            productView.onclick = function(){
                document.location.href = "./details.html";
            }
            
            productEdit.onclick = function(){
                //document.getElementById("PName").value = productTitle.innerHTML;
                //document.getElementById("Pimage").value = productImg.innerHTML;
                //document.getElementById("descProduct").value = productAboutData.innerHTML;
                //document.getElementById("Price").value = productPrice.innerHTML;
                document.location.href = "./productForm.html";
            }
            
            productRemove.onclick = function(){
                if(confirm("Are you sure to move this record to Trash?")){
                    
                    //console.log(productList[index]);
                    trashList.push(productList[index]);
                    console.log(trashList);
                    productList.pop(productList[index]);
                    console.log(productList);
                    localStorage.setItem("trashData", JSON.stringify(trashList));
                    localStorage.setItem("productData", JSON.stringify(productList));
                    document.location.href = "./index.html";
                    
                }
                }
        });


    }
    
}
init();

let sBox = document.getElementById('sBox');
   sBox.addEventListener('keyup', function(event){
      const searchName = () => {
        let filter, name, i, txtValue, filterData = [];
        filter = sBox.value.toUpperCase();
        
        for (i = 0; i < productList.length; i++) {
            name = productList[i].productName.toUpperCase();
            if(name.includes(filter)){
                filterData.push(productList[i])
            }
            /*td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            } */      
        }
      }
      searchName();
      event.preventDefault()
   })