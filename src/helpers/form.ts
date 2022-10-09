export function formDataToJSON<T>(formData: FormData): {[k in keyof T]: any} {
    var object: any = {};
    formData.forEach((value, key) => object[key] = value);
    return object;
}