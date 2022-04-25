import { NavLink } from "react-router-dom";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const Page404 = () => {
  return (
      <div>
        <ErrorMessage />
        <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
        <NavLink style={{'display':'block', 'textAlign':'center', 'fontWeight':'bold', 'fontSize':'24px', 'marginTop':'30px'}} to="/shop">
          Back to main page
        </NavLink>
      </div>
  )
}

export default Page404;