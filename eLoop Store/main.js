//~The input product

var productNameInput = document.getElementById("ProductName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("Category");
var productDescriptionInput = document.getElementById("Description");
var cardDataInput = document.getElementById("cardData");
var imageCardInput = document.getElementById("inputGroupFile02");
var searchInput = document.getElementById("search1");
var invalidMassge = document.getElementById("invalidAlert");
var invalidMassgePrice = document.getElementById("invalidAlertPrice");
var invalidMassgeCategory = document.getElementById("invalidAlertCategory");
var invalidMassgeDescription = document.getElementById(
  "invalidAlertDescription",
);
//!The array that contain the product

var productList = [];
if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList")) || [];
  displayProduct();
}

function created() {
  if (
    validateName() &&
    validatePrice() &&
    validateCategory() &&
    validateDescription()
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
      image: imageCardInput.files[0]
        ? "image/" + imageCardInput.files[0].name
        : "./image/images.jpg",
    };

    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));

    clearProduct();
    totalProducts();
    displayProduct();
    sweetOk();
  }
}
function clearProduct() {
  productNameInput.value = null;
  productPriceInput.value = null; // او ممكن استخدم "" هو هو ال null
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  invalidMassge.innerHTML = "";
  invalidMassgePrice.innerHTML = "";
  invalidMassgeCategory.innerHTML = "";
  invalidMassgeDescription.innerHTML = "";
}

function displayProduct() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `
    
      <div class="col-12 col-sm-6 col-lg-3 g-2">
        <div
          class="card-product card rounded-5 overflow-hidden "
          style=""
        >
          <div class="ratio ratio-4x3">
            <img
              src="${productList[i].image}"
              id="imageCard"
              class="card-img-top object-fit-contain"
              alt="this is mobile"
            />
          </div>
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <span
                class="rounded-pill text-danger fw-bold border border-danger d-inline-block py-1 px-2"
                style="background-color: rgba(225, 29, 46, 0.1)"
              >
                <i
                  class="fa-solid fa-tag fa-2xs"
                  style="color: rgb(241, 21, 21)"
                ></i>
                ${productList[i].category}
              </span>
              <span class="fw-bold text-black fs-5">$ ${productList[i].price}
              </span>
            </div>
            <div class="card-body px-0 pb-0">
              <h5 class="fw-bold">${productList[i].name}</h5>
              <p class="card-text rounded-3 border-3 border-start border-dark p-1">
                ${productList[i].description}
              </p>
            </div>
          </div>
          <div class="py-3 px-3 d-flex gap-2">
            <button
               onclick="updateOne(${i})"
            type="button" class="btn-edit btn text-white fw-bold  w-50">
              <i
                class="fa-solid fa-pen-to-square fa-xs"
                style="color: rgb(225, 225, 225)"
              ></i>
              Edit
            </button>
            <button
    
              type="button"
              onclick="deleteProduct(${i})"
              class="btn btn-outline-danger border-2 fw-bold w-50"
            >
              <i
                class="fa-regular fa-trash-can fa-xs"
                style="color: rgb(241, 21, 21)"
              ></i>
              Delete
            </button>
          </div>
        </div>
      </div>
   
    `;
  }
  cardData.innerHTML = cartona;
}

function deleteProduct(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed)
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    productList.splice(index, 1);
    displayProduct();
    checkEmpty();
    totalProducts();
    localStorage.setItem("productList", JSON.stringify(productList));
  });
}
var indexUpdate;
function updateOne(index) {
  indexUpdate = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;
}
function upDateTwo() {
  productList[indexUpdate].name = productNameInput.value;
  productList[indexUpdate].price = ProductPriceInput.value;
  productList[indexUpdate].category = ProductCategoryInput.value;
  productList[indexUpdate].description = ProductDescriptionInput.value;
  clearProduct();
  displayProduct();
  localStorage.setItem("productList", JSON.stringify(productList));
}
function checkEmpty() {
  if (productList.length === 0) {
    cardData.innerHTML = ` <div class="text-center text-muted"><i class="fa-regular fa-folder-open fa-2xl" style="color: rgb(241, 21, 21);"></i>
      <p class="pt-2">No products yet.Add your first products</p>
      </div>`;
  }
}
checkEmpty();
function totalProducts() {
  var count = document.getElementById("totalProducts");
  count.innerHTML = productList.length;
}
function search() {
  var search = searchInput.value.trim().toLowerCase();
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(search)) {
      cartona += `
      <div class="col-12 col-lg-3">
        <div
          class="card-product card rounded-5 overflow-hidden "
          style="width: 18rem"
        >
          <div class="ratio ratio-4x3">
            <img
              src="${productList[i].image}"
              id="imageCard"
              class="card-img-top object-fit-contain"
              alt="this is mobile"
            />
          </div>
          <div class="p-3">
\              <span
                class="rounded-pill text-danger fw-bold border border-danger d-inline-block py-1 px-2"
                style="background-color: rgba(225, 29, 46, 0.1)"
              >
                <i
                  class="fa-solid fa-tag fa-2xs"
                  style="color: rgb(241, 21, 21)"
                ></i>
                ${productList[i].category}
              </span>
              <span class="fw-bold text-black fs-5">$ ${productList[i].price}
              </span>
            </div>
            <div class="card-body px-0 pb-0">
              <h5 class="fw-bold">${productList[i].name}</h5>
              <p class="card-text rounded-3 border-3 border-start border-dark p-1">
                ${productList[i].description}
              </p>
            </div>
          </div>
          <div class="py-3 px-3 d-flex gap-2">
            <button
               onclick="updateOne(${i})"
            type="button" class="btn-edit btn text-white fw-bold  w-50">
              <i
                class="fa-solid fa-pen-to-square fa-xs"
                style="color: rgb(225, 225, 225)"
              ></i>
              Edit
            </button>
            <button
    
              type="button"
              onclick="deleteProduct(${i})"
              class="btn btn-outline-danger border-2 fw-bold w-50"
            >
              <i
                class="fa-regular fa-trash-can fa-xs"
                style="color: rgb(241, 21, 21)"
              ></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    `;
    }
  }
  cardDataInput.innerHTML = cartona;
}
function validateName() {
  var productNameRegex = /^[A-Z][\w]{3,}$/;
  if (productNameRegex.test(productNameInput.value)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    invalidMassge.innerHTML = ` <p class="mb-0 alert alert-success p-1 mt2">This is valid.</p>`;
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    invalidMassge.innerHTML = ` <p class="mb-0 alert alert-danger p-1 mt2">The name must begin with a capital letter.</p>`;
    return false;
  }
}
function validatePrice() {
  var productPriceRegex = /^[1-9][\d]{3,}$/;
  if (productPriceRegex.test(productPriceInput.value)) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    invalidMassgePrice.innerHTML = ` <p class="mb-0 alert alert-success p-1 mt2">This is valid.</p>`;
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    invalidMassgePrice.innerHTML = ` <p class="mb-0 alert alert-danger p-1 mt2">It must contain numbers starting from 1</p>`;
    return false;
  }
}
function validateCategory() {
  var productCategoryRegex = /^(mobile|tv|labtop)$/i;
  if (productCategoryRegex.test(productCategoryInput.value)) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    invalidMassgeCategory.innerHTML = ` <p class="mb-0 alert alert-success p-1 mt2">This is valid.</p>`;
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    invalidMassgeCategory.innerHTML = ` <p class="mb-0 alert alert-danger p-1 mt2">It must include the device type.</p>`;
    return false;
  }
}
function validateDescription() {
  var productDescriptionRegex = /^.{4,}$/i;
  if (productDescriptionRegex.test(productDescriptionInput.value)) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    invalidMassgeDescription.innerHTML = ` <p class="mb-0 alert alert-success p-1 mt2">This is valid.</p>`;
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    invalidMassgeDescription.innerHTML = ` <p class="mb-0 alert alert-danger p-1 mt2">Enter any description of the device's condition.</p>`;
    return false;
  }
}
function sweetOk() {
  swal.fire({
    icon: "success",
    title: "product is added",
  });
}
function sweetDelet() {}
