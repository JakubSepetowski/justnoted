import { Variants } from 'framer-motion';

export const opacityAnim: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeOut',
			when: 'beforeChildren',
			staggerChildren: 0.3,
		},
	},
	exit: {
		opacity: 0,

		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
};
export const noteAnim: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,

		transition: {
			duration: 0.3,
			ease: 'easeIn',
		},
	},
	exit: {
		opacity: 0,

		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
};
export const fromBottomAnim: Variants = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
};
export const fromLeftAnim: Variants = {
	hidden: {
		opacity: 0,
		x: -100,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
};
export const fromRigthAnim: Variants = {
	hidden: {
		opacity: 0,
		x: 100,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
};
export const PageAnim: Variants = {
	hidden: {},
	visible: {
		transition: {
			duration: 0.4,
			ease: 'easeOut',
			when: 'beforeChildren',
			staggerChildren: 0.3,
		},
	},
};

export const titleAnim: Variants = {
	hidden: {
		opacity: 0,
		x: -50,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
		},
	},
};
export const opacityContAnim: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
			when: 'beforeChildren',
			staggerChildren: 0.5,
		},
	},
};
export const calendarInputAnim: Variants = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
	exit: {
		opacity: 0,
		y: 50,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
};
