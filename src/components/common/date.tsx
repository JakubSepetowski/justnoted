const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
let currDay: string;
switch (true) {
	case month < 10 && day >= 10:
		currDay = `${year}-0${month}-${day}`;
		break;
	case month >= 10 && day < 10:
		currDay = `${year}-${month}-0${day}`;
		break;
	case month < 10 && day < 10:
		currDay = `${year}-0${month}-0${day}`;
		break;
	default:
		currDay = `${year}-${month}-${day}`;
}
export const currentDate = currDay;
