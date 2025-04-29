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
  
  // Mapeo de preguntas de sesgos a sus indicadores
  const mapeoSesgos = {
    // Heurística de Representatividad (preguntas 44-45)
    heuristicaRepresentatividad: [0, 1],
    // Sobreconfianza (pregunta 46)
    sobreconfianza: [2],
    // Sesgo de Anclaje (preguntas 47-48)
    sesgoAnclaje: [3, 4],
    // Falacia del Jugador (pregunta 49)
    falaciaJugador: [5],
    // Sesgo de Capacidad (preguntas 50-51)
    sesgoCapacidad: [6, 7],
    // Aversión a la Pérdida (preguntas 52-53)
    aversionPerdida: [8, 9],
    // Aversión al Remordimiento (preguntas 54-55)
    aversionRemordimiento: [10, 11],
    // Contabilidad Mental (preguntas 56-57)
    contabilidadMental: [12, 13],
    // Efecto Rebaño (preguntas 58-61)
    efectoRebano: [14, 15, 16, 17],
  }
  