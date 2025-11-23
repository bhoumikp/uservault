import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthForm({ isLogin }) {
	return (
		<div className='below-navbar'>
			{(isLogin) ? <LoginForm /> : <SignUpForm />}
		</div>
	) ;
}