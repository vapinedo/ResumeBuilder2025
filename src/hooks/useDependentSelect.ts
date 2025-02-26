import { useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

/**
 * Hook para manejar Selects dependientes en formularios de React Hook Form.
 *
 * @param watch - La función watch de React Hook Form para observar cambios en el campo padre.
 * @param setValue - La función setValue de React Hook Form para actualizar valores en el formulario.
 * @param parentField - Nombre del campo padre en el formulario (ejemplo: "paisCorrespondencia").
 * @param childField - Nombre del campo hijo que depende del campo padre (ejemplo: "departamentoCorrespondencia").
 * @param resetValue - Valor con el que se reseteará el campo hijo cuando cambie el padre (por defecto: "").
 */
export const useDependentSelect = (
  watch: UseFormWatch<any>,
  setValue: UseFormSetValue<any>,
  parentField: string,
  childField: string,
  resetValue: string = ""
) => {
  const parentValue = watch(parentField);

  useEffect(() => {
    setValue(childField, resetValue);
  }, [parentValue, setValue, childField, resetValue]);
};
