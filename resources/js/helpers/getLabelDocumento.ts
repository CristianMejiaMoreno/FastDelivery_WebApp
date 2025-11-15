export function getLabelTipoDocumento(id:number)
{
    switch(id)
    {
        case(1):
            return "Número de Cédula de extranjería"
        case(2):
            return "Número de Tarjeta de identidad"
        case(4):
            return "Número de Cédula de ciudadanía"
        case(5):
            return "Número de Pasaporte"
        default:
            return "Número de documento"
    }
}
