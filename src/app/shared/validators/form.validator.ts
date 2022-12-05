import { FormArray, FormControl } from '@angular/forms';

/* validatte form fields */
export const validateField = (form: any) => {
	Object.keys(form.controls).forEach((field) => {
		const controls = form.get(field);
		if (controls instanceof FormArray) {
			validateFormArray(controls);
		}
		controls.markAsTouched({ onlySelf: true });
	});
};

const validateFormArray = (formArray: FormArray) => {
	formArray.controls.forEach((form:any) => {
		Object.keys(form.controls).forEach((field) => {
			const controls: FormControl = form.get(field);
			controls.markAsDirty({ onlySelf: true });
		});
	});
};
