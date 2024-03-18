import React, { useState } from 'react'


const Acoes: React.FC = () =>{
    const [acoes, setAcoes] = useState([])

    const fetchAcoes = async () => {
        try {
            const response = await fetch(`http://localhost:3333/walletInvestimentos/1`)

        } catch {

        }
    }
    return (
        <div>
            <h1>Ações</h1>

        </div>
    )
}

export default Acoes