"use client";
// import { Route, Switch } from 'react-router-dom';
// import './App.less';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import SiderBar from './pages/layout';
// import PrivateRoute from '../componets/PrivateRoute';

function App(): JSX.Element {
    // const router = useRouter();
    // let pathName = usePathname();
    // const searchParams = useSearchParams();
    // // Add your own authentication on the below line.
    // const isLoggedIn = localStorage.token ? true : false; //AuthService.isLoggedIn()
    
    // if(isLoggedIn){
    //     if(pathName === '/') pathName = '/video/videoList';
    //     const url = `${pathName}?${searchParams}`
    //     router.replace(url);
    // } else {
    //     router.replace('/login');
    // }
    return (
        <>
            {/* <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute path="/" component={SiderBar} />
            </Switch> */}
        </>
    );
}

export default App;
