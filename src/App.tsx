import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Typography, IconButton } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Create from "./components/Create";
import View from "./components/View";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [viewKey, setViewKey] = useState<number>(1);

  const activeModal = () => {
    setOpen(true);
  };

  return (
    <div style={{ padding: "0 50px" }}>
      <QueryClientProvider client={queryClient}>
        <Create
          open={open}
          setOpen={setOpen}
          viewKey={viewKey}
          setViewKey={setViewKey}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 25px",
            background: "#E8E8E8",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        >
          <Typography variant="h5" component="h1" align="center">
            Product Master
          </Typography>
          <IconButton color="inherit" aria-label="add" onClick={activeModal}>
            <AddTwoToneIcon />
          </IconButton>
        </div>
        <div style={{ marginTop: "20px" }}>
          <View key={viewKey} />
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default App;
