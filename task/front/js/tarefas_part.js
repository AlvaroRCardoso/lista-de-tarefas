const getTipos = () => {
    return axios.get(`${ENDPOINT}/tipos`);
}

const getTarefa = (id) => {
    return axios.get(`${ENDPOINT}/tarefas/` + id);
}

const loadTable = () => {
    axios.get(`${ENDPOINT}/tarefas`)
        .then((response) => {
            const data = response.data;
            var trHTML = '';
            data.forEach(element => {
                trHTML += '<tr>';
                trHTML += '<td>' + element.id + '</td>';
                trHTML += '<td>' + element.data_criacao + '</td>';
                trHTML += '<td>' + element.data_vencimento + '</td>';
                trHTML += '<td>' + element.Tipo.descricao + '</td>';
                trHTML += '<td>' + element.descricao + '</td>';
                trHTML += '<td>' + element.situacao + '</td>';
                trHTML += '<td>' + element.prioridade + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showTarefaEditBox(' + element.id + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="tarefaDelete(' + element.id + ')">Del</button></td>';
                trHTML += "</tr>";
            });
            document.getElementById("mytable").innerHTML = trHTML;
        })
};

loadTable();

const tarefaCreate = () => {
    const data_criacao = document.getElementById("data_criacao").value;
    const data_vencimento = document.getElementById("data_vencimento").value;
    const tipo = document.getElementById("mySelect").value;
    const descricao = document.getElementById("descricao").value;
    const situacao = document.getElementById("situacao").value;
    const prioridade = document.getElementById("prioridade").value;
    axios.post(`${ENDPOINT}/tarefas`, {
        data_criacao: data_criacao,
        data_vencimento: data_vencimento,
        TipoId: tipo,
        descricao: descricao,
        situacao: situacao,
        prioridade: prioridade,
    })
        .then((response) => {
            Swal.fire(`Tarefa ${response.data.situacao} criada`);
            loadTable();
        }, (error) => {
            Swal.fire(`Erro: ${error.response.data.error} `)
                .then(() => {
                    showTarefaCreateBox();
                })
        });
}


const tarefaEdit = () => {
    const id = document.getElementById("id").value;
    const data_criacao = document.getElementById("data_criacao").value;
    const data_vencimento = document.getElementById("data_vencimento").value;
    const tipo = document.getElementById("mySelect").value;
    const descricao = document.getElementById("descricao").value;
    const situacao = document.getElementById("situacao").value;
    const prioridade = document.getElementById("prioridade").value;
    axios.put(`${ENDPOINT}/tarefas/` + id, {
        data_criacao: data_criacao,
        data_vencimento: data_vencimento,
        TipoId: tipo,
        descricao: descricao,
        situacao: situacao,
        prioridade: prioridade,
    })
        .then((response) => {
            Swal.fire(`Tarefa ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Erro: ${error.response.data.error} `)
                .then(() => {
                    showTarefaEditBox(id);
                })
        });
}

const tarefaDelete = async (id) =>
{
    if (!confirm('Confirma remoção?'))
    {
        return;
    }

    const tarefa = await getTarefa(id);
    const data = tarefa.data;
    axios.delete(`${ENDPOINT}/tarefas/` + id)
        .then((response) => {
            Swal.fire(`${data.descricao} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Erro: ${error.response.data.error} `);
            loadTable();
        });
};


const createTiposCombo = async (id) => 
{
    const tipos = await getTipos();
    const data = tipos.data;
    var select = '<select class="swal2-input" id="mySelect">';

    data.forEach((element) => {
        if (id === element.id) {
            select += `<option value="${element.id}" selected>${element.descricao}</option>`;
        } else {
            select += `<option value="${element.id}">${element.descricao}</option>`;
        }
    });

    select += '</select>';
    return select;
}

const showTarefaCreateBox = async (tipoId) => 
{
    const tipos = await createTiposCombo(tipoId);

    Swal.fire({
        title: 'Create',
        html:
            '<input id="id" type="hidden">' +
            '<input id="data_criacao" class="swal2-input" placeholder="Data de criação">' +
            '<input id="data_vencimento" class="swal2-input" placeholder="Data de vencimento">' +
            tipos +
            '<input id="descricao" class="swal2-input" placeholder="Descrição">' +
            '<input id="situacao" class="swal2-input" placeholder="Situação">' +
            '<input id="prioridade" class="swal2-input" placeholder="Prioridade">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            tarefaCreate();
        }
    });
}

const showTarefaEditBox = async (id) => {
    const tarefa = await getTarefa(id);
    const data = tarefa.data;
    const tipos = await createTiposCombo(data.TipoId);
    Swal.fire({
        title: 'Edit',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="data_criacao" class="swal2-input" placeholder="Data de criação" value="' + data.data_criacao + '">' +
        '<input id="data_vencimento" class="swal2-input" placeholder="Data de vencimento" value="' + data.data_vencimento + '">' +
        tipos +
        '<input id="descricao" class="swal2-input" placeholder="Descrição" value="' + data.descricao + '">' +
        '<input id="situacao" class="swal2-input" placeholder="Situação" value="' + data.situacao + '">' +
        '<input id="prioridade" class="swal2-input" placeholder="Prioridade" value="' + data.prioridade + '">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            tarefaEdit();
        }
    });
}

const generatePDF = async (tipoId) => 
{
    const tipos = await createTiposCombo(tipoId);

    Swal.fire({
        title: 'Create',
        html:
            '<input id="id" type="hidden">' +
            '<input id="data_criacao" class="swal2-input" placeholder="Data de criação">' +
            '<input id="data_vencimento" class="swal2-input" placeholder="Data de vencimento">' +
            tipos +
            '<input id="descricao" class="swal2-input" placeholder="Descrição">' +
            '<input id="situacao" class="swal2-input" placeholder="Situação">' +
            '<input id="prioridade" class="swal2-input" placeholder="Prioridade">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            tarefaCreate();
        }
    });
}