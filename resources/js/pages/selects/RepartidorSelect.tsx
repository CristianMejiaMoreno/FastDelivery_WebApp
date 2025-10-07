import { getRepartidores } from "@/api/Repartidor"
import { Repartidor, RepartidorOption } from "@/interfaces/Repartidor"
import AsyncSelect from "react-select/async"


type Props = {
    value: RepartidorOption | null
    onChange: (repartidor:RepartidorOption | null) => void
}

export default function RepartidorSelect({value, onChange}:Props){

    const loadRepartidores = async (inputValue:string) => {

        try{
            const response = await getRepartidores(1, inputValue);

            
            return response.data.map((r:Repartidor) => ({
                value: r.id,
                label: r.nombre + r.apellido,
                porcentaje_marca: r.porcentaje_marca,
                porcentaje_repartidor: r.porcentaje_repartidor
            }));

        }catch(error)
        {
            console.error(error);
            return [];
        }
    }


    return (
        <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadRepartidores}
            value={value}
            onChange={onChange}
            placeholder="Buscar Repartidor..."
            noOptionsMessage={()=>"No se encontraron repartidores"}
        />
    )
}
