import React, {useState} 			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
const App = () => {
	let user = null;

	const [routePath, setRoutePath] = useState("/welcome");
	
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }

	const handleRoute = (r) =>{
		//setRoutePath(r);
	}

	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: routePath} } />
				<Route 
					path={routePath}
					name="home" 
					render={() => 
						<Homescreen fetchUser={refetch} user={user} route = {handleRoute}/>
					} 
				/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;