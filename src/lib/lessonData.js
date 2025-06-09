const lessonsByGradeAndDifficultyData = {
  decimo: {
    principiante: [
      {
        id: "d_p1",
        gradeKey: "decimo", difficultyKey: "principiante",
        title: "Introducción a Python",
        description: "Conceptos básicos de Python para empezar.",
        difficulty: "Fácil",
        xpReward: 40,
        introTitle: "¡Hola, Futuro Programador de Décimo!",
        introduction: `Bienvenido al mundo de Python. Aquí aprenderás qué es un lenguaje de programación y cómo Python te ayuda a dar instrucciones a la computadora.
        <br><br><strong>¿Qué es Programar?</strong> Es como enseñarle a la computadora a hacer tareas paso a paso.
        <br><strong>Python:</strong> Es un lenguaje popular, fácil de leer y muy poderoso.
        <br><br>Tu primera tarea será entender cómo mostrar mensajes. Usaremos la función <code>print()</code>.
        <pre class="code-highlight"><code>print("¡Hola, Décimo Grado!")</code></pre>
        ¡Empecemos esta aventura!`,
        questions: [
          {
            id: "d_p1q1", type: "theory",
            concept: `La función <code>print()</code> en Python se usa para mostrar texto o valores en la pantalla. El texto que quieres mostrar debe ir entre comillas.`,
            question: "¿Para qué se usa la función `print()` en Python?",
            options: ["Para hacer cálculos matemáticos", "Para guardar datos", "Para mostrar mensajes en pantalla", "Para crear variables"],
            correct: 2,
            explanation: "`print()` es tu herramienta para que el programa 'hable' y muestre resultados o mensajes.",
            xp: 10,
          },
          {
            id: "d_p1q2", type: "code",
            concept: `Para usar <code>print()</code>, escribe <code>print("Tu mensaje aquí")</code>. Asegúrate de que el mensaje esté entre comillas.`,
            question: "Escribe el código Python para mostrar el mensaje 'Mi primera línea de código'.",
            placeholder: "# Escribe tu print aquí",
            correct: ["print(\"Mi primera línea de código\")", "print('Mi primera línea de código')"],
            explanation: "Debes usar `print()` seguido del texto entre comillas simples o dobles.",
            xp: 15,
          },
        ],
      },
      {
        id: "d_p2",
        gradeKey: "decimo", difficultyKey: "principiante",
        title: "Variables Simples",
        description: "Guardando información básica.",
        difficulty: "Fácil",
        xpReward: 50,
        introTitle: "Guardando Tesoros: Variables",
        introduction: `Imagina que tienes cajas para guardar cosas. En Python, esas cajas se llaman <strong>variables</strong>. Les pones un nombre (etiqueta) y guardas un valor dentro.
        <br><br>Ejemplo: <code>edad = 15</code>. Aquí, 'edad' es el nombre de la variable y 15 es el valor.
        <br>Puedes guardar números: <code>puntos = 100</code>
        <br>Puedes guardar texto (llamado 'string'): <code>nombre = "Ana"</code> (el texto va entre comillas).
        <br><br>¡Vamos a practicar cómo crear y usar estas 'cajas' mágicas!`,
        questions: [
          {
            id: "d_p2q1", type: "theory",
            concept: `Una variable se crea asignándole un valor con el signo <code>=</code>. Ejemplo: <code>mi_variable = valor</code>.`,
            question: "¿Qué símbolo se usa para asignar un valor a una variable en Python?",
            options: [":", "==", "=", "->"],
            correct: 2,
            explanation: "El signo igual `=` se usa para la asignación.",
            xp: 10,
          },
          {
            id: "d_p2q2", type: "code",
            concept: `Para crear una variable de texto (string), el texto debe ir entre comillas. Ejemplo: <code>colegio = "Mi Colegio"</code>.`,
            question: "Crea una variable llamada 'materia' y asígnale el valor 'Programación'.",
            placeholder: "# tu variable aquí",
            correct: ["materia = \"Programación\"", "materia = 'Programación'"],
            explanation: "Recuerda usar comillas para el texto: `materia = \"Programación\"`.",
            xp: 15,
          },
        ],
      },
    ],
    intermedio: [
       {
        id: "d_i1",
        gradeKey: "decimo", difficultyKey: "intermedio",
        title: "Operaciones Básicas",
        description: "Suma y resta con Python.",
        difficulty: "Medio",
        xpReward: 60,
        introTitle: "Python como Calculadora",
        introduction: `Python puede hacer matemáticas por ti. Los símbolos que usamos son:
        <br><code>+</code> para sumar
        <br><code>-</code> para restar
        <br><br>Puedes hacer operaciones directamente: <code>print(10 + 5)</code> mostrará <code>15</code>.
        <br>O puedes usar variables:
        <pre class="code-highlight"><code>num1 = 20
num2 = 8
resta = num1 - num2
print(resta)  # Mostrará 12</code></pre>
        ¡A calcular!`,
        questions: [
          {
            id: "d_i1q1", type: "code",
            concept: `Usa el símbolo <code>+</code> para sumar números. Puedes sumar números directamente o el valor de variables numéricas.`,
            question: "Escribe código para sumar 50 y 25, y mostrar el resultado.",
            placeholder: "# Suma y muestra aquí",
            correct: "print(50 + 25)",
            explanation: "Simplemente `print(50 + 25)`.",
            xp: 20,
          },
        ],
      },
    ],
  },
  primero_bach: {
    principiante: [
      {
        id: "b1_p1",
        gradeKey: "primero_bach", difficultyKey: "principiante",
        title: "Repaso: Variables y Tipos",
        description: "Reforzando variables y tipos de datos.",
        difficulty: "Fácil",
        xpReward: 50,
        introTitle: "¡De Vuelta a las Variables!",
        introduction: `En Primero de Bachillerato, es clave tener sólidos los fundamentos. Recordemos las <strong>variables</strong>: contenedores para datos.
        <br><br>Y los <strong>tipos de datos</strong> principales:
        <ul>
            <li><code>int</code>: Enteros (ej: <code>10</code>, <code>-3</code>)</li>
            <li><code>float</code>: Decimales (ej: <code>3.14</code>, <code>-0.5</code>)</li>
            <li><code>str</code>: Texto (ej: <code>"Hola Bachillerato"</code>)</li>
            <li><code>bool</code>: Verdadero/Falso (<code>True</code>, <code>False</code>)</li>
        </ul>
        <pre class="code-highlight"><code>nombre_estudiante = "Luis"
edad_estudiante = 16
promedio = 8.75
esta_aprobado = True</code></pre>
        ¡Vamos a asegurar que esto esté clarísimo!`,
        questions: [
          {
            id: "b1_p1q1", type: "theory",
            concept: `Los números decimales en Python se representan con el tipo de dato <code>float</code>.`,
            question: "¿Qué tipo de dato usarías para almacenar el valor <code>9.5</code> (una calificación)?",
            options: ["int", "str", "float", "bool"],
            correct: 2,
            explanation: "Para números con decimales, se usa `float`.",
            xp: 10,
          },
          {
            id: "b1_p1q2", type: "code",
            concept: `Los valores booleanos son <code>True</code> o <code>False</code> (con la primera letra en mayúscula). Se usan para representar estados de verdad.`,
            question: "Crea una variable llamada 'es_mayor_edad' y asígnale el valor booleano verdadero.",
            placeholder: "# Variable booleana aquí",
            correct: "es_mayor_edad = True",
            explanation: "Recuerda que `True` va con 'T' mayúscula.",
            xp: 15,
          },
        ],
      },
    ],
    intermedio: [
      {
        id: "b1_i1",
        gradeKey: "primero_bach", difficultyKey: "intermedio",
        title: "Condicionales Simples",
        description: "Tomando decisiones con `if`.",
        difficulty: "Medio",
        xpReward: 70,
        introTitle: "Tomando Decisiones: El `if`",
        introduction: `A veces, tu programa necesita decidir qué hacer. Para eso usamos el <strong>condicional <code>if</code></strong>.
        <br><br>Funciona así: <code>if condicion_es_verdadera:</code>
        <br><code>    # Haz esto</code>
        <br><br>Si la condición después del <code>if</code> es <code>True</code>, el código indentado (con espacios) debajo se ejecuta.
        <pre class="code-highlight"><code>edad = 17
if edad >= 18:
    print("Puede votar")
else:
    print("No puede votar aún")</code></pre>
        El <code>else:</code> es opcional, y se ejecuta si la condición del <code>if</code> es <code>False</code>.
        ¡A tomar decisiones!`,
        questions: [
          {
            id: "b1_i1q1", type: "code",
            concept: `Un bloque <code>if</code> ejecuta código si su condición es <code>True</code>. Un bloque <code>else</code> se ejecuta si la condición del <code>if</code> es <code>False</code>.`,
            question: "Dada la variable `nota = 6`. Escribe un `if/else` que imprima 'Aprobado' si nota es mayor o igual a 7, y 'Reprobado' si no.",
            placeholder: "nota = 6\n# Tu if/else aquí",
            correct: "nota = 6\nif nota >= 7:\n    print(\"Aprobado\")\nelse:\n    print(\"Reprobado\")",
            explanation: "La condición es `nota >= 7`. El `print` para cada caso debe estar indentado.",
            xp: 25,
          },
        ],
      },
    ],
    dificil: [
       {
        id: "b1_d1",
        gradeKey: "primero_bach", difficultyKey: "dificil",
        title: "Bucles `for` básicos",
        description: "Repitiendo acciones un número de veces.",
        difficulty: "Difícil",
        xpReward: 80,
        introTitle: "Repeticiones con el Bucle `for`",
        introduction: `Cuando necesitas repetir una acción varias veces, usas un <strong>bucle</strong>. El bucle <code>for</code> es genial para esto, especialmente con <code>range()</code>.
        <br><br><code>range(N)</code> genera números desde 0 hasta N-1.
        <pre class="code-highlight"><code># Esto imprimirá los números 0, 1, 2
for numero in range(3):
    print(numero)</code></pre>
        El código indentado dentro del <code>for</code> se repite para cada valor generado por <code>range()</code>.
        ¡A repetir con estilo!`,
        questions: [
          {
            id: "b1_d1q1", type: "code",
            concept: `<code>for variable in range(X):</code> repetirá el bloque de código X veces. La <code>variable</code> tomará valores de 0 a X-1.`,
            question: "Escribe un bucle `for` que imprima la palabra 'Hola' 5 veces.",
            placeholder: "# Tu bucle for aquí",
            correct: "for i in range(5):\n    print(\"Hola\")",
            explanation: "`range(5)` hace que el bucle se ejecute 5 veces. Dentro, imprimimos 'Hola'.",
            xp: 30,
          },
        ],
      },
    ]
  },
  segundo_bach: {
    intermedio: [
      {
        id: "b2_i1",
        gradeKey: "segundo_bach", difficultyKey: "intermedio",
        title: "Listas",
        description: "Colecciones ordenadas de datos.",
        difficulty: "Medio",
        xpReward: 75,
        introTitle: "Organizando Datos: Listas",
        introduction: `Una <strong>lista</strong> en Python te permite guardar múltiples ítems en una sola variable, en un orden específico.
        <br><br>Se crean con corchetes <code>[]</code> y los ítems se separan por comas:
        <pre class="code-highlight"><code>mis_notas = [10, 8, 9, 7, 10]
materias = ["Matemáticas", "Física", "Química"]</code></pre>
        Puedes acceder a un ítem por su <strong>índice</strong> (posición, empezando en 0):
        <code>print(materias[0])</code> mostraría "Matemáticas".
        <br><br>Las listas son muy versátiles. ¡Vamos a explorarlas!`,
        questions: [
          {
            id: "b2_i1q1", type: "code",
            concept: `Para crear una lista, encierra los elementos entre corchetes <code>[]</code>, separados por comas.`,
            question: "Crea una lista llamada 'frutas' con los siguientes ítems: 'manzana', 'banana', 'cereza'.",
            placeholder: "# Lista de frutas aquí",
            correct: "frutas = [\"manzana\", \"banana\", \"cereza\"]",
            explanation: "frutas = [\"manzana\", \"banana\", \"cereza\"] o con comillas simples.",
            xp: 25,
          },
        ],
      },
    ],
    dificil: [
      {
        id: "b2_d1",
        gradeKey: "segundo_bach", difficultyKey: "dificil",
        title: "Funciones Básicas",
        description: "Creando bloques de código reutilizables.",
        difficulty: "Difícil",
        xpReward: 90,
        introTitle: "Bloques Mágicos: Funciones",
        introduction: `Una <strong>función</strong> es un bloque de código con nombre que realiza una tarea específica. Puedes "llamarla" cuando necesites que haga su trabajo.
        <br><br>Se definen con <code>def</code>:
        <pre class="code-highlight"><code>def saludar():
    print("¡Hola desde la función!")

saludar() # Así se llama a la función</code></pre>
        Las funciones pueden recibir datos (<strong>parámetros</strong>) y devolver resultados (con <code>return</code>).
        <pre class="code-highlight"><code>def sumar(a, b):
    return a + b

resultado = sumar(5, 3) # resultado será 8
print(resultado)</code></pre>
        ¡Las funciones hacen tu código más organizado y reutilizable!`,
        questions: [
          {
            id: "b2_d1q1", type: "code",
            concept: `Define una función con <code>def nombre_funcion():</code>. El código de la función debe estar indentado. Llama a la función usando su nombre seguido de paréntesis: <code>nombre_funcion()</code>.`,
            question: "Define una función llamada 'mostrar_mensaje' que imprima 'Aprendiendo funciones'. Luego, llama a esa función.",
            placeholder: "# Define tu función aquí\n\n# Llama a tu función aquí",
            correct: "def mostrar_mensaje():\n    print(\"Aprendiendo funciones\")\n\nmostrar_mensaje()",
            explanation: "Primero `def mostrar_mensaje(): ...` y luego `mostrar_mensaje()`.",
            xp: 35,
          },
        ],
      },
    ],
  },
  tercero_bach: {
    dificil: [
      {
        id: "b3_d1",
        gradeKey: "tercero_bach", difficultyKey: "dificil",
        title: "POO - Introducción",
        description: "Conceptos iniciales de Clases y Objetos.",
        difficulty: "Difícil",
        xpReward: 100,
        introTitle: "El Mundo de los Objetos (POO)",
        introduction: `En Tercero de Bachillerato, damos un gran salto a la <strong>Programación Orientada a Objetos (POO)</strong>.
        <br><br>Imagina que quieres representar cosas del mundo real en tu código, como un 'Estudiante' o un 'Coche'.
        <br>Una <strong>Clase</strong> es como el plano o molde para crear esas cosas. Define qué características (atributos) tienen y qué pueden hacer (métodos).
        <br>Un <strong>Objeto</strong> es una instancia específica creada a partir de esa clase.
        <pre class="code-highlight"><code>class Estudiante:
    def __init__(self, nombre, curso): # Constructor
        self.nombre = nombre      # Atributo
        self.curso = curso        # Atributo

    def presentar(self):          # Método
        print(f"Hola, soy {self.nombre} de {self.curso}.")

# Crear un objeto Estudiante
est1 = Estudiante("Ana", "Tercero Bachillerato")
est1.presentar() # Llamar al método</code></pre>
        <code>__init__</code> es un método especial (constructor) que se ejecuta al crear el objeto. <code>self</code> se refiere al objeto mismo.
        ¡Este es un concepto poderoso!`,
        questions: [
          {
            id: "b3_d1q1", type: "theory",
            concept: `En POO, una Clase es la plantilla, y un Objeto es una instancia creada a partir de esa plantilla.`,
            question: "¿Qué es un 'Objeto' en el contexto de la POO?",
            options: ["Un tipo de variable especial", "Una función que no devuelve nada", "Una instancia específica de una Clase", "El nombre de un archivo de Python"],
            correct: 2,
            explanation: "Un objeto es una 'cosa' real creada usando el 'plano' que es la clase.",
            xp: 30,
          },
        ],
      },
    ],
    avanzado: [
       {
        id: "b3_a1",
        gradeKey: "tercero_bach", difficultyKey: "avanzado",
        title: "POO: Herencia",
        description: "Creando clases a partir de otras.",
        difficulty: "Avanzado",
        xpReward: 120,
        introTitle: "POO: Heredando Características",
        introduction: `La <strong>herencia</strong> es un pilar de la POO que permite crear una nueva clase (clase hija o subclase) que hereda atributos y métodos de una clase existente (clase padre o superclase).
        <br><br>Esto promueve la reutilización de código.
        <pre class="code-highlight"><code>class Animal: # Clase Padre
    def __init__(self, nombre):
        self.nombre = nombre
    def hablar(self):
        raise NotImplementedError("Subclase debe implementar este método")

class Perro(Animal): # Clase Hija, hereda de Animal
    def hablar(self): # Sobrescribe el método hablar
        return "Guau!"

class Gato(Animal): # Otra Clase Hija
    def hablar(self):
        return "Miau!"

mi_perro = Perro("Fido")
print(f"{mi_perro.nombre} dice: {mi_perro.hablar()}") 
# Fido dice: Guau!</code></pre>
        La clase hija puede añadir sus propios métodos y atributos o modificar los heredados (sobrescritura).`,
        questions: [
          {
            id: "b3_a1q1", type: "theory",
            concept: `La herencia permite que una clase (hija) obtenga propiedades y comportamientos de otra clase (padre).`,
            question: "¿Cuál es el principal beneficio de la herencia en POO?",
            options: ["Hacer el código más largo", "Reducir la velocidad del programa", "Reutilizar código y crear jerarquías de clases", "Eliminar la necesidad de objetos"],
            correct: 2,
            explanation: "La herencia ayuda a evitar la duplicación de código y a modelar relaciones 'es un tipo de'.",
            xp: 40,
          },
        ],
      },
    ],
    experto: [
      {
        id: "b3_e1",
        gradeKey: "tercero_bach", difficultyKey: "experto",
        title: "Programación Funcional - Intro",
        description: "Explorando funciones como ciudadanos de primera clase.",
        difficulty: "Experto",
        xpReward: 150,
        introTitle: "Un Vistazo a la Programación Funcional",
        introduction: `La programación funcional es un paradigma donde las funciones son tratadas como valores: pueden ser asignadas a variables, pasadas como argumentos y devueltas por otras funciones.
        <br><br>Características clave:
        <ul>
            <li><strong>Inmutabilidad:</strong> Los datos no cambian una vez creados.</li>
            <li><strong>Funciones Puras:</strong> Para la misma entrada, siempre devuelven la misma salida y no tienen efectos secundarios.</li>
            <li><strong>Funciones de Orden Superior:</strong> Funciones que operan sobre otras funciones (ej. <code>map</code>, <code>filter</code>).</li>
        </ul>
        <pre class="code-highlight"><code>def cuadrado(x):
    return x * x

numeros = [1, 2, 3, 4]
cuadrados = list(map(cuadrado, numeros)) # map es una función de orden superior
# cuadrados será [1, 4, 9, 16]
print(cuadrados)</code></pre>
        Este enfoque puede llevar a código más conciso y predecible.`,
        questions: [
          {
            id: "b3_e1q1", type: "theory",
            concept: `En programación funcional, las funciones pueden ser pasadas como argumentos a otras funciones.`,
            question: "¿Qué es una 'función de orden superior'?",
            options: ["Una función muy compleja", "Una función que opera sobre otras funciones", "Una función que solo usa números enteros", "Una función que siempre devuelve True"],
            correct: 1,
            explanation: "Las funciones de orden superior toman funciones como entrada o devuelven funciones como salida.",
            xp: 50,
          },
        ],
      },
    ],
    especializacion: [
      {
        id: "b3_s1",
        gradeKey: "tercero_bach", difficultyKey: "especializacion",
        title: "Machine Learning - Conceptos",
        description: "Una breve introducción al aprendizaje automático.",
        difficulty: "Especialización",
        xpReward: 200,
        introTitle: "Rumbo al Machine Learning",
        introduction: `El <strong>Machine Learning (ML)</strong> o Aprendizaje Automático es un campo de la inteligencia artificial donde los sistemas aprenden de los datos sin ser programados explícitamente para cada tarea.
        <br><br>Tipos principales de ML:
        <ul>
            <li><strong>Supervisado:</strong> Aprende de datos etiquetados (entrada y salida esperada). Ej: Clasificación, Regresión.</li>
            <li><strong>No Supervisado:</strong> Aprende de datos no etiquetados, buscando patrones. Ej: Clustering, Reducción de dimensionalidad.</li>
            <li><strong>Por Refuerzo:</strong> Aprende tomando acciones en un entorno para maximizar una recompensa. Ej: Juegos, Robótica.</li>
        </ul>
        Python es un lenguaje líder en ML gracias a librerías como Scikit-learn, TensorFlow y PyTorch.
        <br><br>Este es un campo vasto y emocionante. ¡Esta lección es solo el comienzo!`,
        questions: [
          {
            id: "b3_s1q1", type: "theory",
            concept: `El aprendizaje supervisado utiliza datos etiquetados para entrenar modelos.`,
            question: "¿Qué tipo de Machine Learning utiliza datos con 'respuestas correctas' para aprender?",
            options: ["No Supervisado", "Por Refuerzo", "Supervisado", "Semi-Supervisado"],
            correct: 2,
            explanation: "El aprendizaje supervisado necesita datos de entrada junto con sus correspondientes salidas deseadas (etiquetas).",
            xp: 60,
          },
        ],
      },
    ]
  },
};

export const getLessonsByGradeAndDifficulty = (gradeKey, difficultyKey) => {
  if (lessonsByGradeAndDifficultyData[gradeKey] && lessonsByGradeAndDifficultyData[gradeKey][difficultyKey]) {
    return lessonsByGradeAndDifficultyData[gradeKey][difficultyKey];
  }
  return [];
};

export const getAllLessons = () => {
  let allLessons = [];
  for (const grade in lessonsByGradeAndDifficultyData) {
    for (const difficulty in lessonsByGradeAndDifficultyData[grade]) {
      allLessons = allLessons.concat(lessonsByGradeAndDifficultyData[grade][difficulty]);
    }
  }
  return allLessons;
};