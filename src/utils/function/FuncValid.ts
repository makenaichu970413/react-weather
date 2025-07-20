//? Module
import { get as _get, set as _set } from "lodash-es";
import { object as yupObject } from "yup";

type PValidateAT<V, F> = {
  key: NestedKeys<V>;
  data: F;
  validation: V;
};

export async function ValidateAT<V, F>(props: PValidateAT<V, F>) {
  const { key, data, validation } = props;

  let result = null;

  if (!validation) return result;

  const temp = { ...data };
  try {
    await yupObject(validation).validateAt(key, temp, {
      abortEarly: false,
      recursive: true,
    });
  } catch (err: any) {
    const error = err.inner?.[0]?.message ?? null;
    console.log("ValidateAT: ", error);
    result = error;
  }

  return result;
}

type PValidateALL<V, F> = Omit<PValidateAT<V, F>, "key">;

export async function ValidateALL<V, F>(
  props: PValidateALL<V, F>
): Promise<V | null> {
  const { data, validation } = props;
  console.log("validateALL: ", props);

  if (!validation) return null;
  const temp = { ...data };
  try {
    await yupObject(validation).validate(temp, {
      abortEarly: false,
      recursive: true,
    });
  } catch (err: any) {
    const errors: any[] = err?.inner ?? [];

    const error: any = {};
    for (const e of errors) {
      const message = e?.message ?? null;
      const key = e?.path ?? null;
      if (key) _set(error, key, message);
    }
    console.log("validateALL ERROR: ", error);
    return error;
  }
  return null;
}
