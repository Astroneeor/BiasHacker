
export interface Form {
    Name?: string
    Age?: number
    Gender?: string
    Race?: string
    Problems?: string
}

export const FormRules = {
    "Name": {
        required: true,
        maxLength: 100
    },
    "Age": {
        required: true,
        max: 120,
        min: 0,
        maxLength: 100
    },
    "Gender": {
        required: true
    },
    "Race": {
        required: true
    },
    "Problems": {
        required: true
    }
};