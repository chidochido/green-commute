import * as React from "react";
import { useRef, useState, useMemo, useCallback } from "react";
import { Marker } from "react-leaflet";

import { Box, Modal } from "@mui/material";
import ViewModal from "../dashboard/ViewModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DetailsMarker(props) {
  const d = new Date(props.details.date);
  const [viewOpen, setViewOpen] = useState(false);
  const viewEventOpen = (event) => setViewOpen(true);
  const viewEventClose = () => setViewOpen(false);

  const deleteHandler = () => {
    viewEventClose();
    props.deleteHandler(props.details);
  };

  const editHandler = (input) => {
    viewEventClose();
    props.editHandler(input);
  };

  return (
    <div>
      <Modal
        open={viewOpen}
        onClose={viewEventClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ViewModal
            details={props.details}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            myEventsMode={props.myEventsMode}
          />
        </Box>
      </Modal>
      <Marker
        position={[props.coords.lat, props.coords.lng]}
        riseOnHover={true}
        eventHandlers={{
          click: (e) => {
            console.log("marker clicked", e);
            viewEventOpen();
          },
        }}
      />
    </div>
  );
}
