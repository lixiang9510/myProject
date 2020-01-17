// export const a = 2;

import React,{Component,Fragment} from 'react';
import TodoList from './page/todoList';
import {
  BrowserRouter as Router,//h5路由
  // HashRouter as Router,Hash路由
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'
class Home extends Component{
	render(){
		return <h1>this is Home page</h1>
	}
}
class About extends Component{
	render(){
		return <h1>this is About page</h1>
	}
}
class User extends Component{
	render(){
		return <Switch>
			<Route exact path="/user" render={()=>(<h1>this is User page no id</h1>)}></Route>
			<Route path="/user/profile" render={()=>(<h1>this is profile user</h1>)}></Route>
			<Route path="/user/:id" render={(router)=>(<h1>this is user page this id is {router.match.params.id}</h1>)}></Route>
		</Switch>

	}
}
class Login extends Component{  
	render(){
		return <h1>this is Login page</h1>     
	}
}   
class App extends Component{
	constructor(props){
		super(props);
		this.state={
			isLogin:false//可以判断是否为登录状态
		}
	}
	render(){
		const ProjectRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render={(props)=>(this.state.isLogin ? <Component {...props}/> : <Login />)}
			/>
		)
		return (
			<Router>
				<div className="App">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/user">User</Link>
						</li>
						<li>
							<Link to="/user/123">User/123</Link>
						</li>
						<li>
							<Link to="/user/profile">User/profile</Link>
						</li>
					</ul>
					<div>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<ProjectRoute path="/user" component={User} />
					</div>
				</div>
			</Router>
		)
	}
};
export default App