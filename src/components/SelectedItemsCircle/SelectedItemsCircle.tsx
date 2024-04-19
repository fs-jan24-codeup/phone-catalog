import { useAppContext } from "../../hooks/useAppContext"
import './SelectedItemsCircle.scss';

export const SelectedItemsCircle = () => {
  const { cart, itemCount } = useAppContext();

  return (
    <>
      {!!cart.length && (
        <div className="circle">
          <div className="circle--text">{itemCount}</div>
        </div>
      )}
    </>
  )
}
