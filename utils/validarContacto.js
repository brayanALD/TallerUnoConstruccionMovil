// Acepta dígitos con separadores comunes (espacio, guion, paréntesis)
// y un + opcional al inicio para código de país.
const TELEFONO_REGEX = /^\+?[\d\s()-]{7,20}$/;

// Valida los campos de un contacto y devuelve el primer mensaje de error,
// o null si todo es válido. Se usa en AddScreen y EditScreen para no
// duplicar las mismas reglas en dos formularios distintos.
export function validarContacto({ nombre, telefono, ciudad }) {
    const nombreLimpio = nombre.trim();
    const telefonoLimpio = telefono.trim();
    const ciudadLimpia = ciudad.trim();

    if (!nombreLimpio || !telefonoLimpio) {
        return 'Por favor diligencie el nombre y el teléfono antes de guardar.';
    }

    if (nombreLimpio.length < 3) {
        return 'El nombre debe tener al menos 3 caracteres.';
    }

    const digitos = telefonoLimpio.replace(/\D/g, '');
    if (!TELEFONO_REGEX.test(telefonoLimpio) || digitos.length < 7 || digitos.length > 15) {
        return 'Ingrese un teléfono válido (solo dígitos, entre 7 y 15 números).';
    }

    // La ciudad es opcional, pero si se diligencia debe tener un mínimo de caracteres.
    if (ciudadLimpia && ciudadLimpia.length < 2) {
        return 'La ciudad debe tener al menos 2 caracteres.';
    }

    return null;
}
