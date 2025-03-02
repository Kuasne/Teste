// Função para adicionar um produto na tabela
document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let id = document.getElementById("id").value;
    let nome = document.getElementById("nome").value;
    let quantidade = document.getElementById("quantidade").value;
    let preco = document.getElementById("preco").value;

    let tabela = document.getElementById("tabela-corpo");
    let novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td>${id}</td>
        <td>${nome}</td>
        <td>${quantidade}</td>
        <td>${preco}</td>
    `;
    limparFormulario();
  });

// Função para remover um produto
document.getElementById("remover").addEventListener("click", function () {
  let idProduto = document.getElementById("id").value;
  let tabela = document.getElementById("tabela-corpo");
  let linhas = Array.from(tabela.rows);
  let linhaRemover = linhas.find(
    (linha) => linha.cells[0].innerText === idProduto
  );

  if (linhaRemover) {
    tabela.deleteRow(linhaRemover.rowIndex);
    alert("Produto removido com sucesso!");
  } else {
    alert("Produto não encontrado!");
  }
});

// Função para editar um produto
document.getElementById("editar").addEventListener("click", function () {
  let idProduto = document.getElementById("id").value;
  let tabela = document.getElementById("tabela-corpo");
  let linhas = Array.from(tabela.rows);
  let linhaEditar = linhas.find(
    (linha) => linha.cells[0].innerText === idProduto
  );

  if (linhaEditar) {
    linhaEditar.cells[1].innerText = document.getElementById("nome").value;
    linhaEditar.cells[2].innerText =
      document.getElementById("quantidade").value;
    linhaEditar.cells[3].innerText = document.getElementById("preco").value;
    alert("Produto editado com sucesso!");
  } else {
    alert("Produto não encontrado!");
  }
});

// Função para exportar os dados para CSV
document.getElementById("exportarCSV").addEventListener("click", function () {
  let tabela = document.getElementById("tabela");
  let linhas = Array.from(tabela.rows).slice(1); // Ignorando o cabeçalho
  let csv = "ID,Nome,Quantidade,Preço Unitário\n";

  linhas.forEach((linha) => {
    let dados = Array.from(linha.cells)
      .map((cell) => cell.innerText)
      .join(",");
    csv += dados + "\n";
  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "produtos.csv";
  a.click();
});

// Função para pesquisar na tabela
function pesquisarTabela() {
  let pesquisa = document.getElementById("pesquisa").value.toLowerCase();
  let linhas = document.querySelectorAll("#tabela-corpo tr");
  linhas.forEach((linha) => {
    let texto = linha.innerText.toLowerCase();
    linha.style.display = texto.includes(pesquisa) ? "" : "none";
  });
}

// Função para ordenar a tabela
function ordenarTabela(colunaIndex) {
  let tabela = document.getElementById("tabela");
  let linhas = Array.from(tabela.rows).slice(1);
  let ordenada;

  if (colunaIndex === 0 || colunaIndex === 2) {
    ordenada = linhas.sort((a, b) => {
      return (
        parseInt(a.cells[colunaIndex].innerText) -
        parseInt(b.cells[colunaIndex].innerText)
      );
    });
  } else {
    ordenada = linhas.sort((a, b) => {
      return a.cells[colunaIndex].innerText.localeCompare(
        b.cells[colunaIndex].innerText
      );
    });
  }

  tabela.tBodies[0].append(...ordenada);
}

// Função para limpar o formulário
function limparFormulario() {
  document.getElementById("formulario").reset();
}
