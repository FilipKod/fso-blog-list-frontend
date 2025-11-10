import { useState, useImperativeHandle } from 'react'

const Togglable = ({
  children,
  buttonLabel,
  ref
}) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })

  const toggleVisible = () => setVisible(!visible)

  const visibleView = (
    <div>
      {children}
      <button type="button" onClick={toggleVisible}>cancel</button>
    </div>
  )

  const hiddenView = (
    <button type="button" onClick={toggleVisible}>{buttonLabel}</button>
  )

  return (
    <div>
      {visible ? visibleView : hiddenView}
    </div>
  )
}
export default Togglable