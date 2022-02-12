import { h } from 'preact';
import Header from './header';
import style from './style';

const App = () => {
	return (
		<div className={style.app}>
			<Header />
			
			<h1>Godspeed Spider-Man</h1>
		</div>
	);
}

export default App;
