import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Quote from 'components/Typography/Quote.js';
import Muted from 'components/Typography/Muted.js';
import Primary from 'components/Typography/Primary.js';
import Info from 'components/Typography/Info.js';
import Success from 'components/Typography/Success.js';
import Warning from 'components/Typography/Warning.js';
import Danger from 'components/Typography/Danger.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

const styles = {
	typo: {
		paddingLeft: '25%',
		marginBottom: '40px',
		position: 'relative',
	},
	note: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		bottom: '10px',
		color: '#c0c1c2',
		display: 'block',
		fontWeight: '400',
		fontSize: '13px',
		lineHeight: '13px',
		left: '0',
		marginLeft: '20px',
		position: 'absolute',
		width: '260px',
	},
	cardCategoryWhite: {
		color: 'rgba(255,255,255,.62)',
		margin: '0',
		fontSize: '14px',
		marginTop: '0',
		marginBottom: '0',
	},
	cardTitleWhite: {
		color: '#FFFFFF',
		marginTop: '0px',
		minHeight: 'auto',
		fontWeight: '300',
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: '3px',
		textDecoration: 'none',
	},
};

const useStyles = makeStyles(styles);

export default function TypographyPage() {
	const classes = useStyles();
	return (
		<Card Card style={{ marginTop: 80 }}>
			<CardHeader color="primary">
				<h4 className={classes.cardTitleWhite}>개인정보처리방침</h4>
			</CardHeader>
			<CardBody>
				<div className={classes.typo}>
					<div className={classes.note}>개인정보 처리 방침</div>
					<p>
						&lt;꿈틀이&gt;('https://kkumtree.netlify.app/'이하 'kkumtree')은(는) 개인정보보호법에
						따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을
						원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
						<br />
						&lt;꿈틀이&gt;('kkumtree)&nbsp;은(는) 회사는 개인정보처리방침을 개정하는 경우
						웹사이트공지사항(또는 개별공지)을 통하여 공지할 것입니다. <br />
						○ 본 방침은&nbsp;2020년&nbsp;5월&nbsp;7일부터 시행됩니다.
						<br />
						1. &lt;꿈틀이&gt;('kkumtree')은(는) 현재 어떤한 개인정보도 취급히지 않습니다. <br />
					</p>
				</div>
			</CardBody>
		</Card>
	);
}
