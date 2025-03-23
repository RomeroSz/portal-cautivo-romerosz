import { z } from 'zod';
const constraints = {
    cedula: {
        required_error: 'La cédula es obligatoria',
        min_length_error: { message: 'La cédula debe tener al menos 6 caracteres', code: 'too_small' },
        max_length_error: { message: 'La cédula no puede tener más de 10 caracteres', code: 'too_big' },
        regex_error: { message: 'Formato de cédula inválido', code: 'invalid_format' },
    },
    nombre: {
        required_error: 'El nombre es obligatorio',
        min_length_error: { message: 'El nombre debe tener al menos 2 caracteres', code: 'too_small' },
        max_length_error: { message: 'El nombre no puede tener más de 50 caracteres', code: 'too_big' },
        regex_error: { message: 'Formato de nombre inválido', code: 'invalid_format' },
    },
    telefono: {
        required_error: 'El teléfono es obligatorio',
        min_length_error: { message: 'El teléfono debe tener al menos 9 caracteres', code: 'too_small' },
        max_length_error: { message: 'El teléfono no puede tener más de 13 caracteres', code: 'too_big' },
        regex_error: { message: 'Formato de teléfono inválido', code: 'invalid_format' },
    },
    ipAddress: {
        required_error: 'La dirección IP es obligatoria',
        regex_error: { message: 'Formato de dirección IP inválido', code: 'invalid_format' },
    },
};

const cedulaRegex = new RegExp(/^\d{6,10}$/);
const nombreRegex = new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/);
const telefonoRegex = new RegExp(
    /^(\+?\d{1,3})?[\s-]?(\d{3})[\s-]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})$/
);
const ipAddressRegex = new RegExp(
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
);

export const LoginSchema = z.object({
    cedula: z
        .string()
        .min(6, constraints.cedula.min_length_error)
        .max(10, constraints.cedula.max_length_error)
        .regex(cedulaRegex, constraints.cedula.regex_error)
        .nonempty(constraints.cedula.required_error),
    nombre: z
        .string()
        .min(2, constraints.nombre.min_length_error)
        .max(50, constraints.nombre.max_length_error)
        .regex(nombreRegex, constraints.nombre.regex_error)
        .nonempty(constraints.nombre.required_error),
    telefono: z
        .string()
        .min(9, constraints.telefono.min_length_error)
        .max(13, constraints.telefono.max_length_error)
        .regex(telefonoRegex, constraints.telefono.regex_error)
        .nonempty(constraints.telefono.required_error),
    ipAddress: z
        .string()
        .regex(ipAddressRegex, constraints.ipAddress.regex_error)
        .nonempty(constraints.ipAddress.required_error),
});


const constraintsAdClick = {
  userId: {
    required_error: 'El ID del usuario es obligatorio',
    invalid_type_error: 'El ID del usuario debe ser un número',
  },
  adId: {
    required_error: 'El ID del anuncio es obligatorio',
    invalid_type_error: 'El ID del anuncio debe ser un número',
  },
  ipAddress: {
    required_error: 'La dirección IP es obligatoria',
    regex_error: { message: 'Formato de dirección IP inválido', code: 'invalid_format' },
  },
};

export const AdClickSchema = z.object({
  userId: z
    .number()
    .int('El ID del usuario debe ser un número entero')
    .positive('El ID del usuario debe ser un número positivo')
    .nonnegative('El ID del usuario no puede ser negativo'),
  adId: z
    .number()
    .int('El ID del anuncio debe ser un número entero')
    .positive('El ID del anuncio debe ser un número positivo')
    .nonnegative('El ID del anuncio no puede ser negativo'),
  ipAddress: z
    .string()
    .regex(ipAddressRegex, constraintsAdClick.ipAddress.regex_error)
    .nonempty(constraintsAdClick.ipAddress.required_error),
});