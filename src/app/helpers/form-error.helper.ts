export const employeeFieldForm = {
	name: [{ type: 'required', message: 'Enter name' }],
	email: [
		{ type: 'required', message: 'Enter email address' },
		{ type: 'pattern', message: 'Please enter a valid email address' },
	],
	mobileNumber: [
		{ type: 'required', message: 'Enter mobile number' },
		{ type: 'pattern', message: 'Please enter a valid phone number' },
	],
	company: [{ type: 'required', message: 'Enter company name' }],
}
export const productFieldForm = {
	name: [{ type: 'required', message: 'Enter name' }],
	description: [{ type: 'required', message: 'Enter description' }],
}