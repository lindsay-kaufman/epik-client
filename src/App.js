import './App.scss'
import { NavBar } from './components/nav-bar/nav-bar'
import { Goals } from './components/goals/goals'
import { List } from './components/to-do-list/list'
function App() {


  return (
    <div className="planner">
      <NavBar />
      <List />
      <Goals />
    </div>
  )
}

export default App
