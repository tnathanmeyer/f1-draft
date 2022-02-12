import { h } from 'preact';
import style from './style';

const Header = () => {
	return (
		<div className={style.header}>
			<img 
				src='https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg'
				alt='Formula 1 Logo'
			/>
		</div>
	)
}

export default Header;
