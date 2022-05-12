const inputTarefa = document.querySelector(".inputTarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

function criaLi() {
  const li = document.createElement('li');
  return li;
}

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

// salva as tarefas em um JSON
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function criaBotaoApagar(li) {
  li.innerText += " ";
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('tilte', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}


function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerHTML = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

// pega o evento de click no ENTER
inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
})

//click no botão de adicionar tarefa
btnTarefa.addEventListener("click", function (e) {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

//click no botão de remover tarefa
document.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
  }
  salvarTarefas();
})


// coloca de volta as tarefas já salvas
function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefas of listaDeTarefas) {
    criaTarefa(tarefas);
  }
}

adicionaTarefasSalvas();