export function formDataToJSON(formData: FormData) {
    var object: any = {};
    formData.forEach((value, key) => object[key] = value);
    return object;
}