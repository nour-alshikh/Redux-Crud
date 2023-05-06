import { useSelector } from "react-redux"
const WithGuard = (Component) => {
    const Wrapper = (props) => {
        const { isLoggedIn } = useSelector((state) => state.user)
        return isLoggedIn ? <Component {...props} /> : <div>Please Log In first</div>
    }
    return Wrapper
}

export default WithGuard;