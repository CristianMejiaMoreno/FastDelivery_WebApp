import { useEcho } from "@laravel/echo-react";
import { useEffect } from "react";

export default function TestEcho() {
    useEffect(() => {
        console.log("🔍 Intentando suscribirse al canal...");
    }, []);

    useEcho(
        "pedidos-disponibles",  // Canal público (sin prefijos)
        ".pedido.nuevo",         // Evento con punto al inicio
        (payload) => {
            console.log("✅ EVENTO RECIBIDO →", payload);
        }
    );

    return (
        <div>
            <h2>Probando WebSocket...</h2>
            <p>Abre la consola para ver los logs</p>
        </div>
    );
}