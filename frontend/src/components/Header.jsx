import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout,reset} from '../features/auth/authSlice'
import {logOutReset as resetInstructor} from '../features/instructor/instructorSlice'
import {reset as resetAdmin } from '../features/admin/adminSlice'
import {hardReset as resetIndividualTrainee} from '../features/individualTrainee/individualTraineeSlice'
import {hardReset as resetCorporateTrainee} from '../features/corporateTrainee/corporateTraineeSlice'
import "../CSS/login.css"

function Header() {

    const { user } = useSelector(
        (state) => state.auth
    )


    const navigate = useNavigate()
    const dispatch = useDispatch()
        
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(resetAdmin())
        dispatch(resetInstructor())
        dispatch(resetIndividualTrainee())
        dispatch(resetCorporateTrainee())
        navigate('/')
      }

    const toHome= () => {
        if(user.role === 'Instructor'){
            dispatch(resetInstructor())
            navigate('/instructor/home')
        }
        
        if(user.role === 'Individual Trainee'){
            dispatch(resetIndividualTrainee())
            navigate('/individualTrainee/home')
        }

        if(user.role === 'Corporate Trainee'){
            dispatch(resetCorporateTrainee())
            navigate('/corporateTrainee/home')
        }

        if(user.role === 'Corporate Trainee'){
            dispatch(resetCorporateTrainee())
            navigate('/corporateTrainee/home')
        }

        if(user.role === 'Admin'){
            dispatch(resetAdmin())
            navigate('/admin/home')
        }



    }

  return (
    <>
    <br/>
    <header class="box-form" style={{"width":"1700px","display":"flex"}}>

        <div  className="logo" style= {{"paddingLeft":"20px"}}>
            <Link to='/'><h1>Online Learning System </h1></Link>
        </div>

        {!user && (<ul style= {{"paddingRight":"20px"}}>
            <li>
                <Link  to='/login'>
                    <FaSignInAlt/> Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser/> Register
                </Link>
            </li>
        </ul>)}

        {user && (<ul style= {{"paddingRight":"20px"}}>
            <li>
            <button   onClick={onLogout} style={{ "backgroundColor": "transparent","border":"none","fontSize":"16px","fontStyle":"bold"}}>
              <FaSignOutAlt /> Logout
            </button>
            </li>
            <li>
            <button  onClick={toHome} style={{ "backgroundColor": "transparent","border":"none","fontSize":"16px","fontStyle":"bold"}}>
              <FaUser /> To Home
            </button>
            </li>
        </ul>)}
    </header>
    <br/>
    </>
  )
}

export default Header