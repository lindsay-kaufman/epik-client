import './App.scss'
import { NavBar } from './components/nav-bar/nav-bar'
import { Goals } from './components/goals/goals'
import { List } from './components/to-do-list/list'
import { Mood } from './components/mood/mood'
import { Meals } from './components/meals/meals'
import { Activites } from './components/activities/activities'

function App() {

// cannot get user info until i fix sign in functionality 
// pass user down as prop to components to get id

// const [user, setUser] = useState({})

//   useEffect(() => {
//     axios({
//       url: 'http://localhost:3000/users/1',
//       method: 'GET',
//       headers: { 'Content-Type': undefined },
//     })
//       .then(res => {
//         setUser(res.data)
//       })
//       .then(() => {
//         console.log(user)
//       })
//       .catch(console.error)
//   }, [])

  return (
    <div className="planner">
      <NavBar />
      <List />
      <Goals />
      <Activites />
      <Mood />
      <Meals />
    </div>
  )
}

export default App
