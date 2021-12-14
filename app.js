let body = document.querySelector("body");
let main = document.querySelector("main");

body.onload = function() {
    console.log("Loading o body");
    buscarProdutos();
    setInterval(buscarProdutos, 5000);
}


function buscarProdutos() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const listaProdutos = JSON.parse(this.responseText);
        tabelaprodutos(listaProdutos);
    }
xhttp.open("GET", "http://127.0.0.1:5000/produtos", true);
xhttp.send();
}
function tabelaprodutos(listaProdutos) {
   let tabela = `<table>
            <tr>
                <th>Codigo</th>
                <th>Nome</th>
                <th>Descricao</th>
                <th>Preco</th>
            </tr>`;

  for(let i=0; i < listaProdutos.length; i++) {
    tabela += `<tr>
                <td>${listaProdutos[i].cod_produto}</td>
                <td>${listaProdutos[i].nome}</td>
                <td>${listaProdutos[i].descricao}</td>
                <td>${listaProdutos[i].preco}</td>
                </tr>`;
}
tabela += `</table>`;
main.innerHTML = tabela;
}


function cadastrarProduto() {
    console.log("Entrou cadastro produto");
    let produto = {"nome": document.getElementById('nome').value
                 , "descricao": document.getElementById('descricao').value
                 , "preco": document.getElementById('preco').value }
    console.log("Objeto produto: " + JSON.stringify(produto));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Nova entrada");
    }
  };
  xhttp.open("POST", "http://127.0.0.1:5000/produtos", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(produto));

}
