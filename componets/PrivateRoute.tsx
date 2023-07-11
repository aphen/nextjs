import { usePathname, useRouter, useSearchParams } from 'next/navigation';
const PrivateRoute = ({ component: Component, ...rest }: any) => {
    console.log({ ...rest });
    const router = useRouter();
    let pathName = usePathname();
    const searchParams = useSearchParams();
    // Add your own authentication on the below line.
    const isLoggedIn = false; //localStorage.token ? true : false; //AuthService.isLoggedIn()
    
    if(isLoggedIn){
        if(pathName === '/') pathName = '/video/videoList';
        const url = `${pathName}?${searchParams}`
        router.replace(url);
    } else {
        router.replace('/login');
    }
    return <></>;
    // return (
    //     <></>
    //     // <Route
    //     //     {...rest}
    //     //     render={(props) =>
    //     //         isLoggedIn ? (
    //     //             <Component {...props} />
    //     //         ) : (
    //     //             <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    //     //         )
    //     //     }
    //     // />
    // );
};

export default PrivateRoute;
