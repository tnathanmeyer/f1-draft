import { h } from 'preact';
import Header from './header';
import Standings from './standings';
import style from './style';

const App = () => {	
	return (
		<div className={style.app}>
			<Header />
			<main>
				<Standings />
			</main>
		</div>
	);
}

export default App;
