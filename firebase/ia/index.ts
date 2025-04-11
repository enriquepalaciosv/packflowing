import { GoogleGenerativeAI } from "@google/generative-ai";
import { Paquete } from "../../interfaces/packages";

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GOOGLE_API_KEY);

export async function askAboutPackages(packages: Paquete[], question: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
        Eres un asistente integrado en una app móvil que gestiona el envío de paquetes desde USA a Nicaragua. El usuario está interesado en saber los estado por los cuales su paquete ha pasado: recibido, en tránsito, listo para retirar y entregado.
        
        Podrás buscar los paquetes por el id de rastreo, descripción, vía (maritima o aerea), peso, o cualquier otro dato que el usuario te provea según este dataset que es la colección de todos los paquetes del usuario:

        ${JSON.stringify(packages)}

        Cuando encuentres un paquete, debes indicarle al usuario que lo encontraste identificado por el idRastreo.

        ${question}
    `;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
}