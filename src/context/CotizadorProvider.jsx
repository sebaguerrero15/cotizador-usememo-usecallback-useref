import { useState, createContext } from "react"
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers/index"

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        //una base
        let resultado = 2000

        //Obtener diferencia de año
        const diferencia = obtenerDiferenciaYear(datos.year)

        //hay que restar el 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100
        
        //Europep 30%
        //Americano 15%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        
        //Basico 20%
        //Premium 50%
        resultado *= calcularPlan(datos.plan)
        
        //Formatear dinero
        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 1000);
    }

  
    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
            >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext