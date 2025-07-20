//? Context
import { useModal } from "../context";

export function Modal() {
  const { modal, setModal } = useModal();
  const { isError, message } = modal;

  if (!modal.open) return <></>;
  return (
    <div className="modal">
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-icon">
            {isError && <i className="bx bx-x-circle"></i>}
            {!isError && <i className="bx bx-check-circle"></i>}
          </div>

          {message && (
            <div className="modal-message">
              {typeof message === "string" ? <p>{message}</p> : <>{message}</>}
            </div>
          )}

          <div className="modal-footer">
            <button
              onClick={() => setModal((prev) => ({ ...prev, open: false }))}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
