import { getZonas } from '@/api/Zona'
import { Zona, ZonaOption } from '@/interfaces/Zona'
import AsyncSelect from "react-select/async"
import React from 'react'


type Props = {
    value: ZonaOption | null
    onChange: (zona: ZonaOption | null) => void
}

export default function ZonaSelect({value, onChange} : Props) {

    const loadZonas = async (inputValue: string)=>{
        try{

            const response = await getZonas(1, inputValue);

            return response.data.map((z:Zona)=>({
                value: z.id,
                label: z.nombre,
                precio: Number(z.precio_sugerido)
            }));
        }catch(error)
        {
            console.error(error);
            return [];
        }
    }


  return (
    <AsyncSelect<ZonaOption>
        cacheOptions
        defaultOptions
        loadOptions={loadZonas}
        value={value}
        onChange={onChange}
        placeholder="Buscar Zona..."
        noOptionsMessage={()=>"No se encontraron zonas"}
    />
  )
}
