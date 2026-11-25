# language: es
# Supuesto: "Products" es la página a la que se accede tras un inicio de sesión exitoso.
# Supuesto: un usuario compuesto solo por espacios no se procesa como inicio de sesión válido; no se asume un mensaje específico para ese caso.
# Respondida al probar la app real: con la contraseña vacía se muestra "Epic sadface: Password is required".
# Pregunta abierta: ¿cuál es la longitud máxima del campo usuario?
# Pregunta abierta: ¿cuál es la longitud máxima del campo contraseña?
# Pregunta abierta: ¿qué mensaje muestra el sistema si el usuario contiene caracteres especiales?

@regresion
Característica: Inicio de sesión en Swag Labs

  Antecedentes:
    Dado que el cliente está en la página de inicio de sesión

  @smoke
  Escenario: Inicio de sesión exitoso con credenciales válidas
    Cuando inicia sesión con usuario "standard_user" y contraseña "secret_sauce"
    Entonces ve la página "Products"
    Y ve el catálogo de productos

  @negativo
  Escenario: Inicio de sesión con un usuario bloqueado
    Cuando inicia sesión con usuario "locked_out_user" y contraseña "secret_sauce"
    Entonces ve el mensaje "Epic sadface: Sorry, this user has been locked out."
    Y no ingresa a la tienda

  @negativo
  Esquema del escenario: Inicio de sesión con contraseña incorrecta
    Cuando inicia sesión con usuario "standard_user" y contraseña "<contraseña>"
    Entonces ve el mensaje "Epic sadface: Username and password do not match any user in this service"
    Y no ingresa a la tienda

    @negativo
    Ejemplos:
      | contraseña         |
      | clave_incorrecta   |
      | Secret_Sauce       |
      | !@#$%^&*()         |

  @negativo
  Escenario: Inicio de sesión con el usuario vacío
    Cuando inicia sesión con usuario vacío y contraseña "secret_sauce"
    Entonces ve el mensaje "Epic sadface: Username is required"
    Y no ingresa a la tienda

  @negativo
  Escenario: Inicio de sesión con la contraseña vacía
    Cuando inicia sesión con usuario "standard_user" y contraseña vacía
    Entonces ve el mensaje "Epic sadface: Password is required"
    Y no ingresa a la tienda

  @negativo
  Escenario: Inicio de sesión con un usuario compuesto solo por espacios
    Cuando inicia sesión con usuario "   " y contraseña "secret_sauce"
    Entonces no ingresa a la tienda

# Cobertura: Con el usuario "standard_user" y la contraseña "secret_sauce", ingresa y ve la página "Products" -> Inicio de sesión exitoso con credenciales válidas
# Cobertura: Con un usuario bloqueado, ve el mensaje "Epic sadface: Sorry, this user has been locked out." y no ingresa -> Inicio de sesión con un usuario bloqueado
# Cobertura: Con una contraseña incorrecta, ve el mensaje "Epic sadface: Username and password do not match any user in this service" y no ingresa -> Inicio de sesión con contraseña incorrecta
# Cobertura: Si deja el usuario vacío, ve el mensaje "Epic sadface: Username is required" -> Inicio de sesión con el usuario vacío
# Cobertura: Campos de texto (vacío, solo espacios, caracteres especiales) -> Inicio de sesión con el usuario vacío; Inicio de sesión con un usuario compuesto solo por espacios; Inicio de sesión con contraseña incorrecta
