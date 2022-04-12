# Vacunario
Con nuestra aplicación se busca ofrecer una solución para padres, responsables de salud y centros de salud. Buscando reemplazar las libretas de vacunación en papel y digitalizar todo el proceso oficial.

Para el caso de los padres, se prioriza simplificar el almacenamiento de la libreta de vacunación, tanto suya como de sus hijos o menores a cargo. Brindando un almacenamiento en la nube, para solucionar la pérdida de libretas y una mayor facilidad de disponibilidad cuando sea necesaria. Cabe destacar que el sistema le dará la opción de recibir notificaciones con anticipación sobre las próximas vacunas a colocar por libreta, para que el usuario no se olvide y también información sobre el Centro de Salud cercano que cuenta con disponibilidad de dicha vacuna.

Para el caso de los Centros de Salud, les permitirá simplificar la gestión del registro de inventario y también el registro de Responsables de Salud que interactúen con el sistema, para la certificación de la colocación de vacunas a los usuarios.
 
 ## Pantallas de la app
 
 En esta sección del documento se procederá a explicar las funcionalidades más importantes que posee la plataforma, de forma gráfica mostrando las pantallas principales de la misma, haciendo un recorrido por cada una e indicando el objetivo de cada una de las pantallas.
 
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


 ### Pantallas de la aplicación del Responsable de Salud
 
 #### Home
Los responsables de salud necesitan ser dados de alta por el Centro del Salud en el cual trabajan, ellos le proveerán una cuenta de usuario y contraseña con la cual podrán ingresar a la aplicación.
Al ingresar a la aplicación llegamos a la pantalla principal , en la cual se muestran las diferentes acciones que puede realizar dicho responsable.

<img width="176" alt="Captura de Pantalla 2022-04-12 a la(s) 00 55 59" src="https://user-images.githubusercontent.com/17903237/162877335-d2b0749e-9239-49db-a183-5b4fe14d03fd.png">

 
  #### Colocación via QR de la vacuna
Al seleccionar en el home la opción “Colocar vacuna vía código QR” el responsable de salud accede a la siguiente pantalla en la cual se habilitará la camara de su dispositivo, para que escanee el código QR del paciente al cual le va a colocar la vacuna. Cuando se escanee el código QR se le abrirá una ventana de colocación de vacuna, donde se le detallarán los datos del paciente que se le coloca la vacuna, la información de la vacuna y un botón para colocar dicha vacuna. Al colocar la vacuna, automáticamente se descuenta del stock del Centro de Salud al cual pertenece dicho Responsable de Salud.

<img width="182" alt="Captura de Pantalla 2022-04-12 a la(s) 00 56 23" src="https://user-images.githubusercontent.com/17903237/162877377-23cf92a1-ff3f-4d79-9f5a-fb7702bfb25a.png">
 
#### Colocación manual de la vacuna con DNI

Uno de los aspectos que se tuvo en cuenta, es el caso en que el paciente que está registrado en nuestra aplicación, se coloque la vacuna pero no cuente en ese momento con la aplicación para que el Responsable de Salud pueda escanear el código QR.
Por lo cual se desarrollo la funcionalidad “Colocar vía DNI”, la cual se accede desde el Home del Responsable de Salud y se visualizará una pantalla donde deberá ingresar qué vacuna se colocó e introducir el DNI de del paciente para verificar que pertenezca en la aplicación su libreta.

<img width="175" alt="Captura de Pantalla 2022-04-12 a la(s) 00 56 56" src="https://user-images.githubusercontent.com/17903237/162877462-07bd460f-f07d-4d0c-a83a-7f5edba77bbe.png">
 
  
#### Registro tradicional de vacuna

Otro aspecto que tuvimos en cuenta a la hora de colocar es una vacuna, es el caso de los pacientes que no estén registrados en la aplicación y utilicen el carnet de vacunación tradicional en papel. Este aspecto es muy importante para mantener actualizado el stock a la hora de brindar información a los usuarios sobre cuáles son los centros de salud que tienen disponible dicha vacuna.
Dado la importancia de mantener informado a los usuarios sobre el stock real de vacunas con el que cuenta dicho Centro de Salud, se desarrolló la funcionalidad “Registro tradicional de vacuna”, la cual se accede desde el Home del Responsable de Salud y se abrirá una pantalla donde debe seleccionar la vacuna colocada y la cantidad de esa vacuna que se colocó a pacientes con carnet de vacunación en papel.

<img width="171" alt="Captura de Pantalla 2022-04-12 a la(s) 00 57 08" src="https://user-images.githubusercontent.com/17903237/162877513-2f1010bf-a783-475a-9233-0b3cd3cdf1d5.png">

 
 #### Migracion del carnet

Al seleccionar en el home la opción “Migración de carnet” el responsable de salud accede a la siguiente pantalla en la cual visualizará un buscador, donde debe ingresar el DNI del paciente, al cual se le quiere migrar a su cuenta en nuestra aplicación, todas las vacunas que fueron colocadas de manera tradicional en el carnet de vacunación en papel.
Al encontrar el DNI del paciente se visualizará la lista de vacunas con un checkbox a su izquierda, los cuales deben ser marcados en relación a las vacunas que tiene colocadas.

<img width="190" alt="Captura de Pantalla 2022-04-12 a la(s) 00 58 04" src="https://user-images.githubusercontent.com/17903237/162877548-7516a434-6406-4f07-8d96-848be65ca7dc.png">


 ### Pantallas de la aplicación del Centro de Salud

#### Home
El Centro de Salud al ingresar a la aplicación se encuentra con la pantalla principal , en la cual se muestra en formato de grilla 4 funcionalidades:
1. Resumen del inventario, donde se puede ingresar el número de stock deseado a verificar.
2. Acceso directo a Responsables de Salud
3. Acceso directo al Inventario
4. Visualiza un gráfico que indica la cantidad de vacunas que se colocaron por mes

<img width="511" alt="Captura de Pantalla 2022-04-12 a la(s) 00 48 19" src="https://user-images.githubusercontent.com/17903237/162877098-d27375db-65f4-4094-a2ce-99af079990cd.png">

 
 #### Inventario
Al seleccionar en el home la opción “Inventario” se accede a la siguiente pantalla en la cual visualizará una tabla con el nombre de la vacuna y la cantidad que hay en stock. También se brinda un buscador, en donde se puede buscar el detalle de una vacuna.
En la pantalla se encuentra abajo a la derecha un botón para agregar un nuevo cargamento de inventario.

<img width="547" alt="Captura de Pantalla 2022-04-12 a la(s) 00 49 01" src="https://user-images.githubusercontent.com/17903237/162877087-8b81b13f-0899-46c4-8912-114de5bfc490.png">

 
  #### Cargar inventario
Al seleccionar en la pantalla “Inventario” el botón de “+” para agregar un nuevo cargamento de inventario, se abrirá la siguiente pantalla.
La pantalla contendrá un listado de las vacunas que puede recibir el centro de Salud y a la derecha de cada vacuna se habilitará un campo para ingresar la cantidad recibida de dicha vacuna.

<img width="561" alt="responsables-cds" src="https://user-images.githubusercontent.com/17903237/162877063-ccbc3cda-bbae-420e-a6f1-b1d0aa952078.png">
 
   #### Responsables de Salud
Al seleccionar en la pantalla Home el botón de “Responsables de Salud”, se abrirá la siguiente pantalla, donde se visualizará un listado de los responsables de salud que tiene activos dicho Centro de Salud y abajo a la derecha de la pantalla un botón “+” donde se podrá dar de alta nuevo Responsable de Salud .

 <img width="561" alt="Captura de Pantalla 2022-04-12 a la(s) 00 49 26" src="https://user-images.githubusercontent.com/17903237/162877034-1e87c76a-c6c8-476b-a7df-840acee394a2.png">

 
 #### Dar de alta nuevo Responsables de Salud
Al seleccionar en la pantalla “Responsables de Salud” el botón de “+” para dar de alta un nuevo responsable de salud, se abrirá la siguiente pantalla.
La pantalla contendrá un formulario a completar con los siguiente campos: mail, contraseña, nombre, apellido, RUP, fecha de nacimiento y sexo.

 <img width="558" alt="alta-responsables-cds" src="https://user-images.githubusercontent.com/17903237/162877014-bb63ddd4-fded-4577-84e6-048c2e847333.png">

