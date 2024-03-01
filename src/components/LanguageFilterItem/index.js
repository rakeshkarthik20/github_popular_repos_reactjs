// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {data, changeRepos, selectId} = props
  const {language, id} = data

  const changingTheRepos = () => {
    changeRepos(id)
  }
  let changeBgColor = ''
  if (selectId === id) {
    changeBgColor = 'changeBgColorClass'
  }

  return (
    <button
      type="button"
      className={`languageBtn ${changeBgColor}`}
      onClick={changingTheRepos}
    >
      {language}
    </button>
  )
}
export default LanguageFilterItem
