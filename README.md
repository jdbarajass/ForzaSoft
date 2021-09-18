# ForzaSoft
Este es un proyetocto en el cual se propone analizar, diseñar y construir una aplicación software que permita controlar las ventas físicas y virtuales de una empresa de manufactura y hacerles el correspondiente seguimiento.

## Release

Cuando el código fuente en la rama de desarrollo (develop) alcanza un punto estable y está listo para ser liberado, todos los cambios deben ser fusionados de nuevo en el master de alguna manera y luego etiquetados con un número de versión.

Las ramas de lanzamiento (Release) apoyan la preparación de una nueva versión de producción. Permiten poner los puntos sobre las íes a última hora. Además, permiten corregir errores menores y preparar los metadatos de una versión (número de versión, fechas de compilación, etc.). Al hacer todo este trabajo en una rama de lanzamiento, la rama de desarrollo queda libre para recibir las características de la siguiente gran versión.

El momento clave para bifurcar una nueva rama de lanzamiento desde develop es cuando develop (casi) refleja el estado deseado de la nueva versión. Al menos todas las características que están destinadas a la versión que se va a construir deben ser fusionadas en develop en este momento. Todas las características dirigidas a futuras versiones no pueden, deben esperar hasta después de que la rama de lanzamiento se ramifique.

[más información sobre el git-flow](https://nvie.com/posts/a-successful-git-branching-model/)
