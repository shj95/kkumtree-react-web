/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import AdminNavbarLinks from './AdminNavbarLinks.js';
import RTLNavbarLinks from './RTLNavbarLinks.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js';

const useStyles = makeStyles(styles);

export default function Header(props) {
	const classes = useStyles();
	function makeBrand() {
		if (window.location.href.includes('/maps')) return '꿈트리 맵';
		else return '가게 상세';
	}
	const { color } = props;
	const appBarClasses = classNames({
		[' ' + classes[color]]: color,
	});
	return (
		<AppBar className={classes.appBar + appBarClasses}>
			<Toolbar className={classes.container} variant="dense" dense disableGutters>
				<div className={classes.flex} style={{ display: 'flex', alignItems: 'center' }}>
					{/* Here we create navbar brand, based on route name */}
					{window.location.href.includes('/maps') ? null : (
						<ArrowBack
							onClick={() => {
								props.history.goBack();
							}}
						></ArrowBack>
					)}
					<Button color="transparent" href="#" className={classes.title}>
						{makeBrand()}
					</Button>
				</div>
			</Toolbar>
		</AppBar>
	);
}

Header.propTypes = {
	color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
	rtlActive: PropTypes.bool,
	handleDrawerToggle: PropTypes.func,
	routes: PropTypes.arrayOf(PropTypes.object),
};
