    export function getColorEstado(estado:string):string
    {
        switch(estado)
        {
            case "pendiente":
                return "text-yellow-600"
            case "asignado":
                return "text-purple-600"
            case "en camino":
                return "text-blue-600"
            case "cancelado":
                return "text-red-600"
            case "entregado" :
                return "text-green-600"
            default:
                return "text-black"
        }
    }

