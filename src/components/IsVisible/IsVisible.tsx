import {
	forwardRef,
	ReactNode,
	Children,
	useEffect,
	useState,
	isValidElement,
	cloneElement
} from 'react'
import useIntersect from '../../useIntersect'

const IsVisible = forwardRef((props: {
	children?: ReactNode,
	classNames?: {
		visible?: string,
		invisible?: string
	},
	evts?: {
		visible?: () => void
		invisible?: () => void
	},
	minShown?: number
	sticky?: boolean,
	stickyEvt?: boolean,
	stickyClass?: boolean
}, ref) => {
	const minShown = props.minShown ?? 0;
	const child = Children.only(props.children);
	const [visible, setVisible] = useState(false);
	const [cN, setCN] = useState((isValidElement(child) ? child?.props?.className : '') ?? '')
	const [setNode, entry] = useIntersect({
		threshold: [1]
	});
	useEffect(() => {
		let newVis = !!(entry && (entry.intersectionRatio > minShown/100));
		if (!entry) {
			// need data to operate on
			return;
		}
		if (props.sticky && visible) {
			// if sticky, don't run things twice
			// is sticky and has run, so
			return;
		}

		if (visible === newVis) {
			// no need to trigger a new render
			return;
		}

		setVisible(newVis)
		if (!(props.stickyEvt && visible)) {
			// Has not run events prior, if needed
			props.evts?.[newVis ? 'visible' : 'invisible']?.()
		}

		if (!child || !isValidElement(child)) {
			// then there's no child to work on, so this is pointless
			return;
		}

		if (props.stickyClass && visible) {
			// Has changed class prior, if needed
			return;
		}
		
		let classNames = (
			child.props.className ? child.props.className + ' ' : ''
		) 

		if (props.classNames) {
			classNames += (
				props.classNames[newVis ? 'visible' : 'invisible'] 
					?? (
						newVis ? 'visible' : 'invisible'
					)
			)
			// set appropriate class names with appropriate defaults
		}
		setCN(classNames);
	}, [entry, props.sticky, visible, props.evts, minShown, props.stickyEvt, props.stickyClass, props.classNames, child])
	if (!child || !isValidElement(child)) {
		return null;
	}
	return cloneElement(
		child,
		{
			ref: (r: Element) => {
				setNode(r)
				if (ref) {
					if (typeof ref === 'function') {
						ref(r);
					} else {
						ref.current = r;
					}
				}
			},
			className: cN
		}
	)
})
export default IsVisible;