"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea, Select, SelectItem } from '@nextui-org/react';
import { Specie } from "@/interfaces/FormReport/specie"
import { Sex } from "@/interfaces/FormReport/sex"
import { Provincia } from "@/interfaces/FormReport/province"

const formReportSchema = z.object({
    title: z.string().min(1, { message: "El título es obligatorio" }),
    description: z.string().min(1, { message: "La descripción es obligatoria" }),
    species: z.enum(['dog', 'cat'], {
        errorMap: () => ({ message: "La especie es obligatoria" })
    }),
    sex: z.enum(['macho', 'hembra'], {
        errorMap: () => ({ message: "El sexo es obligatorio" })
    }),
    province: z.enum([
        'buenos_aires', 'catamarca', 'chaco', 'chubut', 'cordoba', 'corrientes',
        'entre_rios', 'formosa', 'jujuy', 'la_pampa', 'la_rioja', 'mendoza',
        'misiones', 'neuquen', 'rio_negro', 'salta', 'san_juan', 'san_luis',
        'santa_cruz', 'santa_fe', 'santiago_del_estero', 'tierra_del_fuego', 'tucuman'
    ], {
        errorMap: () => ({ message: "La provincia es obligatoria" })
    }),
    locality: z.string().min(1, { message: "La localidad es obligatoria" }),
    street: z.string().min(1, { message: "La calle es obligatoria" }),
    number: z.number({ invalid_type_error: "Debe ingresar un número" })
        .min(1, { message: "La altura es obligatoria" }),
    postalCode: z.number({ invalid_type_error: "Debe ingresar un número" })
        .min(1, { message: "El código postal es obligatorio" }),
});

const species: Specie[] = [
    { key: 'dog', label: 'Perro' },
    { key: 'cat', label: 'Gato' },
];

const sexs: Sex[] = [
    { key: 'macho', label: 'Macho' },
    { key: 'hembra', label: 'Hembra' },
];

const provincias: Provincia[] = [
    { key: 'buenos_aires', label: 'Buenos Aires' },
    { key: 'catamarca', label: 'Catamarca' },
    { key: 'chaco', label: 'Chaco' },
    { key: 'chubut', label: 'Chubut' },
    { key: 'cordoba', label: 'Córdoba' },
    { key: 'corrientes', label: 'Corrientes' },
    { key: 'entre_rios', label: 'Entre Ríos' },
    { key: 'formosa', label: 'Formosa' },
    { key: 'jujuy', label: 'Jujuy' },
    { key: 'la_pampa', label: 'La Pampa' },
    { key: 'la_rioja', label: 'La Rioja' },
    { key: 'mendoza', label: 'Mendoza' },
    { key: 'misiones', label: 'Misiones' },
    { key: 'neuquen', label: 'Neuquén' },
    { key: 'rio_negro', label: 'Río Negro' },
    { key: 'salta', label: 'Salta' },
    { key: 'san_juan', label: 'San Juan' },
    { key: 'san_luis', label: 'San Luis' },
    { key: 'santa_cruz', label: 'Santa Cruz' },
    { key: 'santa_fe', label: 'Santa Fe' },
    { key: 'santiago_del_estero', label: 'Santiago del Estero' },
    { key: 'tierra_del_fuego', label: 'Tierra del Fuego' },
    { key: 'tucuman', label: 'Tucumán' },
]


type FormData = z.infer<typeof formReportSchema>;

interface FormReportProps {
    onSubmit: (data: FormData) => void;
}

const FormReport: React.FC<FormReportProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formReportSchema),
    });

    return (
        <form className="space-y-4 py-8" onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('title')}
                label="Título"
                variant='flat'
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
            />
            <Textarea
                {...register('description')}
                label="Descripción"
                variant='flat'
                rows={2}
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
            />
            <Select
                {...register('species')}
                label="Selecciona especie"
                isInvalid={!!errors.species}
                errorMessage={errors.species?.message}
            >
                {species.map((specie) => (
                    <SelectItem key={specie.key} value={specie.key}>
                        {specie.label}
                    </SelectItem>
                ))}
            </Select>
            <Select
                {...register('sex')}
                label="Selecciona el sexo"
                isInvalid={!!errors.sex}
                errorMessage={errors.sex?.message}
            >
                {sexs.map((sex) => (
                    <SelectItem key={sex.key} value={sex.key}>
                        {sex.label}
                    </SelectItem>
                ))}
            </Select>
            <Select
                {...register('province')}
                label="Selecciona provincia"
                isInvalid={!!errors.province}
                errorMessage={errors.province?.message}
            >
                {provincias.map((provincia) => (
                    <SelectItem key={provincia.key} value={provincia.key}>
                        {provincia.label}
                    </SelectItem>
                ))}
            </Select>
            <Input
                {...register('locality')}
                label="Localidad"
                variant='flat'
                isInvalid={!!errors.locality}
                errorMessage={errors.locality?.message}
            />
            <div className="w-full flex space-x-4">
                <Input
                    {...register('street')}
                    label="Calle"
                    variant='flat'
                    isInvalid={!!errors.street}
                    errorMessage={errors.street?.message}
                    className='w-4/6'
                />
                <Input
                    {...register('number', { valueAsNumber: true })}
                    label="Altura"
                    variant='flat'
                    isInvalid={!!errors.number}
                    errorMessage={errors.number?.message}
                    className='w-2/6 '
                />
            </div>
            <Input
                {...register('postalCode', { valueAsNumber: true })}
                label="Código Postal"
                variant='flat'
                isInvalid={!!errors.postalCode}
                errorMessage={errors.postalCode?.message}
            />
            <button
                type="submit"
                className="w-3/6 lg:w-2/6 p-2 bg-primary text-white rounded-3xl hover:bg-accent hover:duration-300"
            >
                Enviar
            </button>
        </form>

    );

    // falta definir/manejar el botón de envío, por eso el error en ReportFormPage

};

export default FormReport;
