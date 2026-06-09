document.addEventListener('DOMContentLoaded', () => {
    const dispositivoSelect = document.getElementById('dispositivo');
    const fallaSelect = document.getElementById('falla');
    const resultadoDiv = document.getElementById('resultado');
    const btnWhatsapp = document.getElementById('btn-whatsapp');

    // Cambia tu número acá (ejemplo: 5492211234567 sin el signo +)
    const TU_NUMERO_WHATSAPP = "542215676073"; 

    function actualizarDiagnostico() {
        const dispositivo = dispositivoSelect.value;
        const falla = fallaSelect.value;

        if (!dispositivo || !falla) {
            resultadoDiv.classList.add('hidden');
            return;
        }

        let mensajeConsola = "";
        let gravedad = "";

        // Condicionales de ingeniería para el reporte simulado
        if (dispositivo === "celular") {
            if (falla === "pantalla") {
                gravedad = "MODERADA [OK]";
                mensajeConsola = "Diagnóstico: Rotura de módulo LCD/OLED o falla en bus de video interconectores. Requiere sustitución periférica calibrada.";
            } else if (falla === "encendido") {
                gravedad = "CRÍTICA [!]";
                mensajeConsola = "Diagnóstico: Ausencia de consumo eléctrico en placa lógica. Posible corto en línea principal VCC_MAIN o IC de carga. Requiere análisis con multímetro/estación térmica.";
            } else if (falla === "temperatura") {
                gravedad = "BAJA [OK]";
                mensajeConsola = "Diagnóstico: Degradación térmica por obstrucción o falla de software en segundo plano. Requiere mantenimiento físico y optimización de firmware.";
            }
        } else if (dispositivo === "pc") {
            if (falla === "pantalla") {
                gravedad = "MODERADA [OK]";
                mensajeConsola = "Diagnóstico: Pérdida de señal de video. Posible falla estructural en memoria RAM, chipset de placa madre o controlador PCIe de GPU.";
            } else if (falla === "encendido") {
                gravedad = "CRÍTICA [!]";
                mensajeConsola = "Diagnóstico: Falla de energía en carriles de 12V/5V. Posible cortocircuito en VRMs de CPU o degradación de componentes en fuente (PSU).";
            } else if (falla === "temperatura") {
                gravedad = "MODERADA [OK]";
                mensajeConsola = "Diagnóstico: Estrés térmico (Thermal Throttling). Cristalización de compuesto conductor térmico y saturación de disipadores. Requiere delid/limpieza profunda.";
            }
        }

        // Mostrar el reporte en pantalla
        resultadoDiv.innerHTML = `
            <span class="text-[#00ffcc] font-bold">STATUS_REPORT:</span><br>
            GRAVEDAD: ${gravedad}<br><br>
            ${mensajeConsola}
        `;
        resultadoDiv.classList.remove('hidden');
    }

    // Escuchar eventos de cambio en los menús desplegables
    dispositivoSelect.addEventListener('change', actualizarDiagnostico);
    fallaSelect.addEventListener('change', actualizarDiagnostico);

    // Configurar la acción del botón para mandar a WhatsApp
    btnWhatsapp.addEventListener('click', () => {
        const dispositivo = dispositivoSelect.value || "dispositivo";
        const falla = fallaSelect.value || "problema técnico";
        
        // Crear el mensaje formateado para WhatsApp de manera limpia URL encoded
        const textoOriginal = `Hola LOOT! Quiero solicitar un presupuesto para un ${dispositivo} con falla de ${falla}.`;
        const textoEncoded = encodeURIComponent(textoOriginal);
        
        // Redireccionar al chat con el mensaje preestablecido
        window.open(`https://wa.me/${TU_NUMERO_WHATSAPP}?text=${textoEncoded}`, '_blank');
    });
});