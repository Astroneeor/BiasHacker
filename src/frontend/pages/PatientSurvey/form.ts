
export interface Form {
    name?: string
    age?: number
    gender?: string
    ethnicity?: string
    symptom_category?: string
}

export const FormRules = {
    "name": {
        required: true,
        maxLength: 100
    },
    "age": {
        required: true,
        max: 120,
        min: 0,
        maxLength: 100
    },
    "gender": {
        required: true
    },
    "ethnicity": {
        required: true
    },
    "symptom_category": {
        required: true
    }
};