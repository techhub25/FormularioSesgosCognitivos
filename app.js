document.addEventListener("DOMContentLoaded", () => {
    // Variables para almacenar respuestas
    let userData = {
      nombre: "",
      correo: "",
      respuestasEmocionales: [],
      respuestasRiesgo: [],
      respuestasSesgos: [],
    }
  
    // URL del Google Apps Script Web App (reemplazar con tu URL)
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUDHUzclO7Ap6DxKrHsoaoBd8CaYELWIlgZzhugf4-1cOnJW9Mvm9Mmo9L4R_uy5SMyA/exec"
  
    // Declaración de variables de preguntas y mapeos
    const preguntasEmocionales = [
      "Entiendo mis propios sentimientos.",
      "Soy consciente de mis emociones cuando las experimento.",
      "Puedo darme cuenta rápidamente de mis emociones.",
      "A menudo pienso en mis sentimientos.",
      "Presto atención a mis sentimientos.",
      "Valoro mis sentimientos.",
      "Estoy atento a mis estados de ánimo.",
      "A menudo pienso en mis sentimientos.",
      "Puedo explicar bien mis sentimientos.",
      "Mis sentimientos son claros para mí.",
      "A menudo sé por qué me siento de cierta manera.",
      "Puedo definir mis sentimientos con precisión.",
      "A menudo me doy cuenta de mis sentimientos.",
      "Siempre sé cómo me siento.",
      "A veces tengo problemas para entender mis sentimientos.",
      "Puedo entender mis sentimientos.",
      "Cuando me siento mal, pienso en cómo mejorar mi estado de ánimo.",
      "Me preocupo por mi estado de ánimo.",
      "Cuando me siento mal, hago algo para animarme.",
      "Soy bueno para animarme.",
      "Cuando me siento mal, trato de pensar en cosas agradables.",
      "Cuando me siento mal, trato de cambiar mi estado de ánimo.",
      "Cuando me siento mal, trato de calmarme.",
      "Cuando me siento mal, trato de distraerme.",
    ]
  
    const preguntasRiesgo = [
      {
        pregunta: "¿Cuál es su horizonte temporal de inversión?",
        opciones: ["Menos de 3 años", "Entre 3 y 5 años", "Más de 5 años"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cuál es su principal objetivo al invertir?",
        opciones: ["Preservar el capital", "Obtener ingresos regulares", "Lograr crecimiento del capital"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cómo reaccionaría ante una caída del 10% en sus inversiones?",
        opciones: [
          "Vendería para evitar más pérdidas",
          "Mantendría la posición esperando que se recupere",
          "Compraría más para aprovechar la baja",
        ],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Qué porcentaje de sus ahorros está dispuesto a invertir?",
        opciones: ["Menos del 25%", "Entre el 25% y el 50%", "Más del 50%"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cuál es su conocimiento sobre inversiones?",
        opciones: ["Ninguno", "Básico", "Avanzado"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cómo se siente al asumir riesgos en sus inversiones?",
        opciones: ["Muy incómodo", "Neutral", "Cómodo"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cuál es su situación laboral actual?",
        opciones: ["Jubilado", "Empleado", "Autónomo"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Tiene otras fuentes de ingresos además de sus inversiones?",
        opciones: ["Sí", "No"],
        valores: [2, 1],
      },
      {
        pregunta: "¿Cuál es su edad?",
        opciones: ["Más de 60 años", "Entre 40 y 60 años", "Menos de 40 años"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cuántos dependientes económicos tiene?",
        opciones: ["Ninguno", "Uno o dos", "Más de dos"],
        valores: [3, 2, 1],
      },
      {
        pregunta: "¿Cuál es su nivel de ingresos anuales?",
        opciones: ["Menos de $30,000", "Entre $30,000 y $60,000", "Más de $60,000"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cuál es su nivel de educación?",
        opciones: ["Secundaria", "Universitaria", "Posgrado"],
        valores: [1, 2, 3],
      },
      { pregunta: "¿Ha invertido antes?", opciones: ["No", "Sí, pero poco", "Sí, activamente"], valores: [1, 2, 3] },
      {
        pregunta: "¿Cuál es su tolerancia a la volatilidad en sus inversiones?",
        opciones: ["Muy baja", "Moderada", "Alta"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cómo describiría su enfoque general hacia las finanzas?",
        opciones: ["Cauteloso", "Equilibrado", "Arriesgado"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cuál es su principal preocupación al invertir?",
        opciones: ["Perder dinero", "No obtener suficientes rendimientos", "No alcanzar mis metas financieras"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Qué tipo de inversiones le interesan más?",
        opciones: ["Bonos", "Acciones", "Bienes raíces"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cómo se siente al invertir en mercados emergentes?",
        opciones: ["Muy incómodo", "Neutral", "Cómodo"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cuál es su estrategia de inversión preferida?",
        opciones: ["Inversión pasiva", "Inversión activa", "Trading a corto plazo"],
        valores: [1, 2, 3],
      },
      {
        pregunta: "¿Cómo se mantiene informado sobre temas financieros?",
        opciones: ["No me informo", "Fuentes básicas", "Fuentes especializadas"],
        valores: [1, 2, 3],
      },
    ]
  
    const preguntasSesgos = [
      "Al tomar decisiones financieras, ¿con qué frecuencia busca información que confirme sus creencias existentes?",
      "¿Con qué frecuencia confía en su intuición al tomar decisiones de inversión?",
      "¿Con qué frecuencia cree que puede predecir el resultado de eventos inciertos?",
      "¿Con qué frecuencia se siente más seguro de sus decisiones después de haberlas tomado?",
      "¿Con qué frecuencia se compara con otros inversores?",
      "¿Con qué frecuencia se arrepiente de las decisiones de inversión que ha tomado?",
      "¿Con qué frecuencia se siente influenciado por las opiniones de los demás al tomar decisiones financieras?",
      "¿Con qué frecuencia evita vender una inversión que está perdiendo dinero?",
      "¿Con qué frecuencia se siente más afectado por las pérdidas que por las ganancias?",
      "¿Con qué frecuencia asigna diferentes propósitos a diferentes fuentes de dinero?",
      "¿Con qué frecuencia sigue las tendencias del mercado sin investigar a fondo?",
      "¿Con qué frecuencia se siente presionado a tomar decisiones rápidas en el mercado?",
      "¿Con qué frecuencia se aferra a inversiones perdedoras con la esperanza de que se recuperen?",
      "¿Con qué frecuencia se siente más atraído por inversiones que han tenido un buen rendimiento recientemente?",
      "¿Con qué frecuencia se siente influenciado por la información que es fácilmente accesible?",
      "¿Con qué frecuencia se siente más seguro de sus decisiones cuando tiene mucha información?",
      "¿Con qué frecuencia se siente más cómodo invirtiendo en empresas que conoce bien?",
      "¿Con qué frecuencia se siente más atraído por inversiones que son populares entre sus amigos o familiares?",
      "¿Con qué frecuencia se siente más seguro de sus decisiones cuando tiene el control total?",
      "¿Con qué frecuencia se siente más cómodo invirtiendo en inversiones que son fáciles de entender?",
    ]
  
    const mapeoSesgos = {
      heuristicaRepresentatividad: [0, 1],
      sobreconfianza: [2, 3],
      sesgoAnclaje: [4, 5],
      falaciaJugador: [6, 7],
      sesgoCapacidad: [8, 9],
      aversionPerdida: [10, 11],
      aversionRemordimiento: [12, 13],
      contabilidadMental: [14, 15],
      efectoRebano: [16, 17, 18, 19],
    }
  
    // Inicializar formularios
    initUserInfoForm()
    initEmocionalForm()
    initRiesgoForm()
    initSesgosForm()
    initResultsSection()
  
    // Formulario de información del usuario
    function initUserInfoForm() {
      const form = document.getElementById("user-info-form")
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        userData.nombre = document.getElementById("nombre").value
        userData.correo = document.getElementById("correo").value
        showSection("test-emocional")
      })
    }
  
    // Formulario de inteligencia emocional
    function initEmocionalForm() {
      const container = document.getElementById("emocional-questions")
      const form = document.getElementById("emocional-form")
  
      // Generar preguntas
      preguntasEmocionales.forEach((pregunta, index) => {
        const questionDiv = document.createElement("div")
        questionDiv.className = "question"
  
        const questionText = document.createElement("p")
        questionText.textContent = `${index + 1}. ${pregunta}`
        questionDiv.appendChild(questionText)
  
        const optionsDiv = document.createElement("div")
        optionsDiv.className = "options"
  
        for (let i = 1; i <= 5; i++) {
          const option = document.createElement("div")
          option.className = "radio-option"
  
          const input = document.createElement("input")
          input.type = "radio"
          input.name = `emocional-${index}`
          input.id = `emocional-${index}-${i}`
          input.value = i
          input.required = true
  
          const label = document.createElement("label")
          label.htmlFor = `emocional-${index}-${i}`
          label.textContent = i
  
          option.appendChild(input)
          option.appendChild(label)
          optionsDiv.appendChild(option)
        }
  
        questionDiv.appendChild(optionsDiv)
        container.appendChild(questionDiv)
      })
  
      // Manejar envío del formulario
      form.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Recopilar respuestas
        userData.respuestasEmocionales = []
        for (let i = 0; i < preguntasEmocionales.length; i++) {
          const selectedOption = document.querySelector(`input[name="emocional-${i}"]:checked`)
          if (selectedOption) {
            userData.respuestasEmocionales.push(Number.parseInt(selectedOption.value))
          } else {
            alert("Por favor, responde todas las preguntas.")
            return
          }
        }
  
        showSection("perfil-riesgo")
      })
    }
  
    // Formulario de perfil de riesgo
    function initRiesgoForm() {
      const container = document.getElementById("riesgo-questions")
      const form = document.getElementById("riesgo-form")
  
      // Generar preguntas
      preguntasRiesgo.forEach((item, index) => {
        const questionDiv = document.createElement("div")
        questionDiv.className = "question"
  
        const questionText = document.createElement("p")
        questionText.textContent = `${index + 24}. ${item.pregunta}`
        questionDiv.appendChild(questionText)
  
        const optionsDiv = document.createElement("div")
        optionsDiv.className = "options"
  
        item.opciones.forEach((opcion, i) => {
          const option = document.createElement("div")
          option.className = "radio-option"
  
          const input = document.createElement("input")
          input.type = "radio"
          input.name = `riesgo-${index}`
          input.id = `riesgo-${index}-${i}`
          input.value = item.valores[i]
          input.required = true
  
          const label = document.createElement("label")
          label.htmlFor = `riesgo-${index}-${i}`
          label.textContent = opcion
  
          option.appendChild(input)
          option.appendChild(label)
          optionsDiv.appendChild(option)
        })
  
        questionDiv.appendChild(optionsDiv)
        container.appendChild(questionDiv)
      })
  
      // Manejar envío del formulario
      form.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Recopilar respuestas
        userData.respuestasRiesgo = []
        for (let i = 0; i < preguntasRiesgo.length; i++) {
          const selectedOption = document.querySelector(`input[name="riesgo-${i}"]:checked`)
          if (selectedOption) {
            userData.respuestasRiesgo.push(Number.parseInt(selectedOption.value))
          } else {
            alert("Por favor, responde todas las preguntas.")
            return
          }
        }
  
        showSection("sesgos-cognitivos")
      })
    }
  
    // Formulario de sesgos cognitivos
    function initSesgosForm() {
      const container = document.getElementById("sesgos-questions")
      const form = document.getElementById("sesgos-form")
  
      // Generar preguntas
      preguntasSesgos.forEach((pregunta, index) => {
        const questionDiv = document.createElement("div")
        questionDiv.className = "question"
  
        const questionText = document.createElement("p")
        questionText.textContent = `${index + 44}. ${pregunta}`
        questionDiv.appendChild(questionText)
  
        const optionsDiv = document.createElement("div")
        optionsDiv.className = "options"
  
        for (let i = 1; i <= 6; i++) {
          const option = document.createElement("div")
          option.className = "radio-option"
  
          const input = document.createElement("input")
          input.type = "radio"
          input.name = `sesgos-${index}`
          input.id = `sesgos-${index}-${i}`
          input.value = i
          input.required = true
  
          const label = document.createElement("label")
          label.htmlFor = `sesgos-${index}-${i}`
          label.textContent = i
  
          option.appendChild(input)
          option.appendChild(label)
          optionsDiv.appendChild(option)
        }
  
        questionDiv.appendChild(optionsDiv)
        container.appendChild(questionDiv)
      })
  
      // Manejar envío del formulario
      form.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Recopilar respuestas
        userData.respuestasSesgos = []
        for (let i = 0; i < preguntasSesgos.length; i++) {
          const selectedOption = document.querySelector(`input[name="sesgos-${i}"]:checked`)
          if (selectedOption) {
            userData.respuestasSesgos.push(Number.parseInt(selectedOption.value))
          } else {
            alert("Por favor, responde todas las preguntas.")
            return
          }
        }
  
        showSection("loading")
        calcularResultados()
      })
    }
  
    // Inicializar sección de resultados
    function initResultsSection() {
      document.getElementById("restart-btn").addEventListener("click", () => {
        resetForm()
        showSection("intro")
      })
    }
  
    // Calcular resultados
    function calcularResultados() {
      const resultados = {}
  
      // Calcular puntajes de inteligencia emocional
      const puntajeAtencion = calcularPuntajeRango(userData.respuestasEmocionales, 0, 8)
      const puntajeClaridad = calcularPuntajeRango(userData.respuestasEmocionales, 8, 16)
      const puntajeReparacion = calcularPuntajeRango(userData.respuestasEmocionales, 16, 24)
  
      // Clasificar inteligencia emocional
      resultados.atencion = clasificarAtencion(puntajeAtencion)
      resultados.claridad = clasificarClaridad(puntajeClaridad)
      resultados.reparacion = clasificarReparacion(puntajeReparacion)
  
      // Calcular perfil de riesgo
      const puntajeRiesgo = userData.respuestasRiesgo.reduce((sum, val) => sum + val, 0)
      resultados.perfilRiesgo = clasificarPerfilRiesgo(puntajeRiesgo)
  
      // Calcular sesgos cognitivos
      resultados.heuristicaRepresentatividad = clasificarSesgo(calcularMediaSesgo("heuristicaRepresentatividad"))
      resultados.sobreconfianza = clasificarSesgo(calcularMediaSesgo("sobreconfianza"))
      resultados.sesgoAnclaje = clasificarSesgo(calcularMediaSesgo("sesgoAnclaje"))
      resultados.falaciaJugador = clasificarSesgo(calcularMediaSesgo("falaciaJugador"))
      resultados.sesgoCapacidad = clasificarSesgo(calcularMediaSesgo("sesgoCapacidad"))
      resultados.aversionPerdida = clasificarSesgo(calcularMediaSesgo("aversionPerdida"))
      resultados.aversionRemordimiento = clasificarSesgo(calcularMediaSesgo("aversionRemordimiento"))
      resultados.contabilidadMental = clasificarSesgo(calcularMediaSesgo("contabilidadMental"))
      resultados.efectoRebano = clasificarSesgo(calcularMediaSesgo("efectoRebano"))
  
      // Mostrar resultados
      mostrarResultados(resultados)
  
      // Enviar resultados a Google Sheets
      enviarResultados(resultados)
    }
  
    // Calcular puntaje para un rango de preguntas
    function calcularPuntajeRango(respuestas, inicio, fin) {
      let suma = 0
      for (let i = inicio; i < fin; i++) {
        suma += respuestas[i]
      }
      return suma
    }
  
    // Clasificar atención
    function clasificarAtencion(puntaje) {
      if (puntaje <= 21) return { nivel: "Baja", descripcion: "Presta poca atención.", porcentaje: (puntaje / 40) * 100 }
      if (puntaje <= 32)
        return { nivel: "Adecuada", descripcion: "Nivel de atención adecuado.", porcentaje: (puntaje / 40) * 100 }
      return {
        nivel: "Alta",
        descripcion: "Le presta demasiada atención a sus sentimientos.",
        porcentaje: (puntaje / 40) * 100,
      }
    }
  
    // Clasificar claridad
    function clasificarClaridad(puntaje) {
      if (puntaje <= 25)
        return { nivel: "Baja", descripcion: "Baja claridad emocional.", porcentaje: (puntaje / 40) * 100 }
      if (puntaje <= 35)
        return { nivel: "Adecuada", descripcion: "Adecuada claridad emocional.", porcentaje: (puntaje / 40) * 100 }
      return { nivel: "Excelente", descripcion: "Excelente claridad emocional.", porcentaje: (puntaje / 40) * 100 }
    }
  
    // Clasificar reparación
    function clasificarReparacion(puntaje) {
      if (puntaje <= 23)
        return { nivel: "Baja", descripcion: "Baja capacidad de reparación.", porcentaje: (puntaje / 40) * 100 }
      if (puntaje <= 35)
        return { nivel: "Adecuada", descripcion: "Adecuada capacidad de reparación.", porcentaje: (puntaje / 40) * 100 }
      return { nivel: "Excelente", descripcion: "Excelente capacidad de reparación.", porcentaje: (puntaje / 40) * 100 }
    }
  
    // Clasificar perfil de riesgo
    function clasificarPerfilRiesgo(puntaje) {
      if (puntaje >= 20 && puntaje <= 31) {
        return {
          nivel: "Conservador",
          descripcion:
            "Prioriza la preservación del capital y la seguridad de sus inversiones por encima de la posibilidad de obtener altos rendimientos. Este perfil se caracteriza por una baja tolerancia al riesgo y una preferencia por productos de inversión de bajo riesgo y volatilidad.",
          porcentaje: ((puntaje - 20) / (63 - 20)) * 100,
        }
      }
      if (puntaje >= 32 && puntaje <= 43) {
        return {
          nivel: "Moderado",
          descripcion:
            "Se caracteriza por la búsqueda de un equilibrio entre rentabilidad y riesgo, siendo más tolerante al riesgo que el perfil conservador pero menos que el perfil agresivo. Busca un rendimiento razonable sin exponerse a riesgos excesivos, diversificando su cartera con una combinación de inversiones seguras y otras de mayor riesgo.",
          porcentaje: ((puntaje - 20) / (63 - 20)) * 100,
        }
      }
      return {
        nivel: "Agresivo",
        descripcion:
          "Se caracteriza por una alta tolerancia al riesgo y una preferencia por la búsqueda de altas rentabilidades, aunque eso implique asumir mayores pérdidas potenciales. Estos inversores suelen estar dispuestos a invertir en activos más volátiles y de alto potencial de crecimiento, como acciones de empresas en crecimiento, criptomonedas o mercados emergentes.",
        porcentaje: ((puntaje - 20) / (63 - 20)) * 100,
      }
    }
  
    // Calcular media para un sesgo específico
    function calcularMediaSesgo(tipoSesgo) {
      const indices = mapeoSesgos[tipoSesgo]
      let suma = 0
  
      indices.forEach((index) => {
        suma += userData.respuestasSesgos[index]
      })
  
      return suma / indices.length
    }
  
    // Clasificar sesgo según su media
    function clasificarSesgo(media) {
      if (media >= 1.83 && media <= 2.65) return "Impacto bajo"
      if (media >= 2.66 && media <= 3.48) return "Impacto bajo moderado"
      if (media >= 3.49 && media <= 4.31) return "Impacto moderado"
      if (media >= 4.32 && media <= 5.14) return "Impacto alto moderado"
      return "Alto impacto"
    }
  
    // Mostrar resultados en la interfaz
    function mostrarResultados(resultados) {
      // Inteligencia Emocional
      document.getElementById("resultado-atencion").textContent =
        `${resultados.atencion.nivel}: ${resultados.atencion.descripcion}`
      document.getElementById("bar-atencion").style.width = `${resultados.atencion.porcentaje}%`
  
      document.getElementById("resultado-claridad").textContent =
        `${resultados.claridad.nivel}: ${resultados.claridad.descripcion}`
      document.getElementById("bar-claridad").style.width = `${resultados.claridad.porcentaje}%`
  
      document.getElementById("resultado-reparacion").textContent =
        `${resultados.reparacion.nivel}: ${resultados.reparacion.descripcion}`
      document.getElementById("bar-reparacion").style.width = `${resultados.reparacion.porcentaje}%`
  
      // Perfil de Riesgo
      document.getElementById("resultado-riesgo").textContent =
        `${resultados.perfilRiesgo.nivel}: ${resultados.perfilRiesgo.descripcion}`
      document.getElementById("bar-riesgo").style.width = `${resultados.perfilRiesgo.porcentaje}%`
  
      // Sesgos Cognitivos
      document.getElementById("resultado-representatividad").textContent = resultados.heuristicaRepresentatividad
      document.getElementById("resultado-sobreconfianza").textContent = resultados.sobreconfianza
      document.getElementById("resultado-anclaje").textContent = resultados.sesgoAnclaje
      document.getElementById("resultado-falacia").textContent = resultados.falaciaJugador
      document.getElementById("resultado-capacidad").textContent = resultados.sesgoCapacidad
      document.getElementById("resultado-aversion-perdida").textContent = resultados.aversionPerdida
      document.getElementById("resultado-aversion-remordimiento").textContent = resultados.aversionRemordimiento
      document.getElementById("resultado-contabilidad").textContent = resultados.contabilidadMental
      document.getElementById("resultado-rebano").textContent = resultados.efectoRebano
  
      // Mostrar sección de resultados
      showSection("resultados")
    }
  
    // Enviar resultados a Google Sheets
    function enviarResultados(resultados) {
      const dataToSend = {
        nombre: userData.nombre,
        correo: userData.correo,
        atencion: resultados.atencion.nivel,
        claridad: resultados.claridad.nivel,
        reparacion: resultados.reparacion.nivel,
        perfilRiesgo: resultados.perfilRiesgo.nivel,
        heuristicaRepresentatividad: resultados.heuristicaRepresentatividad,
        sobreconfianza: resultados.sobreconfianza,
        sesgoAnclaje: resultados.sesgoAnclaje,
        falaciaJugador: resultados.falaciaJugador,
        sesgoCapacidad: resultados.sesgoCapacidad,
        aversionPerdida: resultados.aversionPerdida,
        aversionRemordimiento: resultados.aversionRemordimiento,
        contabilidadMental: resultados.contabilidadMental,
        efectoRebano: resultados.efectoRebano,
      }
  
      fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Datos enviados correctamente:", data)
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error)
        })
    }
  
    // Mostrar una sección específica
    function showSection(sectionId) {
      // Ocultar todas las secciones
      document.querySelectorAll(".section").forEach((section) => {
        section.classList.remove("active")
      })
  
      // Mostrar la sección solicitada
      document.getElementById(sectionId).classList.add("active")
  
      // Scroll al inicio
      window.scrollTo(0, 0)
    }
  
    // Reiniciar formulario
    function resetForm() {
      userData = {
        nombre: "",
        correo: "",
        respuestasEmocionales: [],
        respuestasRiesgo: [],
        respuestasSesgos: [],
      }
  
      document.getElementById("user-info-form").reset()
      document.getElementById("emocional-form").reset()
      document.getElementById("riesgo-form").reset()
      document.getElementById("sesgos-form").reset()
    }
  })
  