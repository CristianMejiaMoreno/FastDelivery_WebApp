import { Cliente, ClienteOption } from '@/interfaces/Cliente'
import { getClientes } from '@/api/Cliente'
import AsyncSelect from "react-select/async"


type Props = {
    value: ClienteOption | null
    onChange: (cliente:ClienteOption | null) => void
}


export default function ClienteSelect({value, onChange}:Props) {

    const loadClientes= async (inputValue:string)=>{
        try{
            const response = await getClientes(1, inputValue);

            return response.data.map((c:Cliente)=>({
                value: c.id,
                label: c.nombre_cliente,
            }));
        }catch(error)
        {
            console.error(error);
            return [];
        }
    }


  return (
    <AsyncSelect<ClienteOption>
        cacheOptions
        defaultOptions
        loadOptions={loadClientes}
        value={value}
        onChange={onChange}
        placeholder="Buscar Cliente..."
        noOptionsMessage={()=>"No se encontraron clientes"}
    />
  )
}
