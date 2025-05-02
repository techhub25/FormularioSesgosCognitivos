document.addEventListener("DOMContentLoaded", () => {
  // Variables para almacenar respuestas
  let userData = {
    //nombre: "",
    correo: "",
    respuestasEmocionales: [],
    respuestasRiesgo: [],
    respuestasFiltro: [], // Nueva array para las preguntas filtro
    respuestasSesgos: [],
  }

  // URL del Google Apps Script Web App (reemplazar con tu URL)
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx0dNvCT6Sts-5We8rdJm8Xa5xOxBkRzbrDi5GsmRE0pLQweQo3jhge0uEaHa9iwz0-fw/exec "

  // Preguntas de Inteligencia Emocional (1-24)
  const preguntasEmocionales = [
    "Presto atención a los sentimientos.",
    "Normalmente me preocupo por lo que siento.",
    "Normalmente me dedico tiempo a pensar en mis emociones.",
    "Pienso que merece la pena prestar atención a mis emociones.",
    "Dejo que mis sentimientos afecten mis pensamientos.",
    "Pienso en mi estado de ánimo constantemente.",
    "A menudo pienso en mis sentimientos.",
    "Presto mucha atención a cómo me siento.",
    "Tengo claros mis sentimientos.",
    "Frecuentemente puedo definir mis sentimientos.",
    "Casi siempre sé cómo me siento.",
    "Normalmente conozco mis sentimientos sobre las personas.",
    "A menudo me doy cuenta de mis sentimientos en diferentes situaciones.",
    "Siempre puedo decir cómo me siento.",
    "Puedo llegar a comprender mis sentimientos.",
    "Aunque a veces me siento triste, suelo tener una visión positiva.",
    "Aunque me sienta mal procuro pensar en cosas agradables.",
    "Cuando estoy triste, pienso en todos los placeres de la vida.",
    "Intento tener pensamientos positivos, aunque me sienta mal.",
    "Si doy demasiadas vueltas a las cosas, complicándolas, trato de calmarme.",
    "Me preocupo de tener un buen estado de ánimo.",
    "Tengo mucha energía cuando me siento feliz.",
    "Cuando estoy enfadado intento cambiar mi estado de ánimo.",
  ]

  // Preguntas de Perfil de Riesgo (24-43)
  const preguntasRiesgo = [
    {
      pregunta: "En general, tus amigos cómo te consideran a la hora de tomar un riesgo:",
      opciones: [
        "Verdadero apostador",
        "Dispuesto a tomar riesgos después de estudiar sus implicaciones",
        "Cauteloso",
        "Adverso a todo riesgo",
      ],
      valores: [4, 3, 2, 1],
    },
    {
      pregunta: "Estás en un juego de programa de televisión, cuál opción escogerías:",
      opciones: [
        "1.000$ en efectivo",
        "50% de probabilidad de ganar 5.000$ o nada",
        "25% de probabilidad de ganar 10.000$ o nada",
        "5% de probabilidad de ganar 100.000$ o nada",
      ],
      valores: [1, 2, 3, 4],
    },
    {
      pregunta:
        "Salvaste suficiente dinero para irte a la vacación de tus sueños. Tres semanas antes, pierdes tu trabajo. Qué haces:",
      opciones: [
        "Cancelas la vacación",
        "Vas a una más modesta",
        "Sigues con el plan actual, razonando que necesitas más tiempo para conseguir otro trabajo",
        "Extiendes tus vacaciones, porque esta puede ser la última vez que viajes en primera clase",
      ],
      valores: [1, 2, 3, 4],
    },
    {
      pregunta: "Es difícil para mí pasar un buen trato:",
      opciones: ["Muy cierto", "A veces cierto", "Nada cierto"],
      valores: [1, 2, 3],
    },
    {
      pregunta: "Inesperadamente recibe 20.000$, qué haces:",
      opciones: [
        "Lo pongo en una cuenta de banco con interés modesto y esté asegurado ante un colapso del banco",
        "Lo invierte en bonos de alta calidad y fondos mutuales",
        "Lo invierte en acciones y fondos mutuales",
      ],
      valores: [1, 2, 3],
    },
    {
      pregunta:
        "Basado en su experiencia, qué tan cómodo está usted en invertir su dinero en acciones o en fondos mutuales:",
      opciones: ["Nada cómodo", "Un poco cómodo", "Muy cómodo"],
      valores: [1, 2, 3],
    },
    {
      pregunta: "Cual situación te haría más feliz:",
      opciones: [
        "Ganaste 50.000$ en un concurso de una publicación que hiciste",
        "Heredaste 50.000$ de un familiar adinerado",
        "Ganaste 50.000$ arriesgando 1.000$ en opciones",
        "Cualquiera de las anteriores, al final ganaste 50.000$",
      ],
      valores: [2, 1, 3, 1],
    },
    {
      pregunta: "Cuando piensas en la palabra riesgo, cuál de estas opciones se viene a tu mente:",
      opciones: ["Pérdida", "Incertidumbre", "Oportunidad", "Emocionante"],
      valores: [1, 2, 3, 4],
    },
    {
      pregunta:
        "Heredas una casa de 80.000$. La casa está en una buena urbanización y esperas que se aprecie más rápido que la inflación. Si la alquilas mañana, podrás obtener 600$ mensuales, pero si la reparas y actualizas, podrás obtener 800$. Para poder repararla tendrás que tomar un préstamo. Qué haces:",
      opciones: ["La vendo", "Rento la casa como está", "Reparo y actualizo, luego la rento"],
      valores: [1, 2, 3],
    },
    {
      pregunta: "En tu opinión, es más importante proteger tu dinero de la inflación o de las pérdidas y hurto:",
      opciones: [
        "Mucho más importante protegerlo de las pérdidas y hurto",
        "Mucho más importante protegerlo de la inflación",
      ],
      valores: [1, 3],
    },
    {
      pregunta:
        "Tomaste un empleo en una compañía en crecimiento donde te pagan 6.000$ al año. Al año de trabajar en esta te ofrecen un bono, cuál escoges:",
      opciones: [
        "Un contrato por 5 años",
        "25.000$ en efectivo",
        "25.000$ en acciones de la compañía que podrían venderse a un mayor precio a futuro",
      ],
      valores: [1, 2, 3],
    },
    {
      pregunta:
        "Algunos expertos predicen que el precio de activos como el oro, las joyas, los objetos de colección y los bienes raíces (activos tangibles) aumentará; sin embargo, los precios de los bonos podrían caer; sin embargo, los expertos coinciden en que los bonos gubernamentales son relativamente seguros. La mayoría de sus inversiones se encuentran actualmente en bonos gubernamentales con altos intereses. Qué haría usted:",
      opciones: [
        "Me quedo con los bonos",
        "Vendo mis bonos, pongo la mitad en una cuenta de ahorros y con la otra compró activos tangibles",
        "Vendo mis bonos e invierto todo en activos tangibles",
        "Vendo mis bonos, invierto todo en activos tangibles y pido un préstamo para poder invertir más dinero",
      ],
      valores: [1, 2, 3, 4],
    },
    {
      pregunta: "Supongamos que va a comprar una casa en las próximas semanas. Su estrategia probablemente sería:",
      opciones: [
        "Comprar una casa asequible donde pueda realizar pagos mensuales cómodamente",
        "Estirar un poco su presupuesto para comprar la casa que realmente desea",
        "Comprar la casa más cara para la que pueda calificar, con un préstamo",
        "Pedir dinero prestado a amigos y familiares para poder calificar para una hipoteca más grande",
      ],
      valores: [1, 2, 3, 4],
    },
    {
      pregunta:
        "Considerando las mejores y peores rentabilidades de las cuatro opciones de inversión a continuación, cuál preferiría:",
      opciones: [
        "Ganancia de $200 en el mejor de los casos; pérdida de $0 en el peor de los casos",
        "Ganancia de $800 en el mejor de los casos; pérdida de $200 en el peor de los casos",
        "Ganancia de $2.600 en el mejor de los casos; pérdida de $800 en el peor de los casos",
        "Ganancia de $4800 en el mejor de los casos; pérdida de $2400 en el peor de los casos",
      ],
      valores: [1, 2, 3, 4],
    },
    {
      pregunta:
        "Supongamos que está solicitando una hipoteca. Las tasas de interés han bajado en los últimos meses. Es posible que esta tendencia continúe. Sin embargo, algunos economistas predicen que las tasas subirán. Tiene la opción de fijar la tasa de interés de su hipoteca o dejarla fluctuar. Si fija la tasa, obtendrá la tasa actual, incluso si las tasas de interés suben. Si las tasas bajan, tendrá que conformarse con la tasa fijada más alta. Planea vivir en la casa durante al menos tres años. Qué haría:",
      opciones: [
        "Fijar la tasa de interés definitivamente",
        "Probablemente fijar la tasa de interés",
        "Probablemente dejar que la tasa de interés fluctúe",
        "Definitivamente dejar que la tasa de interés fluctúe",
      ],
      valores: [1, 2, 3, 4],
    },
    {
      pregunta: "Te dan 1.000$ para invertir. Debes elegir entre:",
      opciones: [
        "Una ganancia segura de $500",
        "Un 50% de probabilidades de ganar $1,000 y un 50% de probabilidades de no ganar nada",
      ],
      valores: [1, 3],
    },
    {
      pregunta: "Le han dado $2,000. Ahora debe elegir entre:",
      opciones: [
        "Una pérdida segura de $500",
        "Un 50% de probabilidades de perder $1,000 y un 50% de probabilidades de no perder nada",
      ],
      valores: [1, 3],
    },
    {
      pregunta:
        "Supongamos que un familiar le dejó una herencia de $100,000, estipulando en su testamento que invierta todo el dinero en una de las siguientes opciones:",
      opciones: [
        "Una cuenta de ahorros o un fondo mutual",
        "Acciones y fondos mutuales",
        "Cartera de acciones en donde puedes escoger 15",
        "Materias primas como oro, plata y petróleo",
      ],
      valores: [1, 2, 3, 4],
    },
    {
      pregunta:
        "Si tuviera que invertir $20,000, cuál de las siguientes opciones de inversión le resultaría más atractiva:",
      opciones: [
        "60% en inversiones de bajo riesgo 30% en inversiones de riesgo medio 10% en inversiones de alto riesgo",
        "30% en inversiones de bajo riesgo 40% en inversiones de riesgo medio 30% en inversiones de alto riesgo",
        "10% en inversiones de bajo riesgo 40% en inversiones de riesgo medio 50% en inversiones de alto riesgo",
      ],
      valores: [1, 2, 3],
    },
    {
      pregunta:
        "Tu amigo y vecino, un geólogo experimentado, está reuniendo a un grupo de inversores para financiar un proyecto de exploración minera de oro. Si el proyecto tiene éxito, podría recuperar de 50 a 100 veces la inversión. Si la mina fracasa, toda la inversión no vale nada. Tu amigo estima que la probabilidad de éxito es solo del 20 %. Si tuvieras el dinero, cuánto invertirías:",
      opciones: ["Nada", "Un mes de salario", "Tres meses de salario", "Seis meses de salario"],
      valores: [1, 2, 3, 4],
    },
  ]

  // Preguntas filtro (nuevas)
  const preguntasFiltro = [
    {
      pregunta: "¿Cuál es la principal ventaja de invertir en fondos mutuos?",
      opciones: ["Garantía de ganancias", "Diversificación del riesgo", "Exención de impuestos", "Liquidez inmediata"],
      valores: [0, 1, 0, 0],
    },
    {
      pregunta: '¿Qué es un "dividendo" en el contexto de acciones?',
      opciones: [
        "Un préstamo que la empresa obtiene de los accionistas",
        "Una parte de las utilidades distribuidas a los accionistas",
        "El costo de comprar una acción",
        "La deuda de la empresa con sus inversores",
      ],
      valores: [0, 1, 0, 0],
    },
    {
      pregunta: "¿Usted es venezolano y reside o ha estado residenciado en Venezuela en los últimos 20 años?",
      opciones: ["Sí", "No"],
      valores: [1, 0],
    },
  ]

  // Preguntas de Sesgos Cognitivos (44-61)
  const preguntasSesgos = [
    'Tú compras acciones "calientes" y evitas acciones que han tenido un mal desempeño en el pasado reciente.',
    "Usas un análisis de tendencias de algunas acciones representativas para tomar las decisiones de inversión de todas las acciones en las cuales inviertes.",
    "Crees que tus habilidades y conocimientos del mercado de valores pueden ayudarte a tener un desempeño mejor al del mercado.",
    "Te basas en tus experiencias pasadas en el mercado para tus próximas inversiones.",
    "Pronosticas los cambios de precio de acciones en el futuro basado en los precios recientes de estas mismas acciones.",
    "Normalmente eres capaz de anticipar el final de los buenos o malos rendimientos del mercado en la Bolsa de Valores.",
    "Prefieres comprar acciones locales que acciones internacionales porque la información de las acciones locales está más disponible.",
    "Consideras la información suministrada por tus amigos y familiares como información veraz para realizar tus inversiones.",
    "Después de una ganancia previa, buscas más riesgo de lo usual.",
    "Después de una pérdida previa, te vuelves más adverso al riesgo.",
    "Evitas vender acciones que han disminuido en valor y vendes fácilmente acciones que han aumentado en valor.",
    "Sientes más pena por mantener acciones perdedoras demasiado tiempo que por vender acciones ganadoras demasiado pronto.",
    "Tiendes a tratar cada elemento de tu portafolio de inversión por separado.",
    "Ignoras la conexión entre diferentes posibilidades de inversión.",
    "Las decisiones de otros inversores al elegir tipos de acciones tienen un impacto en tus decisiones de inversión.",
    "Las decisiones de otros inversores sobre el volumen de acciones tienen un impacto en tus decisiones de inversión.",
    "Las decisiones de compra y venta de acciones de otros inversores tienen un impacto en tus decisiones de inversión.",
    "Usualmente reaccionas rápidamente a los cambios en las decisiones de otros inversores y sigues las reacciones al mercado de valores.",
  ]

  const mapeoSesgos = {
    heuristicaRepresentatividad: [0, 1],
    sobreconfianza: [2],
    sesgoAnclaje: [3, 4],
    falaciaJugador: [5],
    sesgoCapacidad: [6, 7],
    aversionPerdida: [8, 9],
    aversionRemordimiento: [10, 11],
    contabilidadMental: [12, 13],
    efectoRebano: [14, 15, 16, 17],
  }

  // Descripciones de los sesgos cognitivos
  const descripcionesSesgos = {
    introduccion:
      "Los sesgos cognitivos son errores sistemáticos en el pensamiento que pueden llevarnos a tomar decisiones irracionales o a interpretar la información de forma errónea. Las heurísticas, por otro lado, son atajos mentales que utilizamos para simplificar la toma de decisiones, pero pueden ser fuente de sesgos si no se utilizan correctamente. En este cuestionario medimos el impacto de una serie de sesgos sobre tus decisiones de inversión:",
    heuristicaRepresentatividad:
      "Es un atajo mental que utilizamos para evaluar la probabilidad de que un suceso ocurra basándonos en la similitud que tiene con un estereotipo o prototipo mental.",
    sobreconfianza:
      "Es la tendencia a sobreestimar la seguridad con que se toman decisiones, o a creer que se tiene un conocimiento o habilidad superior al que realmente se tiene.",
    sesgoAnclaje:
      'Hace que confiemos excesivamente en la primera información que recibimos, la cual actúa como un "ancla" para nuestras decisiones posteriores.',
    falaciaJugador:
      "Creencia de que la probabilidad de que se produzca un acontecimiento aleatorio en el futuro está influida por la historia pasada de ese tipo de acontecimientos.",
    sesgoCapacidad:
      "Tienden a sobreestimar su competencia en esa área, mientras que aquellos con más capacidad tienden a subestimarla.",
    aversionPerdida: "Impulsa a sentir las pérdidas con mayor intensidad que las ganancias.",
    aversionRemordimiento:
      "Lleva a tomar decisiones que, aunque pueden no ser las mejores en términos de resultados, buscan evitar la posibilidad de arrepentirse en el futuro.",
    contabilidadMental:
      "Se refiere a asignar diferentes valores a la misma cantidad de dinero dependiendo de su origen.",
    efectoRebano:
      "Es una tendencia a seguir las acciones o decisiones de otros, especialmente en situaciones de incertidumbre o presión social.",
  }

  // Inicializar formularios
  initUserInfoForm()
  initEmocionalForm()
  initRiesgoForm()
  initFiltroForm() // Inicializar el formulario de preguntas filtro
  initSesgosForm()
  initResultsSection()

  // Buscar todos los botones "Anterior" y añadir event listeners
  document.querySelectorAll(".back-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-target")
      if (targetSection) {
        showSection(targetSection)
      }
    })
  })

  // Formulario de información del usuario
  // Modificar la función initUserInfoForm() para hacer el correo opcional
  function initUserInfoForm() {
    const form = document.getElementById("user-info-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      //userData.nombre = document.getElementById("nombre").value
      const emailInput = document.getElementById("correo").value
      userData.correo = emailInput.trim() === "" ? "anónimo" : emailInput
      showSection("test-emocional")
    })
  }

  // Formulario de inteligencia emocional
  // Modificar la función initEmocionalForm para usar el nuevo diseño de opciones
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

      const optionsContainer = document.createElement("div")
      optionsContainer.className = "options-container five-options" // Añadir clase para 5 opciones
      optionsDiv.appendChild(optionsContainer)

      const optionLabels = [
        "Nada de acuerdo",
        "Algo de acuerdo",
        "Bastante de acuerdo",
        "Muy de acuerdo",
        "Completamente de acuerdo",
      ]

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
        label.textContent = optionLabels[i - 1]

        option.appendChild(input)
        option.appendChild(label)
        optionsContainer.appendChild(option)
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
  // Modificar la función initRiesgoForm para asegurar que cada pregunta y sus opciones se mantengan juntas
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

      const optionsContainer = document.createElement("div")
      // Añadir clase según el número de opciones
      const numOptions = item.opciones.length
      optionsContainer.className = `options-container ${numOptions}-options`
      optionsDiv.appendChild(optionsContainer)

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
        optionsContainer.appendChild(option)
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

      showSection("preguntas-filtro") // Mostrar sección de preguntas filtro
    })
  }

  // Formulario de preguntas filtro
  function initFiltroForm() {
    const container = document.getElementById("filtro-questions")
    const form = document.getElementById("filtro-form")

    // Generar preguntas filtro
    preguntasFiltro.forEach((item, index) => {
      const questionDiv = document.createElement("div")
      questionDiv.className = "question"

      const questionText = document.createElement("p")
      // Usar un índice que continúe desde el último de riesgo
      const questionNumber = preguntasRiesgo.length + index + 24
      questionText.textContent = `${questionNumber}. ${item.pregunta}`
      questionDiv.appendChild(questionText)

      const optionsDiv = document.createElement("div")
      optionsDiv.className = "options"

      const optionsContainer = document.createElement("div")
      // Añadir clase según el número de opciones
      const numOptions = item.opciones.length
      optionsContainer.className = `options-container ${numOptions}-options`
      optionsDiv.appendChild(optionsContainer)

      item.opciones.forEach((opcion, i) => {
        const option = document.createElement("div")
        option.className = "radio-option"

        const input = document.createElement("input")
        input.type = "radio"
        input.name = `filtro-${index}`
        input.id = `filtro-${index}-${i}`
        input.value = item.valores[i]
        input.required = true

        const label = document.createElement("label")
        label.htmlFor = `filtro-${index}-${i}`
        label.textContent = opcion

        option.appendChild(input)
        option.appendChild(label)
        optionsContainer.appendChild(option)
      })

      questionDiv.appendChild(optionsDiv)
      container.appendChild(questionDiv)
    })

    // Manejar envío del formulario
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Recopilar respuestas
      userData.respuestasFiltro = []
      for (let i = 0; i < preguntasFiltro.length; i++) {
        const selectedOption = document.querySelector(`input[name="filtro-${i}"]:checked`)
        if (selectedOption) {
          userData.respuestasFiltro.push(Number.parseInt(selectedOption.value))
        } else {
          alert("Por favor, responde todas las preguntas.")
          return
        }
      }

      showSection("sesgos-cognitivos")
    })
  }

  // Formulario de sesgos cognitivos
  // Modificar la función initSesgosForm para usar el nuevo diseño de opciones
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

      const optionsContainer = document.createElement("div")
      optionsContainer.className = "options-container six-options" // Añadir clase para 6 opciones
      optionsDiv.appendChild(optionsContainer)

      const optionLabels = [
        "Totalmente en desacuerdo",
        "Muy en desacuerdo",
        "Algo en desacuerdo",
        "Algo de acuerdo",
        "Muy de acuerdo",
        "Totalmente de acuerdo",
      ]

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
        label.textContent = optionLabels[i - 1]

        option.appendChild(input)
        option.appendChild(label)
        optionsContainer.appendChild(option)
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
    const puntajeReparacion = calcularPuntajeRango(userData.respuestasEmocionales, 16, 23)

    // Registrar los puntajes para depuración
    console.log("Puntaje Atención:", puntajeAtencion)
    console.log("Puntaje Claridad:", puntajeClaridad)
    console.log("Puntaje Reparación:", puntajeReparacion)

    // Clasificar inteligencia emocional
    resultados.atencion = clasificarAtencion(puntajeAtencion)
    resultados.claridad = clasificarClaridad(puntajeClaridad)
    resultados.reparacion = clasificarReparacion(puntajeReparacion)

    // Verificar las clasificaciones
    console.log("Clasificación Atención:", resultados.atencion.nivel)
    console.log("Clasificación Claridad:", resultados.claridad.nivel)
    console.log("Clasificación Reparación:", resultados.reparacion.nivel)

    // Calcular perfil de riesgo
    const puntajeRiesgo = userData.respuestasRiesgo.reduce((sum, val) => sum + val, 0)
    resultados.perfilRiesgo = clasificarPerfilRiesgo(puntajeRiesgo)

    // Calcular puntaje de preguntas filtro
    const puntajeFiltro = userData.respuestasFiltro.reduce((sum, val) => sum + val, 0)
    resultados.aprobado = puntajeFiltro === 3 ? "Aprobado" : "No aprobado"

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
    // Verificamos que tenemos respuestas válidas
    if (!respuestas || respuestas.length === 0) {
      console.error("No hay respuestas para calcular")
      return 0
    }

    // Verificamos que fin está dentro del rango del array
    const finReal = Math.min(fin, respuestas.length)
    console.log(`Calculando rango desde ${inicio} hasta ${finReal - 1} (inclusive)`)
    console.log(`Cantidad de preguntas consideradas: ${finReal - inicio}`)

    // Sumamos las respuestas en el rango especificado
    for (let i = inicio; i < finReal; i++) {
      if (respuestas[i] !== undefined) {
        console.log(`Respuesta ${i}: ${respuestas[i]}`)
        suma += respuestas[i]
      } else {
        console.error(`No existe respuesta en el índice ${i}`)
      }
    }

    console.log(`Suma total de puntajes: ${suma}`)
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
    // El puntaje de reparación proviene de 7 preguntas, cada una con valor máximo de 5
    // Por lo tanto, el puntaje máximo es 35, pero las preguntas van del índice 16 al 22 (7 preguntas)
    const porcentaje = (puntaje / 35) * 100

    // Corregimos los umbrales según los datos correctos para la reparación (ajustados para 7 preguntas)
    if (puntaje <= 21) {
      console.log("Clasificado como: Baja")
      return { nivel: "Baja", descripcion: "Baja capacidad de reparación.", porcentaje: porcentaje }
    }
    if (puntaje <= 30) {
      console.log("Clasificado como: Adecuada")
      return { nivel: "Adecuada", descripcion: "Adecuada capacidad de reparación.", porcentaje: porcentaje }
    }

    console.log("Clasificado como: Excelente")
    return { nivel: "Excelente", descripcion: "Excelente capacidad de reparación.", porcentaje: porcentaje }
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
    document.getElementById("nivel-atencion").textContent = resultados.atencion.nivel
    document.getElementById("descripcion-atencion").textContent = resultados.atencion.descripcion
    updateCircleProgress("circle-atencion", "percentage-atencion", resultados.atencion.porcentaje)

    document.getElementById("nivel-claridad").textContent = resultados.claridad.nivel
    document.getElementById("descripcion-claridad").textContent = resultados.claridad.descripcion
    updateCircleProgress("circle-claridad", "percentage-claridad", resultados.claridad.porcentaje)

    document.getElementById("nivel-reparacion").textContent = resultados.reparacion.nivel
    document.getElementById("descripcion-reparacion").textContent = resultados.reparacion.descripcion
    updateCircleProgress("circle-reparacion", "percentage-reparacion", resultados.reparacion.porcentaje)

    // Perfil de Riesgo
    document.getElementById("nivel-riesgo").textContent = resultados.perfilRiesgo.nivel
    document.getElementById("descripcion-riesgo").textContent = resultados.perfilRiesgo.descripcion
    updateCircleProgress("circle-riesgo", "percentage-riesgo", resultados.perfilRiesgo.porcentaje)

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

  // Actualizar indicador de progreso circular
  function updateCircleProgress(circleId, percentageId, value) {
    const circle = document.getElementById(circleId)
    const percentage = document.getElementById(percentageId)

    if (circle && percentage) {
      // Verificar que el valor es un número válido
      let safeValue = isNaN(value) ? 0 : value
      // Asegurar que el valor esté entre 0 y 100
      safeValue = Math.min(Math.max(safeValue, 0), 100)

      // Actualizar el gradiente cónico para mostrar el progreso
      circle.style.background = `conic-gradient(var(--primary-color) ${safeValue}%, #e5e7eb ${safeValue}%)`

      // Actualizar el texto del porcentaje
      percentage.textContent = `${Math.round(safeValue)}%`
    } else {
      console.error(`No se encontraron los elementos con ID ${circleId} o ${percentageId}`)
    }
  }

  // Enviar resultados a Google Sheets
  function enviarResultados(resultados) {
    const dataToSend = {
      //nombre: userData.nombre,
      correo: userData.correo,
      atencion: resultados.atencion.nivel,
      claridad: resultados.claridad.nivel,
      reparacion: resultados.reparacion.nivel,
      perfilRiesgo: resultados.perfilRiesgo.nivel,
      aprobado: resultados.aprobado, // Aseguramos que esto se envía
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

    console.log("Estado de aprobación enviado:", resultados.aprobado)

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
      respuestasFiltro: [],
      respuestasSesgos: [],
    }

    document.getElementById("user-info-form").reset()
    document.getElementById("emocional-form").reset()
    document.getElementById("riesgo-form").reset()
    document.getElementById("filtro-form").reset()
    document.getElementById("sesgos-form").reset()
  }
})
