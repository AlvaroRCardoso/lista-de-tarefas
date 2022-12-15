const loadTable = () => {
    axios.get(`${ENDPOINT}/tipos`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.descricao + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showTipoEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="tipoDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const tipoCreate = () => {
    const descricao = document.getElementById("descricao").value;

    axios.post(`${ENDPOINT}/tipos`, {
        descricao: descricao,
    })
        .then((response) => {
            Swal.fire(`Tipo ${response.data.descricao} criado`);
            loadTable();
        }, (error) => {
            Swal.fire(`Erro: ${error.response.data.error} `)
                .then(() => {
                    showTipoCreateBox();
                })
        });
}

const getTipo = (id) => {
    return axios.get(`${ENDPOINT}/tipos/` + id);
}

const tipoEdit = () => {
    const id = document.getElementById("id").value;
    const descricao = document.getElementById("descricao").value;

    axios.put(`${ENDPOINT}/tipos/` + id, {
        descricao: descricao,
    })
        .then((response) => {
            Swal.fire(`Tipo ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Erro: ${error.response.data.error} `)
                .then(() => {
                    showTipoEditBox(id);
                })
        });
}

const tipoDelete = async (id) => {
    const tipo = await getTipo(id);
    const data = tipo.data;
    axios.delete(`${ENDPOINT}/tipos/` + id)
        .then((response) => {
            Swal.fire(` ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Erro: ${error.response.data.error} `);
            loadTable();
        });
};

const showTipoCreateBox = () => {
    Swal.fire({
        title: 'Create tipo',
        html:
            '<input id="id" type="hidden">' +
            '<input id="descricao" class="swal2-input" placeholder="Descrição">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            tipoCreate();
        }
    });
}

const showTipoEditBox = async (id) => {
    const tipo = await getTipo(id);
    const data = tipo.data;
    Swal.fire({
        title: 'Edit',
        html:
        '<input id="id" type="hidden" value=' + data.id + '>' +
        '<input id="descricao" class="swal2-input" placeholder="Descrição" value="' + data.descricao + '">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            tipoEdit();
        }
    });

}
