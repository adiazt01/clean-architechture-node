Se desea realizar sistema web para una cadena de farmacias distribuidas en diferentes
ciudades. Además, se debe permitir que cualquier persona pueda realizar una búsqueda
de medicamentos desde la página de la farmacia.
El sistema debe permitir el manejo administrativo de la farmacia en cuanto a ingreso
de personal, carga de medicamentos, laboratorios proveedores, sucursales de la
farmacia, y compras
Cada farmacia tiene sus empleados propios, y cada empleado tiene su cargo:
administrativo, farmacéutico, auxiliares de farmacia, pasantes, entre otros. En una
farmacia pueden laborar varios farmacéuticos. Además se puede rotar el personal entre
las sucursales.
EL sistema debe mostrar la ficha de cada trabajador, los cargos ostentados, así como
la posible rotación que ha tenido a lo largo de su trayectoria dentro de la farmacia.
Además, se debe incluir un reporte de empleados de acuerdo a una sucursal

Cada sucursal tiene a su vez un stock de medicamentos. Los medicamentos se organizan
según la o las monodrogas que lo componen, su presentación (por ejemplo, ampollas de 5
unidades, jarabe de 100 ml, pomada 60 grs, etc), el laboratorio que lo comercializa, su
acción terapéutica (analgésico, antibiótico, etc.).
Por cada medicamento se mantiene su precio, nombre del principal componente que
contiene, y la existencia del mismo en cada farmacia. Por ejemplo, la farmacia X puede
tener 10 unidades del medicamento “Bisolvon en ampollas” y la farmacia Z puede tener
25 unidades del mismo medicamento. Hay que tomar en cuenta que un mismo
medicamento puede ser fabricado por diferentes laboratorios, especialmente este caso

Universidad Nacional Experimental de Guayana
Carrera Ingeniería en Informática
Sistemas de Base de Datos I
Prof. María Raquel Herrera E.

se presenta en los medicamentos genéricos. Por ejemplo, el medicamento “Ranitidina de
300 mgs” es fabricado por los laboratorios ELMOR y GENVEN.
El sistema debe ser capaz de emitir un reporte del stock de medicamentos por sucursal,
así como un reporte que indique la existencia de un medicamento en particular en todas
las sucursales.

Se necesita llevar la información referente a los laboratorios que fabrican los
medicamentos, (dirección, teléfono entre otros), esto con la finalidad de hacer los
pedidos correspondientes.
Los pedidos también se le conocen como orden de compra. Debe quedar reflejado el
analista de compra que emitió el pedido. Una vez llegado el pedido se procede a emitir
la compra, y la conforma solamente los productos que llegaron, esta compra siempre
debe contener el número de pedido. En la orden de compra y la compra se deben incluir
la forma de pago (contado, 5 d, 15d, 30d). Se debe tener un control de las cuentas por
pagar de cada farmacia. Se desea guardar en pdf cada pedido y cada compra.

Se debe entregar un informe que contenga:
a.- Planteamiento del problema (se debe especificar aquellos aspectos que
incluyeron en el sistema que no están presentes en este planteamiento, y que son
un agregado del grupo para el proyecto).
b.- Carta estructurada del sistema
c.- Indicar las herramientas de desarrollo usadas (DBMS, lenguaje, frameworks
etc)
d.- Modelo E-R y el diagrama de clases
e.- Modelo Relacional en el DBMS de su preferencia
f.- Diccionario de datos (por cada tabla se debe mostrar nombre, la descripción,
clave primaria, foráneas, descripción de cada campo y su tipo de datos)
g.- Pantallas de los formularios y descripción de cada uno de ellos

h.- Pantallas de la salida de las consultas asi como su script
Observaciones:
- Asignación a ser elaborado en equipos de seis personas máximo
- Se penalizará anulando aquellas asignaciones que sean copias de otras.
- Se tomará en cuenta la presentación y diseño de la interfaz
- Usar el DBMS de su preferencia, asi como las herramientas de desarrollo
- Fecha MAXIMA de entrega: 26 de febrero de 2025