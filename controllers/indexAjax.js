function getListProductApi() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll",
    method: "GET",
  });
  promise.then(function (result) {
    console.log(result.data);
    renderProduct(result.data);
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

window.onload = function () {
  getListProductApi();
};

document.querySelector("#btnCreate").onclick = function () {
  var product = new Product();
  product.id = document.querySelector("#id").value;
  product.name = document.querySelector("#name").value;
  product.price = document.querySelector("#price").value;
  product.img = document.querySelector("#img").value;
  product.type = document.querySelector("#type").value;
  product.description = document.querySelector("#description").value;

  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: product,
  });

  promise.then(function (result) {
    console.log("create", result.data);
    getListProductApi();
  });
  promise.catch(function (er) {
    console.log(err);
  });
};

function deleteProduct(idProductClick) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + idProductClick,
    method: "DELETE",
  });
  promise.then(function (result) {
    getListProductApi();
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

function editProduct(idProductClick) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + idProductClick,
    method: "GET",
  });
  promise.then(function (result) {
    var product = result.data;
    document.querySelector("#id").value = product.id;
    document.querySelector("#name").value = product.name;
    document.querySelector("#price").value = product.price;
    document.querySelector("#img").value = product.img;
    document.querySelector("#type").value = product.type;
    document.querySelector("#description").value = product.description;
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

document.querySelector("#btnUpdate").onclick = function () {
  var productUpdate = new Product();
  productUpdate.id = document.querySelector("#id").value;
  productUpdate.name = document.querySelector("#name").value;
  productUpdate.price = document.querySelector("#price").value;
  productUpdate.img = document.querySelector("#img").value;
  productUpdate.type = document.querySelector("#type").value;
  productUpdate.description = document.querySelector("#description").value;
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/UpdateProduct/" + productUpdate.id,
    method: "PUT",
    data: productUpdate,
  });
  promise.then(function (result) {
    getListProductApi();
  });
  promise.catch(function (err) {
    console.log(err);
  });
};

document.querySelector("#btn-search").onclick = function () {
  var productSearch = document.querySelector("#input-search").value;
  console.log(productSearch);
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/Product/SearchByName?name=" + productSearch,
    method: "GET",
  });
  promise.then(function (result) {
    console.log(result);
    renderProduct(result.data);
  });
  promise.catch(function (err) {
    console.log("Không tìm thấy");
  });
};

function renderProduct(arrProduct) {
  var html = "";
  for (var i = 0; i < arrProduct.length; i++) {
    var product = arrProduct[i];
    html += `<tr>
        <td>${product.id}</td>
        <td><img src=${product.img}></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>${product.type}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteProduct('${product.id}')"><i class="fa-solid fa-trash-can"></i></button>
        <button class="btn btn-primary mr-2" onclick="editProduct('${product.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
        </td>   
    </tr>`;
  }
  document.querySelector("#tblProduct").innerHTML = html;
}
