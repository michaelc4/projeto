import React from 'react'

const Usuarios = ({ usuarios }) => {
    return (
        <div>
            <center><h1>Contact List</h1></center>
            {usuarios.map((usuario) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{usuario.nome}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{usuario.data}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Usuarios