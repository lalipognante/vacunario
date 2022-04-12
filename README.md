# Vacunario
Con nuestra aplicación se busca ofrecer una solución para padres, responsables de salud y centros de salud. Buscando reemplazar las libretas de vacunación en papel y digitalizar todo el proceso oficial.

Para el caso de los padres, se prioriza simplificar el almacenamiento de la libreta de vacunación, tanto suya como de sus hijos o menores a cargo. Brindando un almacenamiento en la nube, para solucionar la pérdida de libretas y una mayor facilidad de disponibilidad cuando sea necesaria. Cabe destacar que el sistema le dará la opción de recibir notificaciones con anticipación sobre las próximas vacunas a colocar por libreta, para que el usuario no se olvide y también información sobre el Centro de Salud cercano que cuenta con disponibilidad de dicha vacuna.

Para el caso de los Centros de Salud, les permitirá simplificar la gestión del registro de inventario y también el registro de Responsables de Salud que interactúen con el sistema, para la certificación de la colocación de vacunas a los usuarios.
 
 ## Pantallas de la app
 
 En esta sección del documento se procederá a explicar las funcionalidades más importantes que posee la plataforma, de forma gráfica mostrando las pantallas principales de la misma, haciendo un recorrido por cada una e indicando el objetivo de cada una de las pantallas. Solamente se adjuntaran las pantallas de la aplicación como Modo Padre, se omitiran los detalles de las pantallas de Centro de Salud y Responsable de Salud.
 
 ### Pantallas de la aplicación del Padre
 
 #### Home
 Esta pantalla es la pantalla inicial y a la que se accede ni bien se ingresa a la aplicación. En ella se pueden encontrar los recordatorios divididos en tres secciones : “Vencidas”, “Este Mes”, “Próximo Mes”.
En la sección Vencidas: se visualizarán las vacunas de todas las libretas que no se hayan colocado en el momento adecuado, y solamente se mostrarán las vacunas que tienen un vencimiento hasta 2 meses .
En la sección Este Mes: se visualizarán las vacunas de todas las libretas que se deben colocar este mes.
En la sección Próximo Mes: se visualizarán las vacunas de todas las libretas que se deben colocar el próximo mes.

 <img src="https://github.com/lalipognante/vacunario/blob/master/home.png" width="250">
 
 #### Libretas
 Si se presiona el botón “libreta” del footer, se accede a la pantalla para administrar las libretas agregadas por dicho usuario.
Esta pantalla es la parte central de la aplicación del padre. Aquí es donde se puede agregar una nueva libreta y se visualizan todas las libretas creadas por dicho padre.
Si se presiona el nombre de cada libreta, se direcciona a la próxima pantalla que es “Detalle de libreta”.

 <img src="https://github.com/lalipognante/vacunario/blob/master/libretas.png" width="250">
 
 #### Detalle de la libreta
 Al acceder al nombre de una libreta, se llega a esta pantalla. Aquí se obtienen todas las vacunas del Carnet de Vacunación oficial de Argentina, ordenadas por edad de colocación.
Para cada vacuna se le asigna un icono rojo en cruz por defecto, ya que se necesita colocar esta vacuna por un responsable de salud autorizado para que el icono se convierta en un tilde verde.
Cada vacuna tiene su información detallada, que lo veremos en la sección “Información de una vacuna”.

 <img src="https://github.com/lalipognante/vacunario/blob/master/detallelibreta.png" width="250">
  
 #### Colocación de la vacuna con código QR
 Para colocar una vacuna, se debe estar situado en el “Detalle de una libreta” y clickear sobre el nombre de la vacuna, inmediatamente se generará un código QR con la información de dicha vacuna y los datos de la persona a la cual se le colocará la vacuna.
Este código QR debe ser escaneado por el Responsable de Salud autorizado , para que pueda colocarse.

 <img src="https://github.com/lalipognante/vacunario/blob/master/codigoqr.png" width="250">
 
 #### Detalle de la vacuna
 Las vacunas que ya están colocadas, en vez de poseer el código QR, pasarán a contar con la información de dicha colocación, como: DNI de la persona a la cual fue colocada la vacuna, nombre de la vacuna colocada, fecha de colocación, Responsable de Salud que la colocó y Centro de Salud donde fue colocada.
 
 <img src="https://github.com/lalipognante/vacunario/blob/master/colocacion.png" width="250">
  
 #### Información de la vacuna
 Para informarse sobre una vacuna, se debe estar situado en el “Detalle de una libreta” y clickear sobre el icono “info” que está situado a la derecha de cada vacuna. En esta pantalla se visualizará el nombre completo de la vacuna, el detalle de dicha vacuna (el cual informa para qué colocarla) , un link de “Ver más información” el cual direcciona a la página oficial del gobierno de la nación que contiene más información sobre dicha vacuna y un mapa de google maps en el cual se visualizan solamente los Centros de Salud que tienen disponible en dicho momento esa vacuna.
 
 <img src="https://github.com/lalipognante/vacunario/blob/master/informacion.png" width="250">
