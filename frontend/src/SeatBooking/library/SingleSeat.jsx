import { PaginationItem, PaginationLink } from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
export default function SingleSeat({
  selected = false,
  updateSelected,
  seatNumber,
  row,
  blank,
  available = true,

  seatType,
}) {
  const [active, setActive] = useState(selected);

  const EXECUTIVEsheat = ["K"];
  const PREMUIM_ECONOMYsheat = ["F", "G", "H", "I", "J"];
  const ECONOMYSheat = ["A", "B", "C", "D", "E"];
  function handleSelected() {
    if (seatType === "EXECUTIVE" && EXECUTIVEsheat.includes(row)) {
      if (available) {
        setActive(!active);
        updateSelected(`${row}${seatNumber}`);
      }
    } else if (
      seatType === "PREMUIM_ECONOMY" &&
      PREMUIM_ECONOMYsheat.includes(row)
    ) {
      if (available) {
        setActive(!active);
        updateSelected(`${row}${seatNumber}`);
      }
    } else if (seatType === "ECONOMY" && ECONOMYSheat.includes(row)) {
      if (available) {
        setActive(!active);
        updateSelected(`${row}${seatNumber}`);
      }
    } else {
      return toast.error(
        `Please Select   ${seatType
          .toLowerCase()
          .replace("_", " ")} Seats Only `,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  }
  const activeClass = active ? `active-single-seat` : `single-seat`;

  if (blank) {
    return <div className="blank-seat"></div>;
  } else {
    return (
      <>
        <PaginationItem>
          <PaginationLink
            onClick={handleSelected}
            className={available ? activeClass : "not-available"}
            style={{
              cursor:
                seatType === "EXECUTIVE" && EXECUTIVEsheat.includes(row)
                  ? "pointer"
                  : seatType === "ECONOMY" && ECONOMYSheat.includes(row)
                  ? "pointer"
                  : seatType === "PREMUIM_ECONOMY" &&
                    PREMUIM_ECONOMYsheat.includes(row)
                  ? "pointer"
                  : "not-allowed",
            }}
          >
            {`${row}${seatNumber}`}
          </PaginationLink>
        </PaginationItem>
      </>
    );
  }
}
