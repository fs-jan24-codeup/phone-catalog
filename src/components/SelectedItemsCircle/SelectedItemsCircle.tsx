import { useAppContext } from "../../hooks/useAppContext"
import './SelectedItemsCircle.scss';

export const SelectedItemsCircle = () => {
  const { cart } = useAppContext();

  return (
    <>
      {!!cart.length && (
        <div className="circle">
          <div className="circle--text">{cart.length}</div>
        </div>
      )}
    </>
  )
}
