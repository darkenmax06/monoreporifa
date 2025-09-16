

export function clearPhone(inputNumeroTelefono) {
    const numeroLimpio = inputNumeroTelefono.replace(/[()\-\s]/g, '');
    return numeroLimpio;
}