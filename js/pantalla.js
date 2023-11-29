async function getData(entityIds) {
    const bearer = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aWN0b3JpYUB0ZWNoZnJpZW5kbHkuZXMiLCJ1c2VySWQiOiI4N2JlMmQ5MC0yYzQ0LTExZWUtOGE5Ny1kZDMyYmMyZjkzNGMiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6ImFlYWU4NTk4LTM2ZmMtNDBkOS1hZmM5LTY4YjE4YWZjN2NiMyIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNzAxMjYzOTU4LCJleHAiOjE3MDEyNzI5NTgsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJkMWIwMzA0MC0yMTRjLTExZWUtYWY3My05ZDRmYmY2ZWE4NzIiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.gJZIOnXkhmA41IUkUzcTeB7DjsblstTs3SXRq36IolkP3C4APyMZACT_NctHUpM8-ZpbsRqf7ma-blOD-O1GKA";
    const key = "libres";

    // Crear un array de promesas
    const promises = entityIds.map(async (entityId) => {
        const url = `https://smart.albacete.es:443/api/plugins/telemetry/DEVICE/${entityId}/values/timeseries?keys=${key}&useStrictDataTypes=true`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "X-Authorization": `Bearer ${bearer}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            const value = data[key][0].value;

            // Puedes hacer algo con el valor aquí

            return { entityId, value };
        } catch (error) {
            console.error(`Error al obtener los datos para ${entityId}:`, error.message);
            return { entityId, value: 'Error' }; // Tratamiento de errores
        }
    });

    // Esperar a que todas las promesas se resuelvan
    return Promise.all(promises);
}

async function fetchDataAndRender() {
    const data = await getData([
        "c9df5bf0-2c48-11ee-8a97-dd32bc2f934c",
        "babefbd0-2c48-11ee-8a97-dd32bc2f934c",
        "b496e740-2c48-11ee-8a97-dd32bc2f934c",
    ]);
    renderData(data);
}

function renderData(data) {
    // Renderizar los datos en el DOM
    for (let i = 0; i < data.length; i++) {
        const entityId = data[i].entityId;
        const value = data[i].value;
        
        const parkingElement = document.getElementById(`parking${i + 1}`);
        if (parkingElement) {
            if (value < 1) {
                parkingElement.innerHTML = "Completo";
            } else {
                parkingElement.innerHTML = value;
            }
        }
    }
}
fetchDataAndRender();

//efectuar la llamada cada 5 minutos
setInterval(() => {
    fetchDataAndRender();
}, 300000);